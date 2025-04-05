import { Level } from '@/types/levelTypes';
import levels_1 from './levels/levels1';
import levels_2 from './levels/levels2';
import levels_3 from './levels/levels3';

const LEVELS: Level[] = [
  ...levels_1,
  ...levels_2,
  ...levels_3
];

export default LEVELS;
