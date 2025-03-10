
// Game object interfaces and types
export interface GameObject {
  id: string;
  type: 'robot' | 'obstacle' | 'collectible' | 'target' | 'colorCell';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  color?: string;
  isBlocking?: boolean;
}

export interface Position {
  x: number;
  y: number;
}

export interface GridSize {
  width: number;
  height: number;
}

export interface ExecutionState {
  counter: number;
  childIndex: number;
  completed: boolean;
  isMainRepeat?: boolean;
  // Extended for if-handler
  parentPointer?: number;
  shouldExecute?: boolean;
  // Extended for repeat-handler
  currentIteration?: number;
  childrenCompleted?: boolean[];
}

export interface GameState {
  robot: GameObject;
  objects: GameObject[];
  gridSize: GridSize;
  isRunning: boolean;
  isComplete: boolean;
  isFailed: boolean;
  collectiblesGathered: number;
  totalCollectibles: number;
  moves: number;
  blocksUsed: number;
  commands: Command[];
  executionPointer: number;
  speed: number;
  maxMoves?: number;
  maxBlocks?: number;
  _safetyCounter?: {
    pointer: number;
    count: number;
  };
}

export interface Command {
  id: string;
  name: string;
  condition?: string;
  params?: {
    count?: number;
    condition?: string;
    executionState?: ExecutionState;
    isDummy?: boolean;
  };
  children?: Command[];
}

export interface CommandHandler {
  execute(engine: IGameEngine, command: Command): void;
}

export interface IGameEngine {
  state: GameState;
  level?: any;
  loadLevel(level: any): void;
  setCommands(commands: Command[]): void;
  setSpeed(speed: number): void;
  start(): void;
  stop(): void;
  reset(): void;
  resetAll(): void;
  executeStep(): void;
  executeCommand(command: Command): void;
  moveRobot(forward?: boolean): void;
  isCellInFrontOfRobot(color: 'red' | 'green'): boolean;
  isCollectibleInFrontOfRobot(): boolean;
  isTargetInFrontOfRobot(): boolean;
  rotateRobot(degrees: number): void;
  checkCollectibles(): void;
  checkTarget(): void;
  missionFailed(reason?: string): void;
  onUpdate(callback: (state: GameState) => void): void;
  getState(): GameState;
  saveProgress(): void;
  isRobotOnColorCell(color: 'red' | 'green'): boolean;
  isRobotOnGreenCell(): boolean;
  isRobotOnRedCell(): boolean;
  debugGameState(): void;
  notifyUpdate(): void;
}
