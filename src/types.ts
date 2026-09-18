export type ElementCategory = 'education' | 'job' | 'milestone' | 'revelation' | 'personal';

export type SkillCategory = 'bp-sys' | 'mgmt-strat' | 'fin';

export interface AccordionSection {
  title: string;
  paragraphs: string[];
}

export interface ResumeItem {
  id: string;
  title: string;
  dateRange: string;
  categories: ElementCategory[];
  skills: SkillCategory[];
  significance: number; // symbol in original HTML (1: top importance / Deal, etc.)
  originalOrder: number;
  bullets: string[];
  xpndoTitle: string;
  locationDate: string;
  sections: AccordionSection[];
}

export type SortByOption = 'original-order' | 'significance';
export type SortDirection = 'asc' | 'desc';
export type ActivePage = 'home' | 'about';
