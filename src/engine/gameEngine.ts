
import { Level } from '../data/levelTypes';
import { getCompletedLevels } from '../data/progressManager';
import { GameState, Command, CommandHandler, IGameEngine, GameObject} from './types';
import { MoveForwardHandler, MoveBackwardHandler, TurnRightHandler, TurnLeftHandler, StopHandler, PaintGreenHandler } from './handlers/commandHandlers';
import { RepeatHandler } from './handlers/repeatHandler';
import { WhileHandler } from './handlers/whileHandler';
import { IfHandler } from './handlers/ifHandler';
import { resetCommandStates, getDirectionVector } from './utils';
import { GameMovement } from './gameMovement';
import { GameVerification } from './gameVerification';
import { StateManager } from './stateManager';

class GameEngine implements IGameEngine {
  state: GameState;
  level: Level | null = null;
  private intervalId: number | null = null;
  private onUpdateCallback: ((state: GameState) => void) | null = null;
  private commandHandlers: Map<string, CommandHandler>;
  private colorCycleInterval: number | null = null;
  private movement: GameMovement;
  private verification: GameVerification;
  private stateManager: StateManager;
  
  constructor() {
    this.stateManager = new StateManager();
    this.state = this.stateManager.createInitialState();
    
    this.commandHandlers = new Map();
    this.registerCommandHandlers();
    
    this.movement = new GameMovement(this);
    this.verification = new GameVerification(this);
  }

  private registerCommandHandlers(): void {
    this.commandHandlers.set('moveForward', new MoveForwardHandler());
    this.commandHandlers.set('moveBackward', new MoveBackwardHandler());
    this.commandHandlers.set('turnRight', new TurnRightHandler());
    this.commandHandlers.set('paintGreen', new PaintGreenHandler());
    this.commandHandlers.set('turnLeft', new TurnLeftHandler());
    this.commandHandlers.set('stop', new StopHandler());
    this.commandHandlers.set('repeat', new RepeatHandler());
    this.commandHandlers.set('while', new WhileHandler());
    this.commandHandlers.set('if', new IfHandler());
  }

  loadLevel(level: Level): void {
    this.level = level;
    this.state = this.stateManager.prepareLevel(this.state, level);
    
    this.startColorCycling(level.colorCycleSpeed || 800);
    
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
    if (this.state.isRunning) {
      console.log("Jogo já está em execução");
      return;
    }
    
    if (!this.state.commands || !this.state.commands.length) {
      console.warn("Nenhum comando para executar");
      return;
    }

    // Verifica se excede o limite de blocos antes de iniciar
    if (this.state.maxBlocks !== undefined && this.state.blocksUsed > this.state.maxBlocks) {
      this.missionFailed("Você excedeu o número máximo de blocos permitidos!");
      return;
    }
    
    this.stopExecution();
    
    resetCommandStates(this.state.commands);
    this.state.isRunning = true;
    this.state.executionPointer = 0;
    this.state.isFailed = false;
    this.state.moves = 0;
    this.state.collectiblesGathered = 0;
    
    console.log("Iniciando execução de comandos:", this.state.commands);
    
    this.intervalId = window.setInterval(() => {
      if (!this.state.isRunning) {
        this.stop();
        return;
      }
      
      this.executeStep();
    }, this.state.speed);
    
    this.notifyUpdate();
  }

  private stopExecution(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  stop(): void {
    if (!this.state.isRunning) return;
    
    this.stopExecution();
    
    this.state.isRunning = false;
    this.notifyUpdate();
    
    if (this.state.executionPointer >= this.state.commands.length) {
      this.verification.checkMissionFailure();
    }
  }

  reset(): void {
    this.stopExecution();
    this.state = this.stateManager.resetState(this.state);
    resetCommandStates(this.state.commands);
    this.notifyUpdate();
  }

  resetAll(): void {
    this.reset();
    this.state = this.stateManager.resetAllState(this.state);
    this.notifyUpdate();
  }

  executeStep(): void {
    if (!this.state.isRunning || this.state.isComplete || this.state.isFailed) {
      return;
    }
    
    if (this.state.executionPointer >= this.state.commands.length) {
      console.log("Fim dos comandos alcançado");
      this.verification.checkMissionFailure();
      this.stop();
      return;
    }
    
    this.checkInfiniteLoop();
    
    try {
      const command = this.state.commands[this.state.executionPointer];
      
      if (command.params?.isDummy) {
        this.state.executionPointer++;
        this.executeStep();
        return;
      }

      console.log("Executando comando:", command, "na posição:", this.state.executionPointer);

      if (!command || typeof command !== 'object' || !command.id) {
        console.warn("Comando inválido encontrado:", command);
        this.stop();
        return;
      }

      this.executeCommand(command);

      if (command.id !== 'repeat' && command.id !== 'if' && command.id !== 'while') {
        const isInsideRepeat = this.isCommandInsideRepeat(this.state.executionPointer);
        if (!isInsideRepeat) {
          console.log("Comando fora de repetição, incrementando ponteiro");
          this.state.executionPointer++;
        }
      }
      
      this.notifyUpdate();
    } catch (error) {
      console.error("Erro de execução:", error);
      this.stop();
      this.missionFailed("Erro ao executar comando");
    }
  }

  private checkInfiniteLoop(): void {
    if (!this.state._safetyCounter) {
      this.state._safetyCounter = {
        pointer: this.state.executionPointer,
        count: 0
      };
    }
    
    if (this.state._safetyCounter.pointer === this.state.executionPointer) {
      this.state._safetyCounter.count++;
      if (this.state._safetyCounter.count > 1000) {
        console.error("Possível loop infinito detectado! Interrompendo execução.");
        this.stop();
        this.missionFailed("Seu código parece estar em um loop infinito. Verifique seus blocos 'repetir'.");
        return;
      }
    } else {
      this.state._safetyCounter.pointer = this.state.executionPointer;
      this.state._safetyCounter.count = 0;
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
      console.warn("Comando inválido:", command);
      return;
    }
    
    const handler = this.commandHandlers.get(command.id);
    
    if (!handler) {
      console.warn(`Manipulador não encontrado para o comando: ${command.id}`);
      return;
    }
    
    console.log(`Executando comando: ${command.id}`);
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

  missionFailed(reason: string = "Você não completou a missão!"): void {
    this.stopExecution();
    
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

  paintCellInFrontOfRobot(color: 'red' | 'green'): void {
    const rotation = this.state.robot.rotation || 0;
    const direction = getDirectionVector(rotation);
    const frontX = this.state.robot.x + direction.x;
    const frontY = this.state.robot.y + direction.y;

    // Procura por uma célula colorida na posição à frente
    const colorCell = this.state.objects.find(obj => 
      obj.type === 'colorCell' && 
      obj.x === frontX && 
      obj.y === frontY
    );

    if (colorCell) {
      // Atualiza a cor da célula existente
      colorCell.color = color;
      colorCell.isBlocking = color === 'red';
    } else {
      // Cria uma nova célula colorida
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

const gameEngine = new GameEngine();
export default gameEngine;
