import { BMI_CATEGORIES, IDEAL_WEIGHT_FORMULAS_INFO } from '../constants/bmi';
import type { 
  BmiCategoryDetails, 
  BmiCategoryType, 
  BmiInput, 
  BmiResult, 
  IdealWeightFormula, 
  IdealWeightFormulaResult 
} from '../types/bmi';

export const KG_TO_LBS = 2.20462;
export const LBS_TO_KG = 0.453592;
export const CM_TO_INCHES = 0.393701;
export const INCHES_TO_CM = 2.54;
export const FEET_TO_INCHES = 12;

/**
 * Convert metric/imperial inputs into standard height in CM and weight in KG
 */
export function normalizeInputs(input: BmiInput): { heightCm: number; weightKg: number; heightInchesTotal: number; weightLbs: number } {
  let heightCm: number;
  let weightKg: number;
  let heightInchesTotal: number;
  let weightLbs: number;

  if (input.unitSystem === 'imperial') {
    heightInchesTotal = (input.heightFeet || 0) * FEET_TO_INCHES + (input.heightInches || 0);
    heightCm = heightInchesTotal * INCHES_TO_CM;
    weightLbs = input.weightLbs || 0;
    weightKg = weightLbs * LBS_TO_KG;
  } else {
    heightCm = input.heightCm || 0;
    weightKg = input.weightKg || 0;
    heightInchesTotal = heightCm * CM_TO_INCHES;
    weightLbs = weightKg * KG_TO_LBS;
  }

  return {
    heightCm: Math.max(1, heightCm),
    weightKg: Math.max(0.1, weightKg),
    heightInchesTotal: Math.max(0.4, heightInchesTotal),
    weightLbs: Math.max(0.2, weightLbs)
  };
}

/**
 * Identify BMI Category based on WHO standards
 */
export function getBmiCategory(bmi: number): BmiCategoryDetails {
  if (bmi < 18.5) return BMI_CATEGORIES.underweight;
  if (bmi < 25.0) return BMI_CATEGORIES.normal;
  if (bmi < 30.0) return BMI_CATEGORIES.overweight;
  if (bmi < 35.0) return BMI_CATEGORIES.obese1;
  if (bmi < 40.0) return BMI_CATEGORIES.obese2;
  return BMI_CATEGORIES.obese3;
}

/**
 * Ideal Body Weight (IBW) calculation formulas
 */
export function calculateIdealWeightFormulas(
  heightCm: number, 
  gender: 'male' | 'female'
): Record<IdealWeightFormula, IdealWeightFormulaResult> {
  const heightM = heightCm / 100;
  const heightInches = heightCm * CM_TO_INCHES;
  const inchesOver60 = Math.max(0, heightInches - 60);

  // 1. BMI 22 Median Formula
  const bmi22Kg = 22 * (heightM * heightM);

  // 2. Devine Formula (1974)
  const devineBase = gender === 'male' ? 50 : 45.5;
  const devineKg = devineBase + 2.3 * inchesOver60;

  // 3. Robinson Formula (1983)
  const robinsonBase = gender === 'male' ? 52 : 49;
  const robinsonFactor = gender === 'male' ? 1.9 : 1.7;
  const robinsonKg = robinsonBase + robinsonFactor * inchesOver60;

  // 4. Miller Formula (1983)
  const millerBase = gender === 'male' ? 56.2 : 53.1;
  const millerFactor = gender === 'male' ? 1.41 : 1.36;
  const millerKg = millerBase + millerFactor * inchesOver60;

  return {
    bmi22: {
      formula: 'bmi22',
      name: IDEAL_WEIGHT_FORMULAS_INFO.bmi22.name,
      weightKg: Math.round(bmi22Kg * 10) / 10,
      weightLbs: Math.round(bmi22Kg * KG_TO_LBS * 10) / 10,
      description: IDEAL_WEIGHT_FORMULAS_INFO.bmi22.description
    },
    devine: {
      formula: 'devine',
      name: IDEAL_WEIGHT_FORMULAS_INFO.devine.name,
      weightKg: Math.round(devineKg * 10) / 10,
      weightLbs: Math.round(devineKg * KG_TO_LBS * 10) / 10,
      description: IDEAL_WEIGHT_FORMULAS_INFO.devine.description
    },
    robinson: {
      formula: 'robinson',
      name: IDEAL_WEIGHT_FORMULAS_INFO.robinson.name,
      weightKg: Math.round(robinsonKg * 10) / 10,
      weightLbs: Math.round(robinsonKg * KG_TO_LBS * 10) / 10,
      description: IDEAL_WEIGHT_FORMULAS_INFO.robinson.description
    },
    miller: {
      formula: 'miller',
      name: IDEAL_WEIGHT_FORMULAS_INFO.miller.name,
      weightKg: Math.round(millerKg * 10) / 10,
      weightLbs: Math.round(millerKg * KG_TO_LBS * 10) / 10,
      description: IDEAL_WEIGHT_FORMULAS_INFO.miller.description
    }
  };
}

/**
 * Generate personalized actionable health insights based on BMI, category, weight delta, age, and gender
 */
export function generateHealthInsights(
  bmi: number,
  category: BmiCategoryDetails,
  weightDeltaKg: number,
  unitSystem: 'metric' | 'imperial',
  age: number,
  gender: 'male' | 'female'
): string[] {
  const insights: string[] = [];
  const absDeltaKg = Math.abs(weightDeltaKg);
  const absDeltaLbs = Math.round(absDeltaKg * KG_TO_LBS * 10) / 10;
  const roundedDeltaKg = Math.round(absDeltaKg * 10) / 10;

  const deltaText = unitSystem === 'metric' ? `${roundedDeltaKg} kg` : `${absDeltaLbs} lbs`;

  if (category.type === 'normal') {
    insights.push(`🎉 Congratulations! You are currently within the healthy weight range for your height.`);
    insights.push(`Maintaining your current weight through balanced nutrition and active habits is recommended.`);
  } else if (category.type === 'underweight') {
    insights.push(`⚠️ Gaining approximately ${deltaText} would place your BMI into the normal healthy range (18.5 – 24.9).`);
    insights.push(`Focus on nutrient-dense calorie sources and strength training to build healthy muscle mass.`);
  } else if (category.type === 'overweight') {
    insights.push(`💡 Losing approximately ${deltaText} would bring your BMI into the normal healthy range.`);
    insights.push(`Even a modest weight reduction of 5–10% yields significant metabolic and cardiovascular benefits.`);
  } else {
    insights.push(`⚠️ Reducing your weight by approximately ${deltaText} is recommended to reach the healthy BMI spectrum.`);
    insights.push(`Clinical studies show structured medical nutrition therapy combined with physical activity helps achieve long-term management.`);
  }

  // Age-based insight
  if (age >= 65) {
    insights.push(`ℹ️ Note: For adults aged 65 and older, research indicates a slightly higher BMI (23.0 – 27.9) may provide protective health benefits.`);
  }

  // Gender note
  if (gender === 'female') {
    insights.push(`🌸 Women naturally possess higher essential body fat percentages than men due to reproductive biology and hormonal factors.`);
  }

  return insights;
}

/**
 * Master calculation function for BMI
 */
export function calculateBMIResult(
  input: BmiInput,
  selectedFormula: IdealWeightFormula = 'bmi22'
): BmiResult {
  const { heightCm, weightKg, heightInchesTotal, weightLbs } = normalizeInputs(input);

  const heightM = heightCm / 100;
  const bmiRaw = weightKg / (heightM * heightM);
  const bmi = Math.round(bmiRaw * 10) / 10;

  const ponderalRaw = weightKg / (heightM * heightM * heightM);
  const ponderalIndex = Math.round(ponderalRaw * 10) / 10;

  const category = getBmiCategory(bmi);

  // Healthy Weight Range (BMI 18.5 - 24.9)
  const minHealthyKg = 18.5 * (heightM * heightM);
  const maxHealthyKg = 24.9 * (heightM * heightM);

  const healthyWeightMinKg = Math.round(minHealthyKg * 10) / 10;
  const healthyWeightMaxKg = Math.round(maxHealthyKg * 10) / 10;
  const healthyWeightMinLbs = Math.round(minHealthyKg * KG_TO_LBS * 10) / 10;
  const healthyWeightMaxLbs = Math.round(maxHealthyKg * KG_TO_LBS * 10) / 10;

  // Ideal weight formulas
  const idealFormulas = calculateIdealWeightFormulas(heightCm, input.gender);
  const targetIdeal = idealFormulas[selectedFormula] || idealFormulas.bmi22;

  const weightDifferenceKg = Math.round((weightKg - targetIdeal.weightKg) * 10) / 10;
  const weightDifferenceLbs = Math.round((weightLbs - targetIdeal.weightLbs) * 10) / 10;

  const insights = generateHealthInsights(
    bmi, 
    category, 
    weightDifferenceKg, 
    input.unitSystem, 
    input.age, 
    input.gender
  );

  return {
    bmi,
    ponderalIndex,
    category,
    heightCm: Math.round(heightCm * 10) / 10,
    weightKg: Math.round(weightKg * 10) / 10,
    heightInchesTotal: Math.round(heightInchesTotal * 10) / 10,
    weightLbs: Math.round(weightLbs * 10) / 10,
    healthyWeightMinKg,
    healthyWeightMaxKg,
    healthyWeightMinLbs,
    healthyWeightMaxLbs,
    idealWeightKg: targetIdeal.weightKg,
    idealWeightLbs: targetIdeal.weightLbs,
    idealWeightFormulas: idealFormulas,
    selectedFormula,
    weightDifferenceKg,
    weightDifferenceLbs,
    insights
  };
}
