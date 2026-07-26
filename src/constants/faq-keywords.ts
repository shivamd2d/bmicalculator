import type { FaqItem } from '../types/bmi';

/**
 * Keyword-targeted FAQ entries — targeting high-volume BMI search queries
 * These are automatically included in:
 * - The FAQPage JSON-LD structured data schema
 * - The homepage FAQ accordion section
 */
export const KEYWORD_FAQ_ITEMS: FaqItem[] = [
  {
    question: 'How to calculate BMI?',
    answer: 'To calculate BMI, divide your weight in kilograms by your height in metres squared: BMI = weight (kg) divided by height squared (m2). Example: 70 kg divided by (1.75 x 1.75) = 22.9 BMI. In imperial units: BMI = [weight (lbs) divided by height squared (inches squared)] x 703. Use the BMI calculator above for an instant result.'
  },
  {
    question: 'What is BMI?',
    answer: 'BMI (Body Mass Index) is a numerical screening tool calculated from your height and weight that classifies body weight as Underweight (below 18.5), Normal Weight (18.5 to 24.9), Overweight (25 to 29.9), or Obese (30 and above). Endorsed by the World Health Organization, it is the most widely used population-level weight screening metric worldwide.'
  },
  {
    question: 'What is the BMI formula?',
    answer: 'The standard BMI formula is: BMI = weight (kg) divided by height squared (m2). In imperial units: BMI = [weight (lbs) divided by height squared (inches)] x 703. Example: a person weighing 68 kg at 1.70 m height has BMI = 68 divided by 2.89 = 23.5, which is Normal Weight.'
  },
  {
    question: 'What is the BMI chart?',
    answer: 'A BMI chart is a colour-coded reference mapping height and weight to health categories: Blue = Underweight (below 18.5), Green = Normal Weight (18.5 to 24.9), Amber = Overweight (25 to 29.9), Orange = Obese Class I (30 to 34.9), Red = Obese Class II and III (35 and above). Our calculator includes a live interactive BMI distribution chart showing exactly where your score falls.'
  },
  {
    question: 'What is the full form of BMI?',
    answer: 'The full form of BMI is Body Mass Index. It is calculated from a person\'s weight and height to classify weight-related health risk. BMI was popularised by physiologist Ancel Keys in 1972, building on work by Belgian mathematician Adolphe Quetelet.'
  },
  {
    question: 'How to use a BMI calculator for men?',
    answer: 'Men use the same BMI formula: BMI = weight (kg) divided by height squared (m2). A healthy BMI for adult men is 18.5 to 24.9. Enter your height, weight, and select Male in the calculator above for tailored results including ideal body weight and personalised insights. Muscular men may show elevated BMI despite low body fat due to greater muscle density.'
  },
  {
    question: 'How to use a BMI calculator for women?',
    answer: 'To use the BMI calculator for women, enter your height, weight, age, and select Female. The formula is: BMI = weight (kg) divided by height squared (m2). Women naturally carry higher essential body fat than men. A healthy BMI of 18.5 to 24.9 applies to adult women, with body fat percentage offering additional context.'
  },
  {
    question: 'How to calculate BMI in kg with age?',
    answer: 'Enter your weight in kg, height in cm, and age into the BMI calculator above. Age is factored into the personalised health insights: adults over 65 may benefit from a slightly higher BMI of 23 to 27. The calculation itself uses the standard formula regardless of age: BMI = weight (kg) divided by height squared (m2).'
  },
  {
    question: 'What is a normal BMI range?',
    answer: 'The normal BMI range for adults is 18.5 to 24.9 according to WHO guidelines. Below 18.5 is Underweight; 25 to 29.9 is Overweight; 30 to 34.9 is Obese Class I; 35 to 39.9 is Obese Class II; 40 and above is Obese Class III. For South and East Asian adults, a lower Overweight threshold of 23.0 is often recommended.'
  },
  {
    question: 'What is a normal BMI?',
    answer: 'A normal BMI for adults is a score between 18.5 and 24.9, associated with the lowest statistical risk of weight-related chronic diseases including cardiovascular disease, Type 2 diabetes, and hypertension. Within this range, a BMI of 20 to 22 is often considered optimal for longevity and metabolic health.'
  },
  {
    question: 'What does BMI mean?',
    answer: 'BMI means Body Mass Index. It is a number derived from your weight and height indicating whether your body weight is proportional to your height. A BMI of 22 means your weight is in a medically optimal range. A high BMI suggests excess body weight relative to height; a low BMI suggests insufficient weight.'
  },
  {
    question: 'What is a BMI index?',
    answer: 'A BMI index refers to the Body Mass Index scale and its WHO-established category thresholds: below 18.5 (Underweight), 18.5 to 24.9 (Normal Weight), 25 to 29.9 (Overweight), 30 to 34.9 (Obese Class I), 35 to 39.9 (Obese Class II), and 40 and above (Obese Class III). These thresholds are used globally by clinicians and public health researchers.'
  },
  {
    question: 'How do I calculate my BMI?',
    answer: 'Calculate your BMI in 3 steps: (1) Weigh yourself in kilograms. (2) Measure your height in metres. (3) Apply: BMI = weight divided by height squared. Or use the free calculator at the top of this page. Enter your unit system, age, gender, height, and weight to get your BMI score, healthy weight range, ideal weight, and personalised health insights instantly.'
  },
  {
    question: 'What is a good BMI for my age?',
    answer: 'For adults aged 20 to 64, a good BMI is 18.5 to 24.9. Adults aged 65 and older may benefit from a slightly higher range of 23 to 27 to guard against frailty and muscle loss. For children and teens, BMI is assessed using age- and sex-specific growth percentile charts; a reading between the 5th and 85th percentile is considered healthy.'
  },
  {
    question: 'What is a good BMI for men?',
    answer: 'A good BMI for adult men is 18.5 to 24.9. Many health experts suggest men target a BMI closer to 22 to 23 for optimal cardiovascular health. Men with high muscle mass may have a BMI above 25 despite low body fat; in such cases, waist circumference or body fat percentage testing offers a more accurate health picture.'
  },
  {
    question: 'What is a good BMI for women?',
    answer: 'A healthy BMI for adult women is 18.5 to 24.9. Women naturally carry higher body fat percentages than men at equivalent BMI values, which is physiologically normal. Postmenopausal women may be advised to maintain a BMI in the 22 to 26 range to support bone density and hormonal health.'
  },
  {
    question: 'BMI kya hota hai?',
    answer: 'BMI (Body Mass Index) ek health screening number hai jo weight aur height ke ratio se calculate hota hai. Formula: BMI = weight (kg) divided by height squared (metres). WHO ke anusar, 18.5 to 24.9 normal range hai, 25 to 29.9 overweight, aur 30 se upar obese category mein aata hai. Upar diye gaye calculator mein apna BMI turant check karein.'
  },
  {
    question: 'BMI ka full form kya hai?',
    answer: 'BMI ka full form hai Body Mass Index. Yeh ek mathematical formula hai jo weight aur height ka anupaat dikhata hai aur logon ko Underweight, Normal, Overweight, ya Obese category mein classify karta hai. Iski normal range 18.5 se 24.9 hai. WHO aur duniya bhar ke health organisations is tool ka use karte hain.'
  },
  {
    question: 'BMI kya hai?',
    answer: 'BMI yaani Body Mass Index ek anka hai jo weight aur height ke beech ka sambandh batata hai. Formula: BMI = weight (kg) divided by height squared (m2). 18.5 se kam Underweight, 18.5 to 24.9 Normal, 25 to 29.9 Overweight, aur 30 se zyada Obese. Hamare free calculator mein turant result payein.'
  },
  {
    question: 'BMI kitna hona chahiye?',
    answer: 'WHO ke anusar, healthy adult ke liye BMI 18.5 se 24.9 ke beech honi chahiye. 65 saal se upar ke logon ke liye 23 to 27 ka BMI zyada appropriate ho sakta hai. Sirf BMI par rely nahi karna chahiye -- waist size, blood pressure, aur blood glucose milaakar poori health picture banati hai.'
  }
];
