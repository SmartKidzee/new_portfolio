export interface Theme {
  id: string;
  name: string;
  bgGradient: string;
  pattern: string;
  font: string;
  description: string;
  previewBg?: string;
}

export interface TechItem {
  id: string;
  name: string;
  icon: string;
  category: 'language' | 'framework' | 'tool';
}

export interface FormData {
  name: string;
  photo?: string;
  selectedTheme: Theme;
  selectedTech: TechItem[];
  step: number;
}

export type Step = {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
};

export type Steps = Step[]; 