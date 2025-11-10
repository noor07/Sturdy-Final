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
  sub_topics: SubTopic[];
  is_expanded: boolean;
}

export interface Subject {
  id:string;
  name: string;
  progress: number;
  time_spent: string;
  topics: Topic[];
  is_expanded: boolean;
  user_id?: string;
  created_at?: string;
}

// New type for Notes
export interface Note {
  id: string;
  title: string;
  subject_name: string;
  content?: string;
  images?: string[];
  created_at: string;
  user_id?: string;
}

// New type for Timetable
export interface TimetableEvent {
  id: string;
  title: string;
  subject_name?: string;
  description?: string;
  start_time: string; // ISO string
  end_time: string;   // ISO string
  color: string;
  repeats?: string;
  original_id?: string;
  user_id?: string;
}

// New type for Flashcards
export interface Flashcard {
  question: string;
  answer: string;
}

export interface FlashcardSet {
  topic_id: string;
  topic_name: string;
  subject_name: string;
  cards: Flashcard[];
  score: number;
  user_id?: string;
}