import React, { useState } from 'react';
import { HeartPulse } from 'lucide-react';

export const BmrCalculator: React.FC = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState<number>(30);
  const [heightCm, setHeightCm] = useState<number>(175);
  const [weightKg, setWeightKg] = useState<number>(75);

  // Mifflin-St Jeor
  const mifflin = Math.round(
    gender === 'male'
      ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
      : 10 * weightKg + 6.25 * heightCm - 5 * age - 161
  );

  // Revised Harris-Benedict
  const harris = Math.round(
    gender === 'male'
      ? 88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * age
      : 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.330 * age
  );

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-800 space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
        <HeartPulse className="w-6 h-6 text-rose-500" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">BMR Calculator (Basal Metabolic Rate)</h2>
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
          <label className="text-xs font-bold uppercase text-slate-500">Age ({age} yrs)</label>
          <input
            type="range"
            min="18"
            max="95"
            value={age}
            onChange={(e) => setAge(parseInt(e.target.value))}
            className="w-full mt-2 accent-indigo-600"
          />
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

        <div>
          <label className="text-xs font-bold uppercase text-slate-500">Weight (kg)</label>
          <input
            type="number"
            value={weightKg}
            onChange={(e) => setWeightKg(parseFloat(e.target.value) || 0)}
            className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="p-5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-center">
          <div className="text-xs font-bold text-indigo-600 uppercase">Mifflin-St Jeor (Standard)</div>
          <div className="text-3xl font-black text-indigo-700 dark:text-indigo-300 mt-1">{mifflin} <span className="text-xs font-normal">kcal/day</span></div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
          <div className="text-xs font-bold text-slate-500 uppercase">Revised Harris-Benedict</div>
          <div className="text-3xl font-black text-slate-800 dark:text-white mt-1">{harris} <span className="text-xs font-normal">kcal/day</span></div>
        </div>
      </div>
    </div>
  );
};
