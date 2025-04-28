import { Level } from '@/types/levelTypes';
import introduction from './levels/intro';
import repeat from './levels/repet';
import repeatcondicionais from './levels/repeatcondicionais';
import  condicionais from './levels/condicionais';

// Função para atribuir IDs automaticamente aos níveis com base em sua posição no array
const assignAutomaticIds = (levels: Omit<Level, 'id'>[]): Level[] => {
  return levels.map((level, index) => ({
    ...level,
    id: index + 1 // IDs começam em 1
  }));
};

// Combina todos os níveis e atribui IDs automaticamente
const LEVELS: Level[] = assignAutomaticIds([
  ...introduction.map(level => ({ ...level, id: undefined as any })),
  ...repeat.map(level => ({ ...level, id: undefined as any })),
 ...repeatcondicionais.map(level => ({...level, id: undefined as any })),
... condicionais.map(level => ({...level, id: undefined as any })),
]);

export default LEVELS;