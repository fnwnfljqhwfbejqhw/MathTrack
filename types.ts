
export enum GameState {
  Ready = 'READY',
  Playing = 'PLAYING',
  GameOver = 'GAME_OVER',
}

export interface Problem {
  num1: number;
  num2: number;
  operator: '+';
  answer: number;
}

export interface AnswerOption {
  value: number;
  isCorrect: boolean;
}
