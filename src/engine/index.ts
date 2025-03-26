
import { GameEngine } from './core/gameEngine';

// Create and export default instance
const gameEngine = new GameEngine();
export default gameEngine;

// Export types and classes for external usage
export * from '@/types/GameTypes';
export type { Level } from '@/types/levelTypes';

// Core components
export { GameVerification } from './core/game/gameVerification';
export { GameMovement } from './core/game/gameMovement';
export { StateManager } from './core/managers/stateManager';
export { CommandRegistry } from './core/managers/commandRegistry';
export { ColorCycleManager } from './core/managers/colorCycleManager';
export { ExecutionManager } from './core//managers/executionManager';

// Handlers
export { ConditionEvaluator } from './handlers/helpers/conditionEvaluator';
export { WhileStateManager } from './handlers/helpers/whileStateManager';
export { SpecialConditionHandler } from './handlers/helpers/specialConditionHandler';
