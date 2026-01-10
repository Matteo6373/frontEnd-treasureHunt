export interface Clue{
  editingText?: boolean;
  editingSolution?: boolean;
  showSolution?: boolean;
  id?: string;
  step?: number;
  text: string;
  solution: string;
}
