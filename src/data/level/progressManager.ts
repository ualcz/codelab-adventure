import LEVELS from './levelsData';
import { syncUserProgress, getUserProgress } from '@/services/api';

export const getCompletedLevels = (): number[] => {
  try {
    // Try to get from localStorage first
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

export const saveCompletedLevels = async (): Promise<void> => {
  try {
    const completedLevelIds = LEVELS.filter(level => level.completed).map(level => level.id);
    const progressData = {
      completedLevels: completedLevelIds,
      lastSaved: new Date().toISOString()
    };
    
    // Always save to localStorage
    localStorage.setItem('gameProgress', JSON.stringify(progressData));
    
    // Try to sync with the API if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      try {
        await syncUserProgress(progressData);
        console.log('Progress synced with server successfully');
      } catch (apiError) {
        console.error('Error syncing progress with server:', apiError);
        // Continue with local save even if API sync fails
      }
    }
    
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
    
    // Try to sync cleared progress with the API if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      try {
        syncUserProgress({
          completedLevels: [],
          lastSaved: new Date().toISOString()
        });
        console.log('Cleared progress synced with server successfully');
      } catch (apiError) {
        console.error('Error syncing cleared progress with server:', apiError);
      }
    }
    
    window.dispatchEvent(new Event('storage'));
    
    console.log('Progress cleared successfully');
  } catch (error) {
    console.error('Error clearing progress:', error);
  }
};

export const loadProgress = async (): Promise<void> => {
  try {
    let completedLevelIds: number[] = [];
    const token = localStorage.getItem('token');

    if (token) {
      try {
        // Try to load from API first
        const apiProgress = await getUserProgress();
        completedLevelIds = apiProgress.completedLevels || [];
        
        // Update localStorage
        localStorage.setItem('gameProgress', JSON.stringify({
          completedLevels: completedLevelIds,
          lastSaved: new Date().toISOString()
        }));
      } catch (apiError) {
        console.error('API error, falling back to local storage:', apiError);
        completedLevelIds = getLocalCompletedLevels();
      }
    } else {
      completedLevelIds = getLocalCompletedLevels();
    }

    // Fixed: Changed completedIds to completedLevelIds
    updateLevelStates(completedLevelIds);
  } catch (error) {
    console.error('Error loading progress:', error);
    // Reset to safe initial state
    resetLevelsToInitialState();
  }
};

// Helper functions
const getLocalCompletedLevels = (): number[] => {
  const saved = localStorage.getItem('gameProgress');
  return saved ? JSON.parse(saved).completedLevels : [];
};

const updateLevelStates = (completedIds: number[]) => {
  LEVELS.forEach(level => {
    level.completed = completedIds.includes(level.id);
    level.unlocked = level.id === 1 || 
                    completedIds.includes(level.id) || 
                    completedIds.includes(level.id - 1);
  });
};

const resetLevelsToInitialState = () => {
  LEVELS.forEach(level => {
    level.completed = false;
    level.unlocked = level.id === 1;
  });
};
