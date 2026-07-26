import React, { useState } from 'react';
import { Activity, ShieldCheck } from 'lucide-react';

export const BodyFatCalculator: React.FC = () => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [heightCm, setHeightCm] = useState<number>(175);
  const [waistCm, setWaistCm] = useState<number>(85);
  const [neckCm, setNeckCm] = useState<number>(38);
  const [hipCm, setHipCm] = useState<number>(95);

  // US Navy Formula
  let bodyFat = 0;
  if (gender === 'male') {
    bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(Math.max(1, waistCm - neckCm)) + 0.15456 * Math.log10(heightCm)) - 450;
  } else {
    bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(Math.max(1, waistCm + hipCm - neckCm)) + 0.22100 * Math.log10(heightCm)) - 450;
  }

  bodyFat = Math.min(Math.max(3, Math.round(bodyFat * 10) / 10), 60);

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 dark:border-slate-800 space-y-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
        <Activity className="w-6 h-6 text-indigo-500" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Body Fat Calculator (US Navy Method)</h2>
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

        <div>
          <label className="text-xs font-bold uppercase text-slate-500">Waist Circumference (cm)</label>
          <input
            type="number"
            value={waistCm}
            onChange={(e) => setWaistCm(parseFloat(e.target.value) || 0)}
            className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold"
          />
        </div>

        <div>
          <label className="text-xs font-bold uppercase text-slate-500">Neck Circumference (cm)</label>
          <input
            type="number"
            value={neckCm}
            onChange={(e) => setNeckCm(parseFloat(e.target.value) || 0)}
            className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold"
          />
        </div>

        {gender === 'female' && (
          <div className="sm:col-span-2">
            <label className="text-xs font-bold uppercase text-slate-500">Hip Circumference (cm)</label>
            <input
              type="number"
              value={hipCm}
              onChange={(e) => setHipCm(parseFloat(e.target.value) || 0)}
              className="w-full mt-1 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold"
            />
          </div>
        )}
      </div>

      <div className="p-5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-center">
        <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Estimated Body Fat</div>
        <div className="text-4xl font-black text-indigo-700 dark:text-indigo-300 mt-1">{bodyFat}%</div>
        <p className="text-xs text-slate-500 mt-2">Calculated using the US Navy Circumference Method.</p>
      </div>
    </div>
  );
};
