export interface DayStudy {
  day: string;
  date: string;
  rpsp: string;
  title: string;
  content: string;
  questions?: string[];
  verses?: string[];
}

export interface Lesson {
  number: number;
  title: string;
  memoryVerse: string;
  startDate: string;
  endDate: string;
  summary: string;
  weeklyReadings: string[];
  days: DayStudy[];
}

export interface LessonData {
  quarter: string;
  year: number;
  bookTitle: string;
  lessons: Lesson[];
}