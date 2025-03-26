
import { IGameEngine } from '@/types/GameTypes';
import { getDirectionVector } from '@/engine/utils';
import { completeLevel } from '@/data/level/levelManager';
import { saveCompletedLevels } from '@/data/level/progressManager';

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
    console.log(`Verificando se a célula na frente (${frontX},${frontY}) é ${color}: ${result}`);
    
    return result;
  }
  
  isCollectibleInFrontOfRobot(): boolean {
    const { robot, objects } = this.engine.state;
    const position = this.getPositionInFrontOfRobot();
    
    return objects.some(obj => 
      obj.type === 'collectible' && 
      obj.x === position.x && 
      obj.y === position.y
    );
  }
  
  isTargetInFrontOfRobot(): boolean {
    const { robot, objects } = this.engine.state;
    const position = this.getPositionInFrontOfRobot();
    
    return objects.some(obj => 
      obj.type === 'target' && 
      obj.x === position.x && 
      obj.y === position.y
    );
  }
  
  isBorderInFrontOfRobot(): boolean {
    const { robot, gridSize } = this.engine.state;
    const position = this.getPositionInFrontOfRobot();
    
    return position.x < 0 || position.x >= gridSize.width || position.y < 0 || position.y >= gridSize.height;
  }
  
  isBarrierInFrontOfRobot(): boolean {
    const { objects } = this.engine.state;
    const position = this.getPositionInFrontOfRobot();
    
    // Verifica todos os objetos para encontrar obstáculos
    const obstacles = this.findObstaclesAtPosition(position);
    
    return obstacles.length > 0;
  }
  
  private findObstaclesAtPosition(position: {x: number, y: number}): any[] {
    const { objects } = this.engine.state;
    
    return objects.filter(obj => {
      const isBlockingType = obj.type === 'obstacle';
      
      if (!isBlockingType) return false;
      
      // Verifica se o objeto ocupa a posição
      const objEndX = obj.x + (obj.width || 1) - 1;
      const objEndY = obj.y + (obj.height || 1) - 1;
      
      return (
        position.x >= obj.x && position.x <= objEndX &&
        position.y >= obj.y && position.y <= objEndY
      );
    });
  }
  
  private getPositionInFrontOfRobot(): {x: number, y: number} {
    const { robot } = this.engine.state;
    const direction = getDirectionVector(robot.rotation || 0);
    
    return {
      x: robot.x + direction.x,
      y: robot.y + direction.y
    };
  }
  
  checkCollectibles(): void {
    const { robot, objects, commands, executionPointer } = this.engine.state;
    
    const collectibleIndex = objects.findIndex(obj => 
      obj.type === 'collectible' && obj.x === robot.x && obj.y === robot.y
    );
    
    if (collectibleIndex !== -1) {
      this.engine.state.objects.splice(collectibleIndex, 1);
      this.engine.state.collectiblesGathered++;
      
      this.checkWhileLoopCollectibleCondition();
      
      this.engine.notifyUpdate();
    }
  }
  
  checkWhileLoopCollectibleCondition(): void {
    const { commands, executionPointer } = this.engine.state;
    
    if (commands && executionPointer < commands.length) {
      this.checkCommandForCollectibleCondition(commands[executionPointer]);
      
      for (let i = 0; i < commands.length; i++) {
        if (i === executionPointer) continue;
        
        this.checkCommandForCollectibleCondition(commands[i]);
        
        if (commands[i].children) {
          this.checkNestedCommandsForCollectible(commands[i].children);
        }
      }
    }
  }
  
  private checkCommandForCollectibleCondition(command: any): void {
    if (command && command.id === 'while' && command.params) {
      if (command.params.condition === 'untilCollectible' && command.params.executionState) {
        command.params.executionState.collectibleCollected = true;
        console.log('Coletável obtido: finalizando loop while');
      }
    }
  }
  
  private checkNestedCommandsForCollectible(commands: any[]): void {
    if (!commands || !Array.isArray(commands)) return;
    
    for (const cmd of commands) {
      this.checkCommandForCollectibleCondition(cmd);
      
      if (cmd.children) {
        this.checkNestedCommandsForCollectible(cmd.children);
      }
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
    
    if (maxBlocks !== undefined && blocksUsed > maxBlocks) {
      this.engine.missionFailed("Você excedeu o número máximo de blocos permitidos!");
      return;
    }
    
    if (totalCollectibles === 0 || collectiblesGathered === totalCollectibles) {
      this.engine.state.isComplete = true;
      this.engine.stop();
      
      this.saveLevelProgress();
    }
  }
  
  private saveLevelProgress(): void {
    if (this.engine.state.isComplete && this.engine.level) {
      const levelId = this.engine.level && typeof this.engine.level === 'object' ? this.engine.level.id : null;
      if (levelId) {
        completeLevel(levelId);
        saveCompletedLevels();
        console.log(`Nível ${levelId} completado e salvo no localStorage!`);
      }
    }
  }
  
  checkMissionFailure(): void {
    if (this.engine.state.isComplete) return;
    
    const { robot, objects, collectiblesGathered, totalCollectibles, maxMoves, moves } = this.engine.state;
    
    if (maxMoves !== undefined && moves > maxMoves) {
      this.engine.missionFailed("Você excedeu o número máximo de movimentos!");
      return;
    }

    if (this.engine.state.maxBlocks !== undefined && this.engine.state.blocksUsed > this.engine.state.maxBlocks) {
      this.engine.missionFailed("Você excedeu o número máximo de blocos permitidos!");
      return;
    }
    
    const onTarget = objects.some(obj => 
      obj.type === 'target' && obj.x === robot.x && obj.y === robot.y
    );
    
    const allCollectiblesGathered = collectiblesGathered === totalCollectibles;
    
    if (this.engine.state.executionPointer >= this.engine.state.commands.length) {
      if (!onTarget || (totalCollectibles > 0 && !allCollectiblesGathered)) {
        this.engine.missionFailed("Você não completou todos os objetivos da missão!");
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
    
    console.log(`Verificando se o robô está em uma célula ${color}: ${result}`, { 
      posRobo: { x: robot.x, y: robot.y },
      celulaNoRobo: cellAtRobot
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
