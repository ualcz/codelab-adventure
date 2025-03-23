import { Level } from '../data/levelTypes';
import { getCompletedLevels } from '../data/progressManager';
import { GameState, Command, CommandHandler, IGameEngine, GameObject } from './types';
import { MoveForwardHandler, MoveBackwardHandler, TurnRightHandler, TurnLeftHandler, StopHandler } from './handlers/commandHandlers';
import { RepeatHandler } from './handlers/repeatHandler';
import { WhileHandler } from './handlers/whileHandler';
import { IfHandler } from './handlers/ifHandler';
import { createInitialRobot, resetCommandStates } from './utils';
import { GameMovement } from './gameMovement';
import { GameVerification } from './gameVerification';

class GameEngine implements IGameEngine {
  state: GameState;
  level: Level | null = null;
  private intervalId: number | null = null;
  private onUpdateCallback: ((state: GameState) => void) | null = null;
  private initialRobotState: GameObject;
  private initialObjects: GameObject[] = [];
  private commandHandlers: Map<string, CommandHandler>;
  private colorCycleInterval: number | null = null;
  private movement: GameMovement;
  private verification: GameVerification;
  
  constructor() {
    this.state = this.createInitialState();
    this.initialRobotState = { ...this.state.robot };
    
    this.commandHandlers = new Map();
    this.registerCommandHandlers();
    
    this.movement = new GameMovement(this);
    this.verification = new GameVerification(this);
  }

  private registerCommandHandlers(): void {
    this.commandHandlers.set('moveForward', new MoveForwardHandler());
    this.commandHandlers.set('moveBackward', new MoveBackwardHandler());
    this.commandHandlers.set('turnRight', new TurnRightHandler());
    this.commandHandlers.set('turnLeft', new TurnLeftHandler());
    this.commandHandlers.set('stop', new StopHandler());
    this.commandHandlers.set('repeat', new RepeatHandler());
    this.commandHandlers.set('while', new WhileHandler());
    this.commandHandlers.set('if', new IfHandler());
  }

  private createInitialState(): GameState {
    return {
      robot: createInitialRobot(),
      objects: [],
      gridSize: { width: 10, height: 10 },
      isRunning: false,
      isComplete: false,
      isFailed: false,
      collectiblesGathered: 0,
      totalCollectibles: 0,
      moves: 0,
      blocksUsed: 0,
      commands: [],
      executionPointer: 0,
      speed: 500
    };
  }

  loadLevel(level: Level): void {
    this.level = level;
    
    const robotObj = level.objects.find(obj => obj.type === 'robot');
    const collectibles = level.objects.filter(obj => obj.type === 'collectible');
    const nonRobotObjects = level.objects.filter(obj => obj.type !== 'robot');
    
    this.state = {
      ...this.createInitialState(),
      robot: robotObj ? 
        {
          ...(robotObj as GameObject)
        } : 
        {
          ...this.state.robot
        },
      objects: [...nonRobotObjects as GameObject[]],
      gridSize: level.gridSize,
      totalCollectibles: collectibles.length,
      maxMoves: level.maxMoves,
      maxBlocks: level.maxBlocks
    };
    
    this.initialRobotState = { ...this.state.robot };
    this.initialObjects = JSON.parse(JSON.stringify(nonRobotObjects));
    
    this.startColorCycling(level.colorCycleSpeed || 800);
    
    this.notifyUpdate();
  }

  setCommands(commands: Command[]): void {
    this.state.commands = commands;
    
    // Count total blocks
    const countBlocks = (cmds: Command[]): number => {
      return cmds.reduce((total, cmd) => {
        // Don't count dummy commands
        if (cmd.params?.isDummy) return total;
        // Add 1 for current command
        let count = 1;
        // Recursively count child blocks (for repeat and if)
        if (cmd.children && cmd.children.length > 0) {
          count += countBlocks(cmd.children);
        }
        return total + count;
      }, 0);
    };

    this.state.blocksUsed = countBlocks(commands);
    this.notifyUpdate();
  }

  setSpeed(speed: number): void {
    this.state.speed = speed;
    this.notifyUpdate();
  }

  start(): void {
    if (this.state.isRunning) {
      console.log("Game is already running");
      return;
    }
    
    if (!this.state.commands || !this.state.commands.length) {
      console.warn("No commands to execute");
      return;
    }

    // Check if exceeding block limit before starting
    if (this.state.maxBlocks !== undefined && this.state.blocksUsed > this.state.maxBlocks) {
      this.missionFailed("You exceeded the maximum number of blocks allowed!");
      return;
    }
    
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    
    resetCommandStates(this.state.commands);
    this.state.isRunning = true;
    this.state.executionPointer = 0;
    this.state.isFailed = false;
    this.state.moves = 0;
    this.state.collectiblesGathered = 0;
    
    console.log("Starting command execution:", this.state.commands);
    
    this.intervalId = window.setInterval(() => {
      if (!this.state.isRunning) {
        this.stop();
        return;
      }
      
      this.executeStep();
    }, this.state.speed);
    
    this.notifyUpdate();
  }

  stop(): void {
    if (!this.state.isRunning) return;
    
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    
    this.state.isRunning = false;
    this.notifyUpdate();
    
    if (this.state.executionPointer >= this.state.commands.length) {
      this.verification.checkMissionFailure();
    }
  }

  reset(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    
    this.state.robot = { ...this.initialRobotState };
    this.state.objects = JSON.parse(JSON.stringify(this.initialObjects));
    
    this.state.isRunning = false;
    this.state.isComplete = false;
    this.state.isFailed = false;
    this.state.moves = 0;
    this.state.collectiblesGathered = 0;
    this.state.executionPointer = 0;
    
    resetCommandStates(this.state.commands);
    
    this.notifyUpdate();
  }

  resetAll(): void {
    this.reset();
    this.state.blocksUsed = 0;
    this.state.commands = [];
    this.notifyUpdate();
  }

  executeStep(): void {
    if (!this.state.isRunning || this.state.isComplete || this.state.isFailed) {
      return;
    }
    
    if (this.state.executionPointer >= this.state.commands.length) {
      console.log("End of commands reached");
      this.verification.checkMissionFailure();
      this.stop();
      return;
    }
    
    // Check for infinite loops - limit to 1000 consecutive repeat executions 
    // at the same pointer to prevent game freezing
    if (!this.state._safetyCounter) {
      this.state._safetyCounter = {
        pointer: this.state.executionPointer,
        count: 0
      };
    }
    
    if (this.state._safetyCounter.pointer === this.state.executionPointer) {
      this.state._safetyCounter.count++;
      if (this.state._safetyCounter.count > 1000) {
        console.error("Possible infinite loop detected! Stopping execution.");
        this.stop();
        this.missionFailed("Your code appears to be in an infinite loop. Check your 'repeat' blocks.");
        return;
      }
    } else {
      this.state._safetyCounter.pointer = this.state.executionPointer;
      this.state._safetyCounter.count = 0;
    }
    
    try {
      const command = this.state.commands[this.state.executionPointer];
      
      if (command.params?.isDummy) {
        this.state.executionPointer++;
        this.executeStep();
        return;
      }

      console.log("Executing command:", command, "at position:", this.state.executionPointer);

      if (!command || typeof command !== 'object' || !command.id) {
        console.warn("Invalid command found:", command);
        this.stop();
        return;
      }

      this.executeCommand(command);

      if (command.id !== 'repeat' && command.id !== 'if' && command.id !== 'while') {
        const isInsideRepeat = this.isCommandInsideRepeat(this.state.executionPointer);
        if (!isInsideRepeat) {
          console.log("Command outside repeat, incrementing pointer");
          this.state.executionPointer++;
        }
      }
      
      this.notifyUpdate();
    } catch (error) {
      console.error("Execution error:", error);
      this.stop();
      this.missionFailed("Error executing command");
    }
  }

  private isCommandInsideRepeat(currentIndex: number): boolean {
    for (let i = currentIndex - 1; i >= 0; i--) {
      const command = this.state.commands[i];
      if (command.id === 'repeat' && 
          command.params?.executionState && 
          !command.params.executionState.completed &&
          !command.params.executionState.isMainRepeat) {
        return true;
      }
    }
    return false;
  }

  executeCommand(command: Command): void {
    if (!command || !command.id) {
      console.warn("Invalid command:", command);
      return;
    }
    
    const handler = this.commandHandlers.get(command.id);
    
    if (!handler) {
      console.warn(`Handler not found for command: ${command.id}`);
      return;
    }
    
    console.log(`Executing command: ${command.id}`);
    handler.execute(this, command);
  }

  moveRobot(forward: boolean = true): void {
    this.movement.moveRobot(forward);
  }

  isCellInFrontOfRobot(color: 'red' | 'green'): boolean {
    return this.verification.isCellInFrontOfRobot(color);
  }
  
  isBorderInFrontOfRobot(): boolean {
    return this.verification.isBorderInFrontOfRobot();
  }
  
  isBarrierInFrontOfRobot(): boolean {
    return this.verification.isBarrierInFrontOfRobot();
  }
  
  isCollectibleInFrontOfRobot(): boolean {
    return this.verification.isCollectibleInFrontOfRobot();
  }
  
  isTargetInFrontOfRobot(): boolean {
    return this.verification.isTargetInFrontOfRobot();
  }

  rotateRobot(degrees: number): void {
    this.movement.rotateRobot(degrees);
  }

  checkCollectibles(): void {
    this.verification.checkCollectibles();
  }

  checkTarget(): void {
    this.verification.checkTarget();
  }

  missionFailed(reason: string = "You did not complete the mission!"): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    
    this.state.isFailed = true;
    this.state.isRunning = false;
    
    this.state.robot = { ...this.initialRobotState };
    
    console.log("Mission failed:", reason);
    
    this.notifyUpdate();
  }

  onUpdate(callback: (state: GameState) => void): void {
    this.onUpdateCallback = callback;
  }

  notifyUpdate(): void {
    if (this.onUpdateCallback) {
      this.onUpdateCallback({ ...this.state });
    }
  }

  getState(): GameState {
    return { ...this.state };
  }

  saveProgress(): void {
    try {
      const completedLevels = getCompletedLevels();
      
      localStorage.setItem('gameProgress', JSON.stringify({
        completedLevels,
        lastSaved: new Date().toISOString()
      }));
      
      console.log('Progress saved successfully!');
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }

  private startColorCycling(speed: number = 800): void {
    if (this.colorCycleInterval) {
      clearInterval(this.colorCycleInterval);
    }
    
    this.colorCycleInterval = window.setInterval(() => {
      this.state.objects = this.state.objects.map(obj => {
        if (obj.type === 'colorCell') {
          obj.color = obj.color === 'red' ? 'green' : 'red';
          obj.isBlocking = obj.color === 'red';
          this.notifyUpdate();
        }
        return obj;
      });
    }, speed);
  }

  isRobotOnColorCell(color: 'red' | 'green'): boolean {
    return this.verification.isRobotOnColorCell(color);
  }

  isRobotOnGreenCell(): boolean {
    return this.verification.isRobotOnGreenCell();
  }

  isRobotOnRedCell(): boolean {
    return this.verification.isRobotOnRedCell();
  }

  debugGameState(): void {
    console.log("=== DEBUG GAME STATE ===");
    console.log("Robot position:", this.state.robot);
    console.log("Color cells:", this.state.objects.filter(obj => obj.type === 'colorCell'));
    console.log("Execution pointer:", this.state.executionPointer);
    console.log("Commands:", this.state.commands);
    console.log("=======================");
  }
}

const gameEngine = new GameEngine();
export default gameEngine;
