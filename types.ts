export interface Option {
  id: string;
  label: string;
  image?: string;
  description?: string;
}

export interface Question {
  id: string;
  title: string;
  subtitle: string;
  options: Option[];
}

export interface WatchConfig {
  [key: string]: string;
}

export enum AppState {
  INTRO = 'INTRO',
  WIZARD = 'WIZARD',
  GENERATING = 'GENERATING',
  RESULT = 'RESULT',
  EDITING = 'EDITING', // Slight variation of RESULT with loading overlay
}

// "Nano banana" model alias per instructions
export const GENERATION_MODEL = 'gemini-2.5-flash-image';
