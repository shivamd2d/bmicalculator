import React, { useState } from 'react';
import { Flame, Calculator, Sparkles } from 'lucide-react';

export const CalorieCalculator: React.FC = () => {
  const [gender, setGender] = useState<'male' | 'female'>('female');
  const [age, setAge] = useState<number>(30);
  const [heightCm, setHeightCm] = useState<number>(170);
  const [weightKg, setWeightKg] = useState<number>(68);
  const [activity, setActivity] = useState<number>(1.375); // Lightly active

  // Mifflin-St Jeor Formula for BMR
  const bmr = gender === 'male'
    ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
    : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;

  const tdee = Math.round(bmr * activity);

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-800 space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
        <Flame className="w-6 h-6 text-orange-500" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Calorie Calculator (TDEE)</h2>
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
            max="90"
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

        <div className="sm:col-span-2">
          <label className="text-xs font-bold uppercase text-slate-500">Activity Level</label>
          <select
            value={activity}
            onChange={(e) => setActivity(parseFloat(e.target.value))}
            className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-xs"
          >
            <option value={1.2}>Sedentary (Little or no exercise)</option>
            <option value={1.375}>Light (Exercise 1-3 times/week)</option>
            <option value={1.55}>Moderate (Exercise 4-5 times/week)</option>
            <option value={1.725}>Active (Daily intense exercise)</option>
            <option value={1.9}>Very Active (Hard physical job)</option>
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-center">
          <div className="text-xs font-bold text-amber-600 uppercase">Weight Loss</div>
          <div className="text-2xl font-black text-amber-700 dark:text-amber-300 mt-1">{Math.max(1200, tdee - 500)} <span className="text-xs font-normal">kcal</span></div>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center">
          <div className="text-xs font-bold text-emerald-600 uppercase">Maintenance</div>
          <div className="text-3xl font-black text-emerald-700 dark:text-emerald-300 mt-1">{tdee} <span className="text-xs font-normal">kcal</span></div>
        </div>

        <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-center">
          <div className="text-xs font-bold text-indigo-600 uppercase">Muscle Gain</div>
          <div className="text-2xl font-black text-indigo-700 dark:text-indigo-300 mt-1">{tdee + 300} <span className="text-xs font-normal">kcal</span></div>
        </div>
      </div>
    </div>
  );
};
