# ⚡ BMI Calculator Pro - High Performance Astro 5 Web Application

A production-ready, ultra-fast, SEO-first Body Mass Index (BMI) calculator web application built with **Astro 5+**, **React Islands**, **Tailwind CSS v4**, **Framer Motion**, and **Recharts**.

![BMI Calculator Pro](https://bmicalculator.app/og-image.png)

## 🌟 Key Features

- **Instant Calculations**: Metric (cm/kg) and Imperial (feet+inches/lbs) unit switching with real-time recalculation.
- **Animated Semi-Circle Gauge**: Dynamic SVG gauge with spring-needle animation indicating WHO BMI categories.
- **Interactive Recharts Distribution Chart**: Visual distribution displaying standard cutoffs (18.5, 25, 30, 35, 40) with current user score highlighting.
- **Ideal Body Weight (IBW) Engine**: Calculates ideal weight using 4 clinical formulas:
  - Devine Formula (1974)
  - Robinson Formula (1983)
  - Miller Formula (1983)
  - BMI 22 Standard Median
- **Ponderal Index & Healthy Weight Range**: Computes volume-proportionality index ($kg/m^3$) and WHO healthy boundaries.
- **Personalized Insights**: Actionable health advice customized by age, gender, and weight delta.
- **Calculation History (LocalStorage)**: Save, track, and clear past BMI calculations with dates and categories.
- **PNG Export & Native Printing**: High-res PNG snapshot generator powered by `html2canvas`, native print layout, and URL parameters share link generator.
- **8 Satellite Health Calculators**:
  1. `/calorie-calculator` - TDEE Calorie Intake Calculator
  2. `/body-fat-calculator` - US Navy Body Fat Percentage Tool
  3. `/bmr-calculator` - Basal Metabolic Rate (Mifflin-St Jeor & Harris-Benedict)
  4. `/protein-calculator` - Daily Protein Intake Target Tool
  5. `/water-intake-calculator` - Daily Hydration Requirements Tool
  6. `/ideal-weight-calculator` - IBW Clinical Formula Comparison Tool
  7. `/healthy-weight-calculator` - WHO Healthy Weight Boundaries Tool
  8. `/waist-to-height-calculator` - Central Obesity & Cardiovascular Risk Tool
- **Full SEO & Structured Data Suite**:
  - `WebSite` Schema
  - `Organization` Schema
  - `WebApplication` / `SoftwareApplication` Schema
  - `FAQPage` Schema with 20+ comprehensive Q&As
  - `BreadcrumbList` Schema
  - OpenGraph & Twitter Cards
  - Automated `sitemap.xml` and `robots.txt`

---

## 🛠 Tech Stack

- **Framework**: [Astro 5+](https://astro.build)
- **UI Component Islands**: React 19
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Animation**: Framer Motion
- **Data Visualization**: Recharts
- **Icons**: Lucide Icons
- **Type Safety**: TypeScript Strict Mode

---

## 🚀 Deployment Instructions

### 1. Cloudflare Pages
1. Push repository to GitHub/GitLab.
2. Log into Cloudflare Dashboard -> **Workers & Pages** -> **Create Page** -> Connect Git repository.
3. Configure build settings:
   - **Framework preset**: `Astro`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
4. Click **Save and Deploy**.

### 2. Vercel
1. Install Vercel CLI or connect via [Vercel Dashboard](https://vercel.com).
2. Run command:
   ```bash
   npx vercel
   ```
3. Vercel automatically detects Astro and deploys zero-config.

### 3. Netlify
1. Connect repository in [Netlify Dashboard](https://app.netlify.com).
2. Set Build Settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. Click **Deploy Site**.

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start Astro dev server in background mode
astro dev --background

# Build production bundle
npm run build
```
