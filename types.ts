
export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Progress {
  quizzesTaken: number;
  studySessions: number;
}

export enum ViewState {
  IDLE,
  NOTES,
  QUIZ,
  TIMER,
}
