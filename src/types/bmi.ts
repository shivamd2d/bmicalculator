export type UnitSystem = 'metric' | 'imperial';

export type Gender = 'male' | 'female';

export type IdealWeightFormula = 'bmi22' | 'devine' | 'robinson' | 'miller';

export type BmiCategoryType = 
  | 'underweight' 
  | 'normal' 
  | 'overweight' 
  | 'obese1' 
  | 'obese2' 
  | 'obese3';

export interface BmiCategoryDetails {
  type: BmiCategoryType;
  label: string;
  rangeText: string;
  minBmi: number;
  maxBmi: number;
  color: string;
  bgColor: string;
  borderColor: string;
  textColor: string;
  badgeBg: string;
  iconName: string;
  description: string;
  healthAdvice: string[];
  risks: string[];
  recommendations: string[];
}

export interface BmiInput {
  unitSystem: UnitSystem;
  gender: Gender;
  age: number;
  // Metric inputs
  heightCm: number;
  weightKg: number;
  // Imperial inputs
  heightFeet: number;
  heightInches: number;
  weightLbs: number;
}

export interface IdealWeightFormulaResult {
  formula: IdealWeightFormula;
  name: string;
  weightKg: number;
  weightLbs: number;
  description: string;
}

export interface BmiResult {
  bmi: number;
  ponderalIndex: number;
  category: BmiCategoryDetails;
  heightCm: number;
  weightKg: number;
  heightInchesTotal: number;
  weightLbs: number;
  healthyWeightMinKg: number;
  healthyWeightMaxKg: number;
  healthyWeightMinLbs: number;
  healthyWeightMaxLbs: number;
  idealWeightKg: number;
  idealWeightLbs: number;
  idealWeightFormulas: Record<IdealWeightFormula, IdealWeightFormulaResult>;
  selectedFormula: IdealWeightFormula;
  weightDifferenceKg: number; // positive = over, negative = under, 0 = ideal
  weightDifferenceLbs: number;
  insights: string[];
}

export interface HistoryEntry {
  id: string;
  timestamp: number;
  dateStr: string;
  unitSystem: UnitSystem;
  gender: Gender;
  age: number;
  heightCm: number;
  weightKg: number;
  bmi: number;
  categoryLabel: string;
  categoryType: BmiCategoryType;
}

export interface FaqItem {
  question: string;
  answer: string;
  category?: string;
}

export interface MythItem {
  myth: string;
  fact: string;
  explanation: string;
}
