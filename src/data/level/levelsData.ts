import { Level } from '@/types/levelTypes';
import introduction from './levels/intro';
import repeat from './levels/repet';
import  condicionais from './levels/condicionais';

const assignAutomaticIds = (levels: Omit<Level, 'id'>[]): Level[] => {
  return levels.map((level, index) => ({
    ...level,
    id: index + 1 
  }));
};

const LEVELS: Level[] = assignAutomaticIds([
  ...introduction.map(level => ({ ...level, id: undefined as any })),
  ...repeat.map(level => ({ ...level, id: undefined as any })),
... condicionais.map(level => ({...level, id: undefined as any })),
]);

export default LEVELS;