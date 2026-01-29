
export type QuestionOption = {
  value: number;
  label: string;
  description?: string;
};

export type Question = {
  id: string;
  text: string;
  category: SectionId;
};

export type SectionId = 'gestion' | 'personas' | 'planeta' | 'prosperidad' | 'alianzas';

export type Section = {
  id: SectionId;
  title: string;
  description: string;
  color: string;
  icon: string;
};

export type CompanyData = {
  businessName?: string;
  size: string;
  sector: string;
  location: string;
  role: string;
};

export type AssessmentState = {
  step: 'welcome' | 'ods-intro' | 'company-info' | 'assessment' | 'results';
  companyData: CompanyData;
  answers: Record<string, number>; // questionId -> value (0-3 or -1 for NA)
  currentSectionIndex: number;
};
