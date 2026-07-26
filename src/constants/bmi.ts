import type { BmiCategoryDetails, BmiCategoryType, FaqItem, MythItem } from '../types/bmi';

export const BMI_CATEGORIES: Record<BmiCategoryType, BmiCategoryDetails> = {
  underweight: {
    type: 'underweight',
    label: 'Underweight',
    rangeText: '< 18.5',
    minBmi: 0,
    maxBmi: 18.49,
    color: '#3b82f6', // blue
    bgColor: 'bg-blue-50 dark:bg-blue-950/40',
    borderColor: 'border-blue-200 dark:border-blue-800',
    textColor: 'text-blue-600 dark:text-blue-400',
    badgeBg: 'bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-200',
    iconName: 'TrendingDown',
    description: 'Your BMI is below 18.5, indicating you may be underweight for your height.',
    healthAdvice: [
      'Focus on nutrient-dense foods rich in healthy fats, protein, and complex carbohydrates.',
      'Incorporate strength training exercises to build muscle mass rather than just body fat.',
      'Consult a dietitian or healthcare provider to rule out nutritional deficiencies or underlying health conditions.'
    ],
    risks: [
      'Nutritional deficiencies (anemia, vitamin shortages)',
      'Weakened immune system function',
      'Osteoporosis and bone density loss',
      'Hormonal imbalances and fertility difficulties'
    ],
    recommendations: [
      'Eat smaller, frequent meals throughout the day',
      'Add calorie-dense snacks like nuts, seeds, and avocados',
      'Avoid drinking large amounts of water before meals to preserve appetite'
    ]
  },
  normal: {
    type: 'normal',
    label: 'Normal Weight',
    rangeText: '18.5 – 24.9',
    minBmi: 18.5,
    maxBmi: 24.99,
    color: '#22c55e', // green
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/40',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    textColor: 'text-emerald-600 dark:text-emerald-400',
    badgeBg: 'bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200',
    iconName: 'CheckCircle2',
    description: 'Your BMI falls within the healthy range of 18.5 to 24.9.',
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
    color: '#eab308', // yellow / amber
    bgColor: 'bg-amber-50 dark:bg-amber-950/40',
    borderColor: 'border-amber-200 dark:border-amber-800',
    textColor: 'text-amber-600 dark:text-amber-400',
    badgeBg: 'bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200',
    iconName: 'AlertTriangle',
    description: 'Your BMI is between 25.0 and 29.9, suggesting you are carrying extra weight for your height.',
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
    color: '#f97316', // orange
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
    color: '#ef4444', // red
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
    color: '#991b1b', // dark red / crimson
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
    answer: 'In the metric system, BMI = weight (kg) ÷ [height (m)]². In the imperial system, BMI = [weight (lbs) ÷ (height (inches))²] × 703.'
  },
  {
    question: 'What is a healthy BMI range for adults?',
    answer: 'According to the World Health Organization (WHO), a normal or healthy BMI for adults aged 20 and over is between 18.5 and 24.9.'
  },
  {
    question: 'Does BMI apply to both men and women equally?',
    answer: 'While the standard WHO numerical categories apply to both adult men and women, women naturally carry higher body fat percentages than men at identical BMI levels due to hormonal and biological differences.'
  },
  {
    question: 'Why is BMI different for children and teenagers?',
    answer: 'Children and teens are still growing, and body fat levels vary significantly by age and sex. Therefore, child BMI is evaluated using age-and-gender-specific percentile growth charts rather than fixed adult thresholds.'
  },
  {
    question: 'What are the main limitations of BMI?',
    answer: 'BMI does not differentiate between muscle mass, bone density, water weight, and fat tissue. Athletes with high muscle mass may be misclassified as overweight or obese, while elderly individuals with muscle loss may have normal BMI despite elevated body fat.'
  },
  {
    question: 'What is the Ponderal Index and how is it different from BMI?',
    answer: 'The Ponderal Index (PI) measures body mass relative to height cubed (kg/m³) rather than height squared. It provides a more accurate proportionality measure for very tall or very short individuals.'
  },
  {
    question: 'How does age affect BMI interpretation?',
    answer: 'As people age, body composition shifts, naturally increasing fat percentage and reducing muscle mass. Research suggests that for adults over age 65, a slightly higher BMI (23–27.9) may actually offer protective health benefits.'
  },
  {
    question: 'What is the difference between BMI and Body Fat Percentage?',
    answer: 'BMI estimates overall body volume relative to height, whereas Body Fat Percentage measures the exact percentage of total body weight that consists of adipose (fat) tissue.'
  },
  {
    question: 'How can I lower my BMI safely?',
    answer: 'Safely lowering BMI involves creating a modest calorie deficit through a balanced whole-food diet, regular aerobic activity, resistance exercise to preserve muscle mass, adequate sleep, and proper hydration.'
  },
  {
    question: 'What is Ideal Body Weight (IBW)?',
    answer: 'Ideal Body Weight is a theoretical estimate of optimal body weight based on height, sex, and clinical research. Popular formulas include Devine, Robinson, Miller, and the standard BMI 22 median.'
  },
  {
    question: 'Can you have a normal BMI and still be unhealthy?',
    answer: 'Yes. This condition is often referred to as "Normal Weight Obesity" or "skinny fat." Individuals have a normal BMI but high levels of visceral fat around organs, raising risk for metabolic disorders.'
  },
  {
    question: 'Why does muscle mass affect BMI results?',
    answer: 'Muscle tissue is denser than fat tissue. A bodybuilder or athlete carrying significant lean muscle mass will weigh more for their height, resulting in an artificially elevated BMI despite low body fat.'
  },
  {
    question: 'Is BMI accurate for tall or short people?',
    answer: 'BMI can over-estimate fatness in tall people and under-estimate fatness in short people because body volume scales closer to height cubed than height squared. Using the Ponderal Index helps adjust for height extremes.'
  },
  {
    question: 'What health risks are associated with high BMI?',
    answer: 'High BMI values (≥25 for overweight, ≥30 for obese) are statistically linked to increased risk of cardiovascular disease, high blood pressure, Type 2 diabetes, gallstones, sleep apnea, osteoarthritis, and certain cancers.'
  },
  {
    question: 'What health risks are associated with low BMI?',
    answer: 'Low BMI (<18.5) can indicate malnutrition, osteoporosis, impaired immune response, anemia, electrolyte imbalance, and reproductive health complications.'
  },
  {
    question: 'Does ethnic background affect healthy BMI cutoffs?',
    answer: 'Yes. Clinical studies show that South Asian, East Asian, and Pacific Islander populations tend to store higher visceral fat at lower BMIs. Public health agencies suggest a lower overweight cutoff of 23.0 for Asian populations.'
  },
  {
    question: 'How often should I calculate or track my BMI?',
    answer: 'Tracking your BMI once per month or quarter is sufficient. Daily weight fluctuations are normal due to water retention and digestion, so focus on long-term trends rather than short-term variations.'
  },
  {
    question: 'Should pregnant women use a BMI calculator?',
    answer: 'No. Standard BMI calculations are invalid during pregnancy due to weight gain from fetal growth, placenta, amniotic fluid, and increased blood volume. Expectant mothers should follow prenatal weight guidelines from their obstetrician.'
  },
  {
    question: 'What other measurements should I combine with BMI for complete health evaluation?',
    answer: 'For a comprehensive health assessment, combine BMI with waist circumference (or Waist-to-Height Ratio), blood pressure, lipid profile, fasting blood glucose, and body fat percentage testing.'
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
    href: '/calorie-calculator',
    description: 'Determine your daily caloric intake needed for maintenance, weight loss, or muscle gain.',
    iconName: 'Flame'
  },
  {
    title: 'Body Fat Calculator',
    href: '/body-fat-calculator',
    description: 'Estimate your body fat percentage using US Navy body circumference methods.',
    iconName: 'Activity'
  },
  {
    title: 'BMR Calculator',
    href: '/bmr-calculator',
    description: 'Calculate your Basal Metabolic Rate using the Miffl-St Jeor and Harris-Benedict formulas.',
    iconName: 'HeartPulse'
  },
  {
    title: 'Protein Calculator',
    href: '/protein-calculator',
    description: 'Find your target daily protein requirement based on your activity level and fitness goals.',
    iconName: 'Dumbbell'
  },
  {
    title: 'Water Intake Calculator',
    href: '/water-intake-calculator',
    description: 'Calculate daily hydration requirements based on body weight, climate, and exercise routine.',
    iconName: 'Droplets'
  },
  {
    title: 'Ideal Weight Calculator',
    href: '/ideal-weight-calculator',
    description: 'Compare body weight targets across Devine, Robinson, Miller, and BMI 22 formulas.',
    iconName: 'Target'
  },
  {
    title: 'Healthy Weight Calculator',
    href: '/healthy-weight-calculator',
    description: 'Discover your personal healthy weight boundaries across WHO standards.',
    iconName: 'Scale'
  },
  {
    title: 'Waist-to-Height Calculator',
    href: '/waist-to-height-calculator',
    description: 'Assess abdominal obesity risk and cardiovascular health with Waist-to-Height ratio.',
    iconName: 'Ruler'
  }
];
