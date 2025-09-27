export interface BiblicalVerse {
  reference: string;
  text: string;
  version?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  verse?: BiblicalVerse;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export interface DayStudy {
  day: string;
  date: string;
  rpsp: string;
  title: string;
  content: string;
  summary: string;
  keyPoints: string[];
  practicalApplication: string;
  questions?: string[];
  verses?: BiblicalVerse[];
  quiz: QuizQuestion[];
  readingTime?: number; // em minutos
}

export interface Lesson {
  number: number;
  title: string;
  subtitle?: string;
  memoryVerse: BiblicalVerse;
  startDate: string;
  endDate: string;
  summary: string;
  objectives: string[];
  weeklyReadings: string[];
  days: DayStudy[];
  color?: string;
  icon?: string;
}

export interface Quarter {
  id: string;
  number: number;
  year: number;
  title: string;
  bookTitle: string;
  description: string;
  author?: string;
  coverImage?: string;
  color: string;
  gradient: string;
  lessons: Lesson[];
  totalLessons: number;
}

export interface YearData {
  year: number;
  quarters: Quarter[];
}

export interface UserProgress {
  lessonId: string;
  dayIndex: number;
  completed: boolean;
  quizScore?: number;
  lastAccessed: Date;
}