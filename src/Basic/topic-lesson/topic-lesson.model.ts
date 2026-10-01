export interface LessonTab {
  id: string;
  label: string;
  heading: string;
  summary: string;
  steps: string[];
  code?: string;
  concepts?: string[];
  commonMistakes?: string[];
  note?: string;
  exercise?: string;
}

export interface TopicLesson {
  eyebrow: string;
  title: string;
  intro: string;
  foundations?: string[];
  commonMistakes?: string[];
  practice?: string;
  tabs: LessonTab[];
}
