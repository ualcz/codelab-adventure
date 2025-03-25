
import { IGameEngine } from '../types/GameTypes';
import { getDirectionVector } from './utils';

export class GameMovement {
  private engine: IGameEngine;
  
  constructor(engine: IGameEngine) {
    this.engine = engine;
  }
  
  moveRobot(forward: boolean = true): void {
    const { robot, gridSize } = this.engine.state;
    const rotation = robot.rotation || 0;
    
    const direction = getDirectionVector(rotation);
    const dx = forward ? direction.x : -direction.x;
    const dy = forward ? direction.y : -direction.y;
    
    const newX = robot.x + dx;
    const newY = robot.y + dy;
    
    if (this.isValidMove(newX, newY)) {
      this.engine.state.robot.x = newX;
      this.engine.state.robot.y = newY;
      this.engine.state.moves++;
      
      this.engine.checkCollectibles();
      this.engine.checkTarget();
    }
  }
  
  rotateRobot(degrees: number): void {
    let rotation = (this.engine.state.robot.rotation || 0) + degrees;
    rotation = ((rotation % 360) + 360) % 360;
    
    this.engine.state.robot.rotation = rotation;
    this.engine.state.moves++;
  }
  
  private isValidMove(x: number, y: number): boolean {
    const { gridSize, objects } = this.engine.state;
    
    if (x < 0 || x >= gridSize.width || y < 0 || y >= gridSize.height) {
      return false;
    }
    
    const blockingObject = objects.find(obj => 
      (obj.x === x && obj.y === y) && 
      (obj.type === 'obstacle' || (obj.type === 'colorCell' && obj.color === 'red' && obj.isBlocking))
    );
    
    if (blockingObject) {
      if (blockingObject.type === 'colorCell' && blockingObject.color === 'red') {
        this.engine.missionFailed("Robot collided with a red cell!");
      }
      return false;
    }
    
    return true;
  }
}
