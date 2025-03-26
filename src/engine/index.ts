
import { GameEngine } from './core/gameEngine';

// Create and export default instance
const gameEngine = new GameEngine();
export default gameEngine;

// Export types and classes for external usage
export * from '@/types/GameTypes';
export type { Level } from '@/types/levelTypes';

// Core components
export { GameVerification } from './core/gameVerification';
export { GameMovement } from './core/gameMovement';
export { StateManager } from './core/stateManager';
export { CommandRegistry } from './core/commandRegistry';
export { ColorCycleManager } from './core/colorCycleManager';
export { ExecutionManager } from './core/executionManager';

// Handlers
export { ConditionEvaluator } from './handlers/helpers/conditionEvaluator';
export { WhileStateManager } from './handlers/helpers/whileStateManager';
export { SpecialConditionHandler } from './handlers/helpers/specialConditionHandler';
