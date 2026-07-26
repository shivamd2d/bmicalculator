import React, { useState } from 'react';
import { Ruler, ShieldAlert } from 'lucide-react';

export const WaistToHeightCalculator: React.FC = () => {
  const [heightCm, setHeightCm] = useState<number>(175);
  const [waistCm, setWaistCm] = useState<number>(82);

  const ratio = Math.round((waistCm / Math.max(1, heightCm)) * 100) / 100;

  let riskCategory = 'Healthy / Low Risk';
  let colorClass = 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800';

  if (ratio < 0.4) {
    riskCategory = 'Slim / Underweight Risk';
    colorClass = 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800';
  } else if (ratio >= 0.5 && ratio < 0.6) {
    riskCategory = 'Increased Risk (Overweight)';
    colorClass = 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800';
  } else if (ratio >= 0.6) {
    riskCategory = 'High Cardiovascular Risk';
    colorClass = 'text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800';
  }

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-800 space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
        <Ruler className="w-6 h-6 text-indigo-500" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Waist-to-Height Ratio Calculator</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold uppercase text-slate-500">Height (cm)</label>
          <input
            type="number"
            value={heightCm}
            onChange={(e) => setHeightCm(parseFloat(e.target.value) || 0)}
            className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold"
          />
        </div>

        <div>
          <label className="text-xs font-bold uppercase text-slate-500">Waist Circumference (cm)</label>
          <input
            type="number"
            value={waistCm}
            onChange={(e) => setWaistCm(parseFloat(e.target.value) || 0)}
            className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold"
          />
        </div>
      </div>

      <div className={`p-6 rounded-2xl border ${colorClass} text-center space-y-2`}>
        <div className="text-xs font-bold uppercase tracking-wider">Waist-to-Height Ratio</div>
        <div className="text-5xl font-black">{ratio}</div>
        <div className="text-sm font-bold uppercase tracking-wide">{riskCategory}</div>
        <p className="text-xs opacity-90 max-w-md mx-auto">A golden rule of thumb for metabolic health is keeping your waist circumference under half your height (ratio &lt; 0.50).</p>
      </div>
    </div>
  );
};
