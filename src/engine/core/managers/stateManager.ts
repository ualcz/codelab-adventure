
import { GameState, Command } from '@/types/GameTypes';
import { createInitialRobot } from '@/engine/utils';
import { Level } from '@/types/levelTypes';

export class StateManager {
  private initialRobotState: any;
  private initialObjects: any[] = [];
  
  createInitialState(): GameState {
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
      speed: 200
    };
  }
  
  prepareLevel(state: GameState, level: Level): GameState {
    const robotObj = level.objects.find(obj => obj.type === 'robot');
    const collectibles = level.objects.filter(obj => obj.type === 'collectible');
    const nonRobotObjects = level.objects.filter(obj => obj.type !== 'robot');
    
    const newState = {
      ...this.createInitialState(),
      robot: robotObj ? 
        {
          ...(robotObj as any)
        } : 
        {
          ...state.robot
        },
      objects: [...nonRobotObjects as any[]],
      gridSize: level.gridSize,
      totalCollectibles: collectibles.length,
      maxMoves: level.maxMoves,
      maxBlocks: level.maxBlocks
    };
    
    this.initialRobotState = { ...newState.robot };
    this.initialObjects = JSON.parse(JSON.stringify(nonRobotObjects));
    
    return newState;
  }
  
  resetState(state: GameState): GameState {
    return {
      ...state,
      robot: { ...this.initialRobotState },
      objects: JSON.parse(JSON.stringify(this.initialObjects)),
      isRunning: false,
      isComplete: false,
      isFailed: false,
      moves: 0,
      collectiblesGathered: 0,
      executionPointer: 0
    };
  }
  
  resetAllState(state: GameState): GameState {
    const newState = this.resetState(state);
    return {
      ...newState,
      blocksUsed: 0,
      commands: []
    };
  }
  
  countBlocksUsed(commands: Command[]): number {
    return commands.reduce((total, cmd) => {
      // Don't count dummy commands
      if (cmd.params?.isDummy) return total;
      
      // Don't count sensor blocks
      if (cmd.id.startsWith('sensor_')) return total;
      
      // Add 1 for the current command
      let count = 1;
      
      // Recursively count child blocks
      if (cmd.children && cmd.children.length > 0) {
        count += this.countBlocksUsed(cmd.children);
      }
      
      return total + count;
    }, 0);
  }
  
  updateBlocksUsed(state: GameState, commands: Command[]): GameState {
    return {
      ...state,
      blocksUsed: this.countBlocksUsed(commands)
    };
  }
  
  getInitialRobot(): any {
    return this.initialRobotState;
  }
  
  getInitialObjects(): any[] {
    return this.initialObjects;
  }
}
