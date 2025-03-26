
import { Level } from '@/types/levelTypes';
import { getCompletedLevels } from '@/data/level/progressManager';
import { GameState, Command, CommandHandler, IGameEngine, GameObject } from '@/types/GameTypes';
import { MoveForwardHandler, MoveBackwardHandler, TurnRightHandler, TurnLeftHandler, StopHandler, PaintGreenHandler } from '@/engine/handlers/commandHandlers';
import { RepeatHandler } from '@/engine/handlers/repeatHandler';
import { WhileHandler } from '@/engine/handlers/whileHandler';
import { IfHandler } from '@/engine/handlers/ifHandler';
import { GameMovement } from './game/gameMovement';
import { GameVerification } from './game/gameVerification';
import { StateManager } from './managers/stateManager';
import { CommandRegistry } from './managers/commandRegistry';
import { ColorCycleManager } from './managers/colorCycleManager';
import { ExecutionManager } from './managers/executionManager';
import { getDirectionVector } from '@/engine/utils';

export class GameEngine implements IGameEngine {
  state: GameState;
  level: Level | null = null;
  private onUpdateCallback: ((state: GameState) => void) | null = null;
  private movement: GameMovement;
  private verification: GameVerification;
  private stateManager: StateManager;
  private commandRegistry: CommandRegistry;
  private colorCycleManager: ColorCycleManager;
  private executionManager: ExecutionManager;
  
  constructor() {
    this.stateManager = new StateManager();
    this.state = this.stateManager.createInitialState();
    
    this.commandRegistry = new CommandRegistry();
    this.registerCommandHandlers();
    
    this.movement = new GameMovement(this);
    this.verification = new GameVerification(this);
    this.colorCycleManager = new ColorCycleManager(this);
    this.executionManager = new ExecutionManager(this, this.commandRegistry);
  }

  private registerCommandHandlers(): void {
    this.commandRegistry.register('moveForward', new MoveForwardHandler());
    this.commandRegistry.register('moveBackward', new MoveBackwardHandler());
    this.commandRegistry.register('turnRight', new TurnRightHandler());
    this.commandRegistry.register('turnLeft', new TurnLeftHandler());
    this.commandRegistry.register('stop', new StopHandler());
    this.commandRegistry.register('paintGreen', new PaintGreenHandler());
    this.commandRegistry.register('repeat', new RepeatHandler());
    this.commandRegistry.register('while', new WhileHandler());
    this.commandRegistry.register('if', new IfHandler());
  }

  loadLevel(level: Level): void {
    this.level = level;
    this.state = this.stateManager.prepareLevel(this.state, level);
    
    this.colorCycleManager.startColorCycling(level.colorCycleSpeed || 1000);
    
    this.notifyUpdate();
  }

  setCommands(commands: Command[]): void {
    this.state.commands = commands;
    this.state.blocksUsed = this.stateManager.countBlocksUsed(commands);
    this.notifyUpdate();
  }

  setSpeed(speed: number): void {
    this.state.speed = speed;
    this.notifyUpdate();
  }

  start(): void {
    this.executionManager.start();
  }

  stop(): void {
    this.executionManager.stop();
  }

  reset(): void {
    this.executionManager.reset();
    this.state = this.stateManager.resetState(this.state);
    this.notifyUpdate();
  }

  resetAll(): void {
    this.reset();
    this.state = this.stateManager.resetAllState(this.state);
    this.notifyUpdate();
  }

  executeStep(): void {
    this.executionManager.executeStep();
  }

  executeCommand(command: Command): void {
    this.executionManager.executeCommand(command);
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

  checkMissionFailure(): void {
    this.verification.checkMissionFailure();
  }

  missionFailed(reason: string = "Você não completou a missão!"): void {
    this.executionManager.stopExecution();
    
    this.state.isFailed = true;
    this.state.isRunning = false;
    
    this.state.robot = { ...this.stateManager.getInitialRobot() };
    
    console.log("Missão falhou:", reason);
    
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
      
      console.log('Progresso salvo com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar progresso:', error);
    }
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

  paintCellInFrontOfRobot(color: 'red' | 'green'): void {
    const rotation = this.state.robot.rotation || 0;
    const direction = getDirectionVector(rotation);
    const frontX = this.state.robot.x + direction.x;
    const frontY = this.state.robot.y + direction.y;

    const colorCell = this.state.objects.find(obj => 
      obj.type === 'colorCell' && 
      obj.x === frontX && 
      obj.y === frontY
    );

    if (colorCell) {
      colorCell.color = color;
      colorCell.isBlocking = color === 'red';
    } else {
      // Fix the type issue by explicitly setting type as 'colorCell'
      const newCell: GameObject = {
        id: `colorCell_${frontX}_${frontY}`,
        type: 'colorCell',
        x: frontX,
        y: frontY,
        width: 1,
        height: 1,
        color: color,
        isBlocking: color === 'red'
      };
      this.state.objects.push(newCell);
    }

    this.notifyUpdate();
  }

  debugGameState(): void {
    console.log("=== DEBUG ESTADO DO JOGO ===");
    console.log("Posição do robô:", this.state.robot);
    console.log("Células coloridas:", this.state.objects.filter(obj => obj.type === 'colorCell'));
    console.log("Ponteiro de execução:", this.state.executionPointer);
    console.log("Comandos:", this.state.commands);
    console.log("=======================");
  }
}
