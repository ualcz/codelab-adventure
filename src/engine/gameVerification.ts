
import { IGameEngine } from './types';
import { getDirectionVector } from './utils';
import { completeLevel } from '../data/levelManager';
import { saveCompletedLevels } from '../data/progressManager';

export class GameVerification {
  private engine: IGameEngine;
  
  constructor(engine: IGameEngine) {
    this.engine = engine;
  }
  
  isCellInFrontOfRobot(color: 'red' | 'green'): boolean {
    const { robot, objects } = this.engine.state;
    const direction = getDirectionVector(robot.rotation || 0);
    
    const frontX = robot.x + direction.x;
    const frontY = robot.y + direction.y;
    
    const cellInFront = objects.find(obj => 
      obj.type === 'colorCell' && 
      obj.x === frontX && 
      obj.y === frontY &&
      obj.color === color
    );
    
    const result = !!cellInFront;
    console.log(`Checking if cell in front (${frontX},${frontY}) is ${color}: ${result}`);
    
    return result;
  }
  
  isCollectibleInFrontOfRobot(): boolean {
    const { robot, objects } = this.engine.state;
    const direction = getDirectionVector(robot.rotation || 0);
    
    const frontX = robot.x + direction.x;
    const frontY = robot.y + direction.y;
    
    return objects.some(obj => 
      obj.type === 'collectible' && 
      obj.x === frontX && 
      obj.y === frontY
    );
  }
  
  isTargetInFrontOfRobot(): boolean {
    const { robot, objects } = this.engine.state;
    const direction = getDirectionVector(robot.rotation || 0);
    
    const frontX = robot.x + direction.x;
    const frontY = robot.y + direction.y;
    
    return objects.some(obj => 
      obj.type === 'target' && 
      obj.x === frontX && 
      obj.y === frontY
    );
  }
  
  checkCollectibles(): void {
    const { robot, objects } = this.engine.state;
    
    const collectibleIndex = objects.findIndex(obj => 
      obj.type === 'collectible' && obj.x === robot.x && obj.y === robot.y
    );
    
    if (collectibleIndex !== -1) {
      this.engine.state.objects.splice(collectibleIndex, 1);
      this.engine.state.collectiblesGathered++;
      
      this.engine.notifyUpdate();
    }
  }
  
  checkTarget(): void {
    const { robot, objects } = this.engine.state;
    
    const onTarget = objects.some(obj => 
      obj.type === 'target' && obj.x === robot.x && obj.y === robot.y
    );
    
    if (onTarget) {
      this.checkLevelComplete();
    }
  }
  
  checkLevelComplete(): void {
    const { collectiblesGathered, totalCollectibles, maxBlocks, blocksUsed } = this.engine.state;
    
    // Check if block limit exceeded (if there is a limit)
    if (maxBlocks !== undefined && blocksUsed > maxBlocks) {
      this.engine.missionFailed("You exceeded the maximum number of blocks allowed!");
      return;
    }
    
    // Check if collected all required items
    if (totalCollectibles === 0 || collectiblesGathered === totalCollectibles) {
      this.engine.state.isComplete = true;
      this.engine.stop();
      
      if (this.engine.state.isComplete && this.engine.level) {
        const levelId = this.engine.level && typeof this.engine.level === 'object' ? this.engine.level.id : null;
        if (levelId) {
          completeLevel(levelId);
          saveCompletedLevels();
          console.log(`Level ${levelId} completed and saved to localStorage!`);
        }
      }
    }
  }
  
  checkMissionFailure(): void {
    if (this.engine.state.isComplete) return;
    
    const { robot, objects, collectiblesGathered, totalCollectibles, maxMoves, moves } = this.engine.state;
    
    if (maxMoves !== undefined && moves > maxMoves) {
      this.engine.missionFailed("You exceeded the maximum number of moves!");
      return;
    }

    if (this.engine.state.maxBlocks !== undefined && this.engine.state.blocksUsed > this.engine.state.maxBlocks) {
      this.engine.missionFailed("You exceeded the maximum number of blocks allowed!");
      return;
    }
    
    const onTarget = objects.some(obj => 
      obj.type === 'target' && obj.x === robot.x && obj.y === robot.y
    );
    
    const allCollectiblesGathered = collectiblesGathered === totalCollectibles;
    
    if (this.engine.state.executionPointer >= this.engine.state.commands.length) {
      if (!onTarget || (totalCollectibles > 0 && !allCollectiblesGathered)) {
        this.engine.missionFailed("You did not complete all mission objectives!");
      }
    }
  }
  
  isRobotOnColorCell(color: 'red' | 'green'): boolean {
    const { robot, objects } = this.engine.state;
    
    const cellAtRobot = objects.find(obj => 
      obj.type === 'colorCell' && 
      obj.x === robot.x && 
      obj.y === robot.y &&
      obj.color === color
    );
    
    const result = !!cellAtRobot;
    
    console.log(`Checking if robot is on ${color} cell: ${result}`, { 
      robotPos: { x: robot.x, y: robot.y },
      cellAtRobot
    });
    
    return result;
  }

  isRobotOnGreenCell(): boolean {
    return this.isRobotOnColorCell('green');
  }

  isRobotOnRedCell(): boolean {
    return this.isRobotOnColorCell('red');
  }
}
