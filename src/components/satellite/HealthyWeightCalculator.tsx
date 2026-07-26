import React, { useState } from 'react';
import { Scale } from 'lucide-react';
import { KG_TO_LBS } from '../../utils/bmiMath';

export const HealthyWeightCalculator: React.FC = () => {
  const [heightCm, setHeightCm] = useState<number>(170);

  const heightM = heightCm / 100;
  const minKg = Math.round(18.5 * heightM * heightM * 10) / 10;
  const maxKg = Math.round(24.9 * heightM * heightM * 10) / 10;

  const minLbs = Math.round(minKg * KG_TO_LBS * 10) / 10;
  const maxLbs = Math.round(maxKg * KG_TO_LBS * 10) / 10;

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-800 space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
        <Scale className="w-6 h-6 text-emerald-500" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Healthy Weight Range Calculator</h2>
      </div>

      <div>
        <label className="text-xs font-bold uppercase text-slate-500">Your Height (cm)</label>
        <input
          type="number"
          value={heightCm}
          onChange={(e) => setHeightCm(parseFloat(e.target.value) || 0)}
          className="w-full mt-1 px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-lg"
        />
      </div>

      <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
        <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Healthy Weight Range for {heightCm} cm</div>
        <div className="text-4xl font-black text-emerald-700 dark:text-emerald-300">{minKg} kg – {maxKg} kg</div>
        <div className="text-sm font-semibold text-slate-600 dark:text-slate-400">({minLbs} lbs – {maxLbs} lbs)</div>
        <p className="text-xs text-slate-500 max-w-md mx-auto">This represents the body weight span corresponding to a healthy WHO Body Mass Index between 18.5 and 24.9.</p>
      </div>
    </div>
  );
};
