import {Clue} from './Clue';

export interface TreasureHunt {
  id: string
  theme: string;
  hint: string;
  clues: Clue[];
}
