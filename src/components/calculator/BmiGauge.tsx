import React from 'react';
import { motion } from 'framer-motion';
import type { BmiCategoryDetails } from '../../types/bmi';

interface BmiGaugeProps {
  bmi: number;
  category: BmiCategoryDetails;
}

export const BmiGauge: React.FC<BmiGaugeProps> = ({ bmi, category }) => {
  // Clamp BMI between 12 and 42 for angle mapping (180 degree semi-circle)
  // 12 BMI = -90 deg (start), 42 BMI = +90 deg (end)
  const minBmiScale = 12;
  const maxBmiScale = 42;
  const clampedBmi = Math.min(Math.max(bmi, minBmiScale), maxBmiScale);
  
  // Calculate needle rotation angle (-90deg to +90deg)
  const percentage = (clampedBmi - minBmiScale) / (maxBmiScale - minBmiScale);
  const needleAngle = -90 + percentage * 180;

  return (
    <div className="relative w-full max-w-[280px] sm:max-w-[320px] mx-auto flex flex-col items-center justify-center pt-4 pb-2">
      {/* SVG Arc Gauge */}
      <div className="relative w-full aspect-[2/1] overflow-hidden">
        <svg viewBox="0 0 200 110" className="w-full h-full">
          <defs>
            <linearGradient id="underweightGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="normalGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
            <linearGradient id="overweightGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#facc15" />
              <stop offset="100%" stopColor="#eab308" />
            </linearGradient>
            <linearGradient id="obeseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>

          {/* Background Track Arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="18"
            strokeLinecap="round"
            className="text-slate-200 dark:text-slate-800"
          />

          {/* Color Segments */}
          {/* Underweight Zone (12-18.5 => 21.6% of arc) */}
          <path
            d="M 20 100 A 80 80 0 0 1 54 43"
            fill="none"
            stroke="url(#underweightGrad)"
            strokeWidth="16"
            strokeLinecap="round"
          />
          {/* Normal Zone (18.5-25 => 21.6% of arc) */}
          <path
            d="M 54 43 A 80 80 0 0 1 100 20"
            fill="none"
            stroke="url(#normalGrad)"
            strokeWidth="16"
          />
          {/* Overweight Zone (25-30 => 16.6% of arc) */}
          <path
            d="M 100 20 A 80 80 0 0 1 146 43"
            fill="none"
            stroke="url(#overweightGrad)"
            strokeWidth="16"
          />
          {/* Obese Zone (30-42 => 40% of arc) */}
          <path
            d="M 146 43 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="url(#obeseGrad)"
            strokeWidth="16"
            strokeLinecap="round"
          />

          {/* Tick Labels */}
          <text x="18" y="108" fontSize="8" className="fill-slate-500 font-medium" textAnchor="middle">12</text>
          <text x="52" y="34" fontSize="8" className="fill-slate-500 font-medium" textAnchor="middle">18.5</text>
          <text x="100" y="12" fontSize="8" className="fill-slate-500 font-medium" textAnchor="middle">25</text>
          <text x="148" y="34" fontSize="8" className="fill-slate-500 font-medium" textAnchor="middle">30</text>
          <text x="182" y="108" fontSize="8" className="fill-slate-500 font-medium" textAnchor="middle">40+</text>
        </svg>

        {/* Animated Needle */}
        <motion.div
          className="absolute bottom-[4px] left-1/2 -translate-x-1/2 w-full h-full flex items-end justify-center pointer-events-none"
          initial={{ rotate: -90 }}
          animate={{ rotate: needleAngle }}
          transition={{ type: 'spring', stiffness: 60, damping: 15 }}
          style={{ transformOrigin: 'bottom center' }}
        >
          <div className="flex flex-col items-center">
            {/* Needle Shaft */}
            <div 
              className="w-1.5 h-20 sm:h-24 rounded-t-full shadow-md" 
              style={{ backgroundColor: category.color }}
            />
            {/* Center Pivot Pin */}
            <div 
              className="w-5 h-5 rounded-full border-4 border-white dark:border-slate-900 shadow-lg -mt-2"
              style={{ backgroundColor: category.color }}
            />
          </div>
        </motion.div>
      </div>

      {/* Numerical BMI Badge Below Gauge */}
      <motion.div 
        key={bmi}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="mt-2 text-center"
      >
        <div className="text-4xl sm:text-5xl font-extrabold tracking-tight" style={{ color: category.color }}>
          {bmi > 0 ? bmi.toFixed(1) : '--'}
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 mt-1.5 rounded-full text-xs sm:text-sm font-semibold shadow-sm" style={{ backgroundColor: `${category.color}20`, color: category.color }}>
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: category.color }} />
          {category.label}
        </div>
      </motion.div>
    </div>
  );
};
