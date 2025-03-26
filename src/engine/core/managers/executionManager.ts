
import { IGameEngine, Command } from '@/types/GameTypes';
import { CommandRegistry } from './commandRegistry';
import { resetCommandStates } from '@/engine/utils';

export class ExecutionManager {
  private engine: IGameEngine;
  private commandRegistry: CommandRegistry;
  private intervalId: number | null = null;
  
  constructor(engine: IGameEngine, commandRegistry: CommandRegistry) {
    this.engine = engine;
    this.commandRegistry = commandRegistry;
  }
  
  start(): void {
    if (this.engine.state.isRunning) {
      console.log("Jogo já está em execução");
      return;
    }
    
    if (!this.engine.state.commands || !this.engine.state.commands.length) {
      console.warn("Nenhum comando para executar");
      return;
    }

    // Verifica se excede o limite de blocos antes de iniciar
    if (this.engine.state.maxBlocks !== undefined && this.engine.state.blocksUsed > this.engine.state.maxBlocks) {
      this.engine.missionFailed("Você excedeu o número máximo de blocos permitidos!");
      return;
    }
    
    this.stopExecution();
    
    resetCommandStates(this.engine.state.commands);
    this.engine.state.isRunning = true;
    this.engine.state.executionPointer = 0;
    this.engine.state.isFailed = false;
    this.engine.state.moves = 0;
    this.engine.state.collectiblesGathered = 0;
    
    console.log("Iniciando execução de comandos:", this.engine.state.commands);
    
    this.intervalId = window.setInterval(() => {
      if (!this.engine.state.isRunning) {
        this.stop();
        return;
      }
      
      this.executeStep();
    }, this.engine.state.speed);
    
    this.engine.notifyUpdate();
  }
  
  stop(): void {
    if (!this.engine.state.isRunning) return;
    
    this.stopExecution();
    
    this.engine.state.isRunning = false;
    this.engine.notifyUpdate();
    
    if (this.engine.state.executionPointer >= this.engine.state.commands.length) {
      this.engine.checkMissionFailure();
    }
  }
  
  reset(): void {
    this.stopExecution();
  }
  
  stopExecution(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
  
  executeStep(): void {
    if (!this.engine.state.isRunning || this.engine.state.isComplete || this.engine.state.isFailed) {
      return;
    }
    
    if (this.engine.state.executionPointer >= this.engine.state.commands.length) {
      console.log("Fim dos comandos alcançado");
      this.engine.checkMissionFailure();
      this.stop();
      return;
    }
    
    this.checkInfiniteLoop();
    
    try {
      const command = this.engine.state.commands[this.engine.state.executionPointer];
      
      if (command.params?.isDummy) {
        this.engine.state.executionPointer++;
        this.executeStep();
        return;
      }

      console.log("Executando comando:", command, "na posição:", this.engine.state.executionPointer);

      if (!command || typeof command !== 'object' || !command.id) {
        console.warn("Comando inválido encontrado:", command);
        this.stop();
        return;
      }

      this.executeCommand(command);

      if (command.id !== 'repeat' && command.id !== 'if' && command.id !== 'while') {
        const isInsideRepeat = this.isCommandInsideRepeat(this.engine.state.executionPointer);
        if (!isInsideRepeat) {
          console.log("Comando fora de repetição, incrementando ponteiro");
          this.engine.state.executionPointer++;
        }
      }
      
      this.engine.notifyUpdate();
    } catch (error) {
      console.error("Erro de execução:", error);
      this.stop();
      this.engine.missionFailed("Erro ao executar comando");
    }
  }
  
  executeCommand(command: Command): void {
    if (!command || !command.id) {
      console.warn("Comando inválido:", command);
      return;
    }
    
    const handler = this.commandRegistry.getHandler(command.id);
    
    if (!handler) {
      console.warn(`Manipulador não encontrado para o comando: ${command.id}`);
      return;
    }
    
    console.log(`Executando comando: ${command.id}`);
    handler.execute(this.engine, command);
  }
  
  private checkInfiniteLoop(): void {
    if (!this.engine.state._safetyCounter) {
      this.engine.state._safetyCounter = {
        pointer: this.engine.state.executionPointer,
        count: 0
      };
    }
    
    if (this.engine.state._safetyCounter.pointer === this.engine.state.executionPointer) {
      this.engine.state._safetyCounter.count++;
      if (this.engine.state._safetyCounter.count > 1000) {
        console.error("Possível loop infinito detectado! Interrompendo execução.");
        this.stop();
        this.engine.missionFailed("Seu código parece estar em um loop infinito. Verifique seus blocos 'repetir'.");
        return;
      }
    } else {
      this.engine.state._safetyCounter.pointer = this.engine.state.executionPointer;
      this.engine.state._safetyCounter.count = 0;
    }
  }
  
  private isCommandInsideRepeat(currentIndex: number): boolean {
    for (let i = currentIndex - 1; i >= 0; i--) {
      const command = this.engine.state.commands[i];
      if (command.id === 'repeat' && 
          command.params?.executionState && 
          !command.params.executionState.completed &&
          !command.params.executionState.isMainRepeat) {
        return true;
      }
    }
    return false;
  }
}
