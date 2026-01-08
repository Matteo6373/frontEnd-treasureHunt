import {Clue} from './Clue';
import {TreasureTheme} from './TreasureTheme';

export interface TreasureHunt {
  id?: string;
  theme: TreasureTheme;
  hint: string;
  clues: Clue[];
}
