
import LEVELS from './levelsData';

export const getCompletedLevels = (): number[] => {
  try {
    const savedProgress = localStorage.getItem('gameProgress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      if (Array.isArray(progress.completedLevels)) {
        return progress.completedLevels;
      }
    }
    
    return LEVELS.filter(level => level.completed).map(level => level.id);
  } catch (error) {
    console.error('Error retrieving completed levels:', error);
    return [];
  }
};

export const saveCompletedLevels = (): void => {
  try {
    const completedLevelIds = LEVELS.filter(level => level.completed).map(level => level.id);
    localStorage.setItem('gameProgress', JSON.stringify({
      completedLevels: completedLevelIds,
      lastSaved: new Date().toISOString()
    }));
    
    window.dispatchEvent(new Event('storage'));
    
    console.log('Progress saved:', completedLevelIds);
  } catch (error) {
    console.error('Error saving completed levels:', error);
  }
};

export const clearProgress = (): void => {
  try {
    localStorage.removeItem('gameProgress');
    
    LEVELS.forEach(level => {
      level.completed = false;
      if (level.id === 1) {
        level.unlocked = true;
      } else {
        level.unlocked = false;
      }
    });
    
    window.dispatchEvent(new Event('storage'));
    
    console.log('Progress cleared successfully');
  } catch (error) {
    console.error('Error clearing progress:', error);
  }
};

export const loadProgress = (): void => {
  try {
    const completedLevelIds = getCompletedLevels();
    
    LEVELS.forEach(level => {
      level.completed = false;
      level.unlocked = level.id === 1;
    });
    
    completedLevelIds.forEach(levelId => {
      const level = LEVELS.find(l => l.id === levelId);
      if (level) {
        level.completed = true;
        
        level.unlocked = true;
        
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
