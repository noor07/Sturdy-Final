export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

// Fix: Add definitions for Progress and ViewState which were missing and causing import errors.
export interface Progress {
  quizzesTaken: number;
  studySessions: number;
}

export enum ViewState {
  DASHBOARD,
  NOTES,
  QUIZ,
  TIMER,
}

// New types for HomeScreen
export interface SubTopic {
  id: string;
  name: string;
  completed: boolean;
}

export interface Topic {
  id: string;
  name: string;
  progress: number;
  subTopics: SubTopic[];
  isExpanded: boolean;
}

export interface Subject {
  id:string;
  name: string;
  progress: number;
  timeSpent: string;
  topics: Topic[];
  isExpanded: boolean;
}

// New type for Notes
export interface Note {
  id: string;
  title: string;
  subjectName: string;
  content?: string;
  images?: string[];
  createdAt: string;
}

// New type for Timetable
export interface TimetableEvent {
  id: string;
  title: string;
  subjectName: string;
  startTime: string; // ISO string
  endTime: string;   // ISO string
  color: string;
}
