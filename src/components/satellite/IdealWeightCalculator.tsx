import React, { useState } from 'react';
import { Target } from 'lucide-react';
import { calculateIdealWeightFormulas } from '../../utils/bmiMath';

export const IdealWeightCalculator: React.FC = () => {
  const [gender, setGender] = useState<'male' | 'female'>('female');
  const [heightCm, setHeightCm] = useState<number>(168);

  const formulas = calculateIdealWeightFormulas(heightCm, gender);

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-800 space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
        <Target className="w-6 h-6 text-purple-500" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Ideal Body Weight Calculator</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-bold uppercase text-slate-500">Gender</label>
          <div className="grid grid-cols-2 gap-2 mt-1">
            <button
              onClick={() => setGender('female')}
              className={`py-2 rounded-xl text-xs font-bold ${gender === 'female' ? 'bg-pink-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
            >Female</button>
            <button
              onClick={() => setGender('male')}
              className={`py-2 rounded-xl text-xs font-bold ${gender === 'male' ? 'bg-blue-500 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}
            >Male</button>
          </div>
        </div>

        <div>
          <label className="text-xs font-bold uppercase text-slate-500">Height (cm)</label>
          <input
            type="number"
            value={heightCm}
            onChange={(e) => setHeightCm(parseFloat(e.target.value) || 0)}
            className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
        {Object.values(formulas).map((item) => (
          <div key={item.formula} className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="text-xs font-bold text-indigo-600 dark:text-indigo-400">{item.name}</div>
            <div className="text-3xl font-black text-slate-900 dark:text-white mt-1">
              {item.weightKg} <span className="text-xs font-normal text-slate-500">kg</span> ({item.weightLbs} lbs)
            </div>
            <p className="text-[11px] text-slate-500 mt-2">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
