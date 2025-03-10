
import LEVELS from './levelsData';

// Get completed levels from localStorage
export const getCompletedLevels = (): number[] => {
  try {
    const savedProgress = localStorage.getItem('gameProgress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      if (Array.isArray(progress.completedLevels)) {
        return progress.completedLevels;
      }
    }
    
    // If nothing is found in localStorage or format is incorrect,
    // calculate from the current LEVELS array
    return LEVELS.filter(level => level.completed).map(level => level.id);
  } catch (error) {
    console.error('Error retrieving completed levels:', error);
    return [];
  }
};

// Save completed levels to localStorage
export const saveCompletedLevels = (): void => {
  try {
    const completedLevelIds = LEVELS.filter(level => level.completed).map(level => level.id);
    localStorage.setItem('gameProgress', JSON.stringify({
      completedLevels: completedLevelIds,
      lastSaved: new Date().toISOString()
    }));
    
    // Dispatch a storage event to notify other tabs
    window.dispatchEvent(new Event('storage'));
    
    console.log('Progress saved:', completedLevelIds);
  } catch (error) {
    console.error('Error saving completed levels:', error);
  }
};

// Clear all progress from localStorage
export const clearProgress = (): void => {
  try {
    localStorage.removeItem('gameProgress');
    
    // Reset all levels in memory
    LEVELS.forEach(level => {
      level.completed = false;
      if (level.id === 1) {
        level.unlocked = true;
      } else {
        level.unlocked = false;
      }
    });
    
    // Dispatch a storage event to notify other tabs
    window.dispatchEvent(new Event('storage'));
    
    console.log('Progress cleared successfully');
  } catch (error) {
    console.error('Error clearing progress:', error);
  }
};

// Load progress from localStorage and apply to LEVELS
export const loadProgress = (): void => {
  try {
    const completedLevelIds = getCompletedLevels();
    
    // First, reset all levels (except the first one)
    LEVELS.forEach(level => {
      level.completed = false;
      level.unlocked = level.id === 1;
    });
    
    // Apply completed levels and unlock next level
    completedLevelIds.forEach(levelId => {
      const level = LEVELS.find(l => l.id === levelId);
      if (level) {
        level.completed = true;
        
        // Unlock this level (in case it wasn't already)
        level.unlocked = true;
        
        // Unlock next level if exists
        const nextLevel = LEVELS.find(l => l.id === levelId + 1);
        if (nextLevel) {
          nextLevel.unlocked = true;
        }
      }
    });
    
    console.log('Progress loaded successfully:', completedLevelIds);
  } catch (error) {
    console.error('Error loading progress:', error);
  }
};
