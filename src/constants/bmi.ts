import type { BmiCategoryDetails, BmiCategoryType, FaqItem, MythItem } from '../types/bmi';

export const BMI_CATEGORIES: Record<BmiCategoryType, BmiCategoryDetails> = {
  severe_thinness: {
    type: 'severe_thinness',
    label: 'Severe Thinness',
    rangeText: '< 16.0',
    minBmi: 0,
    maxBmi: 15.99,
    color: '#ef4444', // Red
    bgColor: 'bg-red-50 dark:bg-red-950/40',
    borderColor: 'border-red-200 dark:border-red-800',
    textColor: 'text-red-600 dark:text-red-400',
    badgeBg: 'bg-red-100 dark:bg-red-900/60 text-red-800 dark:text-red-200',
    iconName: 'AlertOctagon',
    description: 'BMI is under 16.0, representing severe thinness and potential undernutrition risk.',
    healthAdvice: [
      'Immediate medical evaluation is strongly recommended to assess underlying nutritional deficiency.',
      'Prioritize structured caloric refeeding under medical supervision.',
      'Incorporate nutrient-dense foods and essential micro-nutrients.'
    ],
    risks: [
      'Severe muscle wasting and electrolyte imbalance',
      'Impaired immune defense and heightened infection risk',
      'Osteopenia and cardiovascular stress'
    ],
    recommendations: [
      'Consult a physician and registered dietitian immediately',
      'Follow a tailored medical nutrition therapy plan',
      'Avoid unmonitored strenuous exercise until cleared'
    ]
  },
  moderate_thinness: {
    type: 'moderate_thinness',
    label: 'Moderate Thinness',
    rangeText: '16.0 – 16.9',
    minBmi: 16.0,
    maxBmi: 16.99,
    color: '#f97316', // Orange
    bgColor: 'bg-orange-50 dark:bg-orange-950/40',
    borderColor: 'border-orange-200 dark:border-orange-800',
    textColor: 'text-orange-600 dark:text-orange-400',
    badgeBg: 'bg-orange-100 dark:bg-orange-900/60 text-orange-800 dark:text-orange-200',
    iconName: 'AlertTriangle',
    description: 'BMI between 16.0 and 16.9 indicates moderate thinness requiring nutritional focus.',
    healthAdvice: [
      'Increase daily caloric intake with wholesome, nutrient-dense foods.',
      'Combine calorie surplus with gentle strength training to build lean body mass.',
      'Monitor energy levels, sleep quality, and digestive health.'
    ],
    risks: [
      'Fatigue, dizziness, and low physical stamina',
      'Hormonal irregularities and bone density reduction',
      'Nutritional shortages in key vitamins and minerals'
    ],
    recommendations: [
      'Eat 4-5 frequent meals featuring healthy fats, proteins, and complex carbs',
      'Include nut butters, seeds, whole milk products, and avocados',
      'Schedule routine health checkups'
    ]
  },
  mild_thinness: {
    type: 'mild_thinness',
    label: 'Mild Thinness',
    rangeText: '17.0 – 18.4',
    minBmi: 17.0,
    maxBmi: 18.49,
    color: '#eab308', // Yellow
    bgColor: 'bg-amber-50 dark:bg-amber-950/40',
    borderColor: 'border-amber-200 dark:border-amber-800',
    textColor: 'text-amber-600 dark:text-amber-400',
    badgeBg: 'bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200',
    iconName: 'TrendingDown',
    description: 'BMI between 17.0 and 18.4 represents mild thinness, slightly below optimal WHO range.',
    healthAdvice: [
      'Slightly increasing nutrient intake can bring body mass into the normal healthy spectrum.',
      'Focus on muscle building through progressive resistance exercise.',
      'Ensure adequate protein intake (1.2–1.6g per kg of body weight).'
    ],
    risks: [
      'Slightly elevated risk of bone fragility and low muscle reserve',
      'Potential vulnerability during prolonged illness'
    ],
    recommendations: [
      'Add nutrient-dense snacks between main meals',
      'Incorporate resistance workouts 2-3 times weekly',
      'Track weight trends monthly'
    ]
  },
  underweight: {
    type: 'underweight',
    label: 'Underweight',
    rangeText: '< 18.5',
    minBmi: 0,
    maxBmi: 18.49,
    color: '#3b82f6',
    bgColor: 'bg-blue-50 dark:bg-blue-950/40',
    borderColor: 'border-blue-200 dark:border-blue-800',
    textColor: 'text-blue-600 dark:text-blue-400',
    badgeBg: 'bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200',
    iconName: 'TrendingDown',
    description: 'BMI is below 18.5, indicating weight below the standard WHO recommendation.',
    healthAdvice: [
      'Focus on nutrient-dense foods rich in healthy fats, protein, and complex carbohydrates.',
      'Incorporate strength training exercises to build muscle mass rather than just body fat.',
      'Consult a dietitian or healthcare provider to rule out nutritional deficiencies.'
    ],
    risks: [
      'Nutritional deficiencies (anemia, vitamin shortages)',
      'Weakened immune system function',
      'Osteoporosis and bone density loss'
    ],
    recommendations: [
      'Eat smaller, frequent meals throughout the day',
      'Add calorie-dense snacks like nuts, seeds, and avocados',
      'Preserve appetite by taking liquids between meals'
    ]
  },
  normal: {
    type: 'normal',
    label: 'Normal Weight',
    rangeText: '18.5 – 24.9',
    minBmi: 18.5,
    maxBmi: 24.99,
    color: '#22c55e', // Green
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/40',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    textColor: 'text-emerald-600 dark:text-emerald-400',
    badgeBg: 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200',
    iconName: 'CheckCircle2',
    description: 'Your BMI falls within the healthy optimal range of 18.5 to 24.9.',
    healthAdvice: [
      'Maintain your healthy weight through a balanced diet and regular physical activity.',
      'Aim for at least 150 minutes of moderate aerobic activity or 75 minutes of vigorous activity weekly.',
      'Focus on sleep quality (7-9 hours daily) and stress management to maintain metabolic health.'
    ],
    risks: [
      'Low baseline risk for weight-related cardiovascular or metabolic diseases',
      'Maintaining abdominal visceral fat can still carry subtle metabolic risks even with normal BMI'
    ],
    recommendations: [
      'Continue eating whole foods, lean proteins, vegetables, and whole grains',
      'Combine cardiovascular exercise with resistance training 2-3 times per week',
      'Schedule annual wellness checkups and routine blood work'
    ]
  },
  overweight: {
    type: 'overweight',
    label: 'Overweight',
    rangeText: '25.0 – 29.9',
    minBmi: 25.0,
    maxBmi: 29.99,
    color: '#f59e0b', // Yellow/Amber
    bgColor: 'bg-amber-50 dark:bg-amber-950/40',
    borderColor: 'border-amber-200 dark:border-amber-800',
    textColor: 'text-amber-600 dark:text-amber-400',
    badgeBg: 'bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200',
    iconName: 'AlertTriangle',
    description: 'Your BMI is between 25.0 and 29.9, suggesting extra weight relative to height.',
    healthAdvice: [
      'Slight weight reductions (5-10% of total body weight) yield substantial cardiovascular benefits.',
      'Focus on sustainable lifestyle modifications rather than restrictive crash diets.',
      'Increase daily physical movement through walking, cycling, or structured workout routines.'
    ],
    risks: [
      'Elevated risk of hypertension (high blood pressure)',
      'Increased strain on weight-bearing joints (knees, hips)',
      'Higher likelihood of developing insulin resistance or Type 2 Diabetes'
    ],
    recommendations: [
      'Reduce processed foods, sugary beverages, and refined carbohydrates',
      'Increase dietary fiber to enhance satiety and aid digestion',
      'Track daily steps with a goal of 8,000 to 10,000 steps daily'
    ]
  },
  obese1: {
    type: 'obese1',
    label: 'Obese Class I',
    rangeText: '30.0 – 34.9',
    minBmi: 30.0,
    maxBmi: 34.99,
    color: '#f97316', // Orange
    bgColor: 'bg-orange-50 dark:bg-orange-950/40',
    borderColor: 'border-orange-200 dark:border-orange-800',
    textColor: 'text-orange-600 dark:text-orange-400',
    badgeBg: 'bg-orange-100 dark:bg-orange-900/60 text-orange-800 dark:text-orange-200',
    iconName: 'AlertCircle',
    description: 'Your BMI is between 30.0 and 34.9, which falls into Obese Class I.',
    healthAdvice: [
      'Working alongside a medical professional or registered dietitian is strongly recommended.',
      'Prioritize cardiovascular fitness alongside caloric management to protect heart health.',
      'Monitor metabolic indicators such as fasting glucose, lipid panel, and blood pressure.'
    ],
    risks: [
      'Higher risk of Type 2 Diabetes, coronary artery disease, and fatty liver disease',
      'Potential for obstructive sleep apnea and daytime fatigue',
      'Joint inflammation and chronic lower back pain'
    ],
    recommendations: [
      'Create a modest daily calorie deficit of 300-500 kcal',
      'Engage in low-impact cardio like swimming or water aerobics to protect joints',
      'Seek behavioral support or health coaching for sustained motivation'
    ]
  },
  obese2: {
    type: 'obese2',
    label: 'Obese Class II',
    rangeText: '35.0 – 39.9',
    minBmi: 35.0,
    maxBmi: 39.99,
    color: '#ef4444', // Red
    bgColor: 'bg-rose-50 dark:bg-rose-950/40',
    borderColor: 'border-rose-200 dark:border-rose-800',
    textColor: 'text-rose-600 dark:text-rose-400',
    badgeBg: 'bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-200',
    iconName: 'ShieldAlert',
    description: 'Your BMI is between 35.0 and 39.9, categorized as Obese Class II (Severe).',
    healthAdvice: [
      'Comprehensive clinical management including diet, exercise, and medical evaluation is advised.',
      'Target long-term habit changes to lower metabolic disease risk factors.',
      'Discuss personalized treatment plans with a specialized bariatric physician or endocrinologist.'
    ],
    risks: [
      'Substantial risk of severe cardiovascular events and stroke',
      'High probability of clinical sleep apnea and pulmonary restriction',
      'Increased risk for several obesity-related cancers'
    ],
    recommendations: [
      'Undergo medical evaluation for metabolic syndrome and sleep apnea',
      'Follow structured medical nutrition therapy under guidance',
      'Explore evidence-based pharmacological or therapeutic interventions if appropriate'
    ]
  },
  obese3: {
    type: 'obese3',
    label: 'Obese Class III',
    rangeText: '≥ 40.0',
    minBmi: 40.0,
    maxBmi: 100.0,
    color: '#991b1b', // Dark Red / Crimson
    bgColor: 'bg-red-50 dark:bg-red-950/50',
    borderColor: 'border-red-300 dark:border-red-800',
    textColor: 'text-red-700 dark:text-red-300',
    badgeBg: 'bg-red-200 dark:bg-red-900/80 text-red-900 dark:text-red-100',
    iconName: 'OctagonAlert',
    description: 'Your BMI is 40.0 or higher, classified as Obese Class III (Very Severe / Morbid).',
    healthAdvice: [
      'Clinical consultation with a healthcare provider is essential for health management.',
      'Focus on small, doable non-scale victories such as improved mobility and stamina.',
      'A multi-disciplinary approach combining medical, nutritional, and physical therapy produces the best outcomes.'
    ],
    risks: [
      'Very high risk of chronic disease complications and reduced longevity',
      'Severe respiratory impairment and vascular strain',
      'Significant mobility restriction and joint degradation'
    ],
    recommendations: [
      'Schedule a comprehensive clinical assessment with a medical expert',
      'Start with gentle seated exercises or aquatic therapy',
      'Review medical, metabolic, and surgical treatment options with your doctor'
    ]
  }
};

export const IDEAL_WEIGHT_FORMULAS_INFO = {
  bmi22: {
    name: 'BMI 22 Standard',
    description: 'Calculates the weight corresponding to a median healthy BMI score of 22.0. Recommended by many medical guidelines.'
  },
  devine: {
    name: 'Devine Formula (1974)',
    description: 'The most commonly used formula in clinical medicine for calculating drug dosages and renal function clearance.'
  },
  robinson: {
    name: 'Robinson Formula (1983)',
    description: 'A modification of the Devine formula intended to provide higher accuracy for modern populations.'
  },
  miller: {
    name: 'Miller Formula (1983)',
    description: 'Created as an alternative estimation based on statistical modeling of average adult body proportions.'
  }
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'What is BMI (Body Mass Index)?',
    answer: 'Body Mass Index (BMI) is a widely recognized screening tool used to estimate body fatness based on a person’s height and weight. It is calculated by dividing weight in kilograms by height in meters squared (kg/m²).'
  },
  {
    question: 'How is BMI calculated?',
    answer: 'In the metric system, BMI = weight (kg) ÷ [height (m)]². In the imperial system, BMI = 703 × weight (lbs) ÷ [height (inches)]².'
  },
  {
    question: 'What is a healthy BMI range for adults?',
    answer: 'According to the World Health Organization (WHO), a normal or healthy BMI for adults aged 20 and over is between 18.5 and 24.9.'
  },
  {
    question: 'What is BMI Prime and how is it calculated?',
    answer: 'BMI Prime is the ratio of your actual BMI to the upper boundary of healthy BMI (25.0). Formula: BMI Prime = BMI / 25.0. Values below 0.74 represent underweight, 0.74 to 1.0 represent normal weight, 1.0 to 1.2 represent overweight, and > 1.2 represent obesity.'
  },
  {
    question: 'What is the Ponderal Index?',
    answer: 'The Ponderal Index (PI) measures body mass relative to height cubed (kg/m³) or height in inches divided by the cube root of weight in lbs. It provides a truer measure of body proportionality for very tall or short individuals.'
  },
  {
    question: 'Does BMI apply to both men and women equally?',
    answer: 'While the standard WHO numerical categories apply to both adult men and women, women naturally carry higher body fat percentages than men at identical BMI levels due to hormonal and biological differences.'
  },
  {
    question: 'Why is BMI different for children and teenagers?',
    answer: 'Children and teens are still growing, and body fat levels vary significantly by age and sex. Therefore, child BMI is evaluated using CDC percentile growth charts (underweight <5th, healthy 5th-85th, at risk 85th-95th, overweight >95th) rather than fixed adult thresholds.'
  },
  {
    question: 'What are the main limitations of BMI?',
    answer: 'BMI does not differentiate between muscle mass, bone density, water weight, and fat tissue. Athletes with high muscle mass may be misclassified as overweight or obese, while elderly individuals with muscle loss may have normal BMI despite elevated body fat.'
  }
];

export const MYTHS_LIST: MythItem[] = [
  {
    myth: 'Myth 1: BMI is a definitive diagnostic tool for personal health.',
    fact: 'Fact: BMI is a population-level screening metric, not an individual diagnostic test.',
    explanation: 'A full medical evaluation requires assessing metabolic biomarkers, blood pressure, lifestyle habits, and body composition alongside BMI.'
  },
  {
    myth: 'Myth 2: Everyone with an "Overweight" BMI needs to lose weight immediately.',
    fact: 'Fact: Fitness and metabolic health can exist across different BMI categories.',
    explanation: 'Active individuals with high muscularity or robust cardiovascular fitness may have an overweight BMI without elevated metabolic health risks.'
  },
  {
    myth: 'Myth 3: Muscle and fat weigh different amounts.',
    fact: 'Fact: One pound of muscle weighs the exact same as one pound of fat.',
    explanation: 'The difference lies in density. Muscle tissue is roughly 18% denser than fat tissue, occupying much less physical volume per unit of weight.'
  },
  {
    myth: 'Myth 4: A single ideal weight exists for every height.',
    fact: 'Fact: Ideal weight is a flexible range influenced by frame size, muscle mass, and age.',
    explanation: 'There is a healthy span of 20-30 pounds for any given height, allowing for natural variance in skeletal structure and genetics.'
  }
];

export const SATELLITE_TOOLS = [
  {
    title: 'Calorie Calculator',
    href: 'calorie-calculator',
    description: 'Determine your daily caloric intake needed for maintenance, weight loss, or muscle gain.',
    iconName: 'Flame'
  },
  {
    title: 'Body Fat Calculator',
    href: 'body-fat-calculator',
    description: 'Estimate your body fat percentage using US Navy body circumference methods.',
    iconName: 'Activity'
  },
  {
    title: 'BMR Calculator',
    href: 'bmr-calculator',
    description: 'Calculate your Basal Metabolic Rate using the Miffl-St Jeor and Harris-Benedict formulas.',
    iconName: 'HeartPulse'
  },
  {
    title: 'Protein Calculator',
    href: 'protein-calculator',
    description: 'Find your target daily protein requirement based on your activity level and fitness goals.',
    iconName: 'Dumbbell'
  },
  {
    title: 'Water Intake Calculator',
    href: 'water-intake-calculator',
    description: 'Calculate daily hydration requirements based on body weight, climate, and exercise routine.',
    iconName: 'Droplets'
  },
  {
    title: 'Ideal Weight Calculator',
    href: 'ideal-weight-calculator',
    description: 'Compare body weight targets across Devine, Robinson, Miller, and BMI 22 formulas.',
    iconName: 'Target'
  },
  {
    title: 'Healthy Weight Calculator',
    href: 'healthy-weight-calculator',
    description: 'Discover your personal healthy weight boundaries across WHO standards.',
    iconName: 'Scale'
  },
  {
    title: 'Waist-to-Height Calculator',
    href: 'waist-to-height-calculator',
    description: 'Assess abdominal obesity risk and cardiovascular health with Waist-to-Height ratio.',
    iconName: 'Ruler'
  }
];
