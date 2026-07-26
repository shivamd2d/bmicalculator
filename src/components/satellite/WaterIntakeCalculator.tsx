import React, { useState } from 'react';
import { Droplets } from 'lucide-react';

export const WaterIntakeCalculator: React.FC = () => {
  const [weightKg, setWeightKg] = useState<number>(70);
  const [exerciseMins, setExerciseMins] = useState<number>(30);
  const [climate, setClimate] = useState<'moderate' | 'hot'>('moderate');

  // Baseline 35ml per kg + 350ml per 30 min exercise + climate bonus
  let baseMl = weightKg * 35;
  let exerciseBonus = (exerciseMins / 30) * 350;
  let climateBonus = climate === 'hot' ? 500 : 0;

  const totalMl = Math.round(baseMl + exerciseBonus + climateBonus);
  const totalLiters = (totalMl / 1000).toFixed(1);
  const totalGlasses = Math.round(totalMl / 250);

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-800 space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
        <Droplets className="w-6 h-6 text-sky-500" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Daily Water Intake Calculator</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="text-xs font-bold uppercase text-slate-500">Weight (kg)</label>
          <input
            type="number"
            value={weightKg}
            onChange={(e) => setWeightKg(parseFloat(e.target.value) || 0)}
            className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold"
          />
        </div>

        <div>
          <label className="text-xs font-bold uppercase text-slate-500">Daily Exercise ({exerciseMins} mins)</label>
          <input
            type="range"
            min="0"
            max="180"
            step="15"
            value={exerciseMins}
            onChange={(e) => setExerciseMins(parseInt(e.target.value))}
            className="w-full mt-2 accent-sky-500"
          />
        </div>

        <div>
          <label className="text-xs font-bold uppercase text-slate-500">Climate Environment</label>
          <select
            value={climate}
            onChange={(e) => setClimate(e.target.value as any)}
            className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-xs"
          >
            <option value="moderate">Moderate / Tempered Climate</option>
            <option value="hot">Hot / Humid Climate</option>
          </select>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 text-center grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <div className="text-xs font-bold text-sky-600 uppercase">Target Daily Volume</div>
          <div className="text-4xl font-black text-sky-700 dark:text-sky-300 mt-1">{totalLiters} <span className="text-lg font-normal">Liters</span></div>
        </div>
        <div>
          <div className="text-xs font-bold text-sky-600 uppercase">Approximate Glasses</div>
          <div className="text-4xl font-black text-sky-700 dark:text-sky-300 mt-1">{totalGlasses} <span className="text-lg font-normal">glasses (8 oz)</span></div>
        </div>
      </div>
    </div>
  );
};
