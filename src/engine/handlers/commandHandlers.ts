import { Command, CommandHandler, IGameEngine } from '../../types/GameTypes';

export class MoveForwardHandler implements CommandHandler {
  execute(engine: IGameEngine, command: Command): void {
    engine.moveRobot(true);
  }
}

export class MoveBackwardHandler implements CommandHandler {
  execute(engine: IGameEngine, command: Command): void {
    engine.moveRobot(false);
  }
}

export class TurnRightHandler implements CommandHandler {
  execute(engine: IGameEngine, command: Command): void {
    const count = command.params?.count || 1;
    engine.rotateRobot(90 * count);
  }
}

export class TurnLeftHandler implements CommandHandler {
  execute(engine: IGameEngine, command: Command): void {
    const count = command.params?.count || 1;
    engine.rotateRobot(-90 * count);
  }
}

export class StopHandler implements CommandHandler {
  execute(engine: IGameEngine, command: Command): void {
    engine.state.moves++;
    console.log("Robot stopped in place");
  }
}

export class PaintGreenHandler implements CommandHandler {
  execute(engine: IGameEngine, command: Command): void {
    if (engine.isCellInFrontOfRobot('red')) {
      engine.paintCellInFrontOfRobot('green');
    }
    engine.state.executionPointer++;
  }
}
