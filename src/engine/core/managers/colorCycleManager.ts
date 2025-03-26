
import { IGameEngine } from '@/types/GameTypes';

export class ColorCycleManager {
  private engine: IGameEngine;
  private colorCycleInterval: number | null = null;
  
  constructor(engine: IGameEngine) {
    this.engine = engine;
  }
  
  startColorCycling(speed: number = 800): void {
    if (this.colorCycleInterval) {
      clearInterval(this.colorCycleInterval);
    }
    
    this.colorCycleInterval = window.setInterval(() => {
      this.engine.state.objects = this.engine.state.objects.map(obj => {
        if (obj.type === 'colorCell') {
          obj.color = obj.color === 'red' ? 'green' : 'red';
          obj.isBlocking = obj.color === 'red';
          this.engine.notifyUpdate();
        }
        return obj;
      });
    }, speed);
  }
  
  stopColorCycling(): void {
    if (this.colorCycleInterval) {
      clearInterval(this.colorCycleInterval);
      this.colorCycleInterval = null;
    }
  }
}
