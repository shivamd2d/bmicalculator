import React, { useState } from 'react';
import { Dumbbell } from 'lucide-react';

export const ProteinCalculator: React.FC = () => {
  const [weightKg, setWeightKg] = useState<number>(70);
  const [goal, setGoal] = useState<'maintenance' | 'fatLoss' | 'muscleGain'>('muscleGain');

  // Protein ratios per kg bodyweight
  const ratio = goal === 'maintenance' ? 1.4 : goal === 'fatLoss' ? 2.0 : 1.8;
  const targetGrams = Math.round(weightKg * ratio);
  const minGrams = Math.round(weightKg * (ratio - 0.2));
  const maxGrams = Math.round(weightKg * (ratio + 0.3));

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-800 space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
        <Dumbbell className="w-6 h-6 text-emerald-500" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Daily Protein Intake Calculator</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold uppercase text-slate-500">Body Weight (kg)</label>
          <input
            type="number"
            value={weightKg}
            onChange={(e) => setWeightKg(parseFloat(e.target.value) || 0)}
            className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold"
          />
        </div>

        <div>
          <label className="text-xs font-bold uppercase text-slate-500">Primary Goal</label>
          <select
            value={goal}
            onChange={(e) => setGoal(e.target.value as any)}
            className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-xs"
          >
            <option value="maintenance">Weight Maintenance & General Fitness</option>
            <option value="fatLoss">Fat Loss (Preserve Lean Muscle)</option>
            <option value="muscleGain">Muscle Hypertrophy & Strength</option>
          </select>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center">
        <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Recommended Daily Protein Target</div>
        <div className="text-5xl font-black text-emerald-700 dark:text-emerald-300 mt-2">{targetGrams} <span className="text-lg font-normal">grams/day</span></div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Optimal intake range: {minGrams}g – {maxGrams}g per day ({ratio}g per kg bodyweight).</p>
      </div>
    </div>
  );
};
