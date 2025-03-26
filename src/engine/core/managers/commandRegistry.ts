
import { CommandHandler } from '@/types/GameTypes';

export class CommandRegistry {
  private commandHandlers: Map<string, CommandHandler>;
  
  constructor() {
    this.commandHandlers = new Map();
  }
  
  register(commandId: string, handler: CommandHandler): void {
    this.commandHandlers.set(commandId, handler);
  }
  
  getHandler(commandId: string): CommandHandler | undefined {
    return this.commandHandlers.get(commandId);
  }
  
  hasHandler(commandId: string): boolean {
    return this.commandHandlers.has(commandId);
  }
}
