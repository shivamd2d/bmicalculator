import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Scale, 
  Ruler, 
  User, 
  Sparkles, 
  BookmarkPlus, 
  Share2, 
  Clock, 
  Info, 
  ChevronDown, 
  Activity,
  CheckCircle2
} from 'lucide-react';
import type { UnitSystem, Gender, IdealWeightFormula, BmiInput, HistoryEntry } from '../../types/bmi';
import { calculateBMIResult } from '../../utils/bmiMath';
import { saveHistoryEntry } from '../../utils/storage';
import { BmiGauge } from './BmiGauge';
import { BmiChart } from './BmiChart';
import { HistoryDrawer } from './HistoryDrawer';
import { ExportModal } from './ExportModal';

export const BmiCalculator: React.FC = () => {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>('metric');
  const [gender, setGender] = useState<Gender>('female');
  const [age, setAge] = useState<number>(30);
  
  // Metric Inputs
  const [heightCm, setHeightCm] = useState<number>(170);
  const [weightKg, setWeightKg] = useState<number>(68);

  // Imperial Inputs
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(7);
  const [weightLbs, setWeightLbs] = useState<number>(150);

  // Formulas & Modals
  const [selectedFormula, setSelectedFormula] = useState<IdealWeightFormula>('bmi22');
  const [historyOpen, setHistoryOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'gauge' | 'chart'>('gauge');

  // Parse URL query parameters if present
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const search = new URLSearchParams(window.location.search);
      const bmiParam = search.get('bmi');
      const hParam = search.get('h');
      const wParam = search.get('w');
      const uParam = search.get('u');

      if (uParam === 'imperial') setUnitSystem('imperial');
      if (hParam) {
        const h = parseFloat(hParam);
        if (!isNaN(h)) setHeightCm(h);
      }
      if (wParam) {
        const w = parseFloat(wParam);
        if (!isNaN(w)) setWeightKg(w);
      }
    }
  }, []);

  // Compute BMI Result instantly
  const result = useMemo(() => {
    const input: BmiInput = {
      unitSystem,
      gender,
      age,
      heightCm,
      weightKg,
      heightFeet,
      heightInches,
      weightLbs
    };
    return calculateBMIResult(input, selectedFormula);
  }, [unitSystem, gender, age, heightCm, weightKg, heightFeet, heightInches, weightLbs, selectedFormula]);

  const handleSaveToHistory = () => {
    saveHistoryEntry({
      unitSystem,
      gender,
      age,
      heightCm: result.heightCm,
      weightKg: result.weightKg,
      bmi: result.bmi,
      categoryLabel: result.category.label,
      categoryType: result.category.type
    });
    showToast('Calculation saved to history!');
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSelectHistoryEntry = (entry: HistoryEntry) => {
    setGender(entry.gender);
    setAge(entry.age);
    if (entry.unitSystem === 'metric') {
      setUnitSystem('metric');
      setHeightCm(entry.heightCm);
      setWeightKg(entry.weightKg);
    } else {
      setUnitSystem('imperial');
      const totalInches = Math.round(entry.heightCm * 0.393701);
      setHeightFeet(Math.floor(totalInches / 12));
      setHeightInches(totalInches % 12);
      setWeightLbs(Math.round(entry.weightKg * 2.20462));
    }
    setHistoryOpen(false);
    showToast('Loaded entry from history');
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-2xl flex items-center gap-2 border border-slate-700"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Glass Calculator Container */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200/80 dark:border-slate-800/80 grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: Controls & Input Form (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Header Controls: Unit System Toggle & History */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            {/* Metric / Imperial Segmented Selector */}
            <div className="inline-flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60">
              <button
                type="button"
                onClick={() => setUnitSystem('metric')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  unitSystem === 'metric'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Metric (cm/kg)
              </button>
              <button
                type="button"
                onClick={() => setUnitSystem('imperial')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  unitSystem === 'imperial'
                    ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Imperial (ft/lbs)
              </button>
            </div>

            <button
              onClick={() => setHistoryOpen(true)}
              className="p-2 rounded-xl text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              title="View saved history"
            >
              <Clock className="w-5 h-5" />
            </button>
          </div>

          {/* Gender Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Gender</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setGender('female')}
                className={`py-3 px-4 rounded-2xl font-semibold text-xs flex items-center justify-center gap-2 border transition ${
                  gender === 'female'
                    ? 'border-pink-500 bg-pink-50 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <span>Female</span>
              </button>
              <button
                type="button"
                onClick={() => setGender('male')}
                className={`py-3 px-4 rounded-2xl font-semibold text-xs flex items-center justify-center gap-2 border transition ${
                  gender === 'male'
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 shadow-sm'
                    : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <span>Male</span>
              </button>
            </div>
          </div>

          {/* Age Slider Input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Age</label>
              <span className="font-extrabold text-slate-900 dark:text-white">{age} years</span>
            </div>
            <input
              type="range"
              min="18"
              max="100"
              value={age}
              onChange={(e) => setAge(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
            />
          </div>

          {/* Height Input Section */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-between">
              <span>Height</span>
              <Ruler className="w-3.5 h-3.5 text-indigo-500" />
            </label>

            {unitSystem === 'metric' ? (
              <div className="relative">
                <input
                  type="number"
                  min="50"
                  max="250"
                  value={heightCm}
                  onChange={(e) => setHeightCm(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none pr-12"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">cm</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="8"
                    value={heightFeet}
                    onChange={(e) => setHeightFeet(parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none pr-12"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">ft</span>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    max="11"
                    value={heightInches}
                    onChange={(e) => setHeightInches(parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none pr-12"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">in</span>
                </div>
              </div>
            )}
          </div>

          {/* Weight Input Section */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-between">
              <span>Weight</span>
              <Scale className="w-3.5 h-3.5 text-indigo-500" />
            </label>

            {unitSystem === 'metric' ? (
              <div className="relative">
                <input
                  type="number"
                  min="20"
                  max="300"
                  value={weightKg}
                  onChange={(e) => setWeightKg(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none pr-12"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">kg</span>
              </div>
            ) : (
              <div className="relative">
                <input
                  type="number"
                  min="40"
                  max="660"
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold text-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none pr-12"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">lbs</span>
              </div>
            )}
          </div>

          {/* Quick Actions (Save & Export) */}
          <div className="pt-2 flex gap-3">
            <button
              onClick={handleSaveToHistory}
              className="flex-1 py-3 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-lg shadow-indigo-500/25 transition flex items-center justify-center gap-2"
            >
              <BookmarkPlus className="w-4 h-4" /> Save Result
            </button>
            <button
              onClick={() => setExportOpen(true)}
              className="py-3 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4" /> Export
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: Results, Gauge, Insights & Breakdown (7 cols) */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6 pl-0 lg:pl-4 border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800 pt-6 lg:pt-0">
          
          {/* Tab Switcher: Gauge view vs Distribution Chart view */}
          <div className="flex items-center justify-between">
            <div className="inline-flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-800">
              <button
                onClick={() => setActiveTab('gauge')}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                  activeTab === 'gauge' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500'
                }`}
              >
                BMI Gauge
              </button>
              <button
                onClick={() => setActiveTab('chart')}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition ${
                  activeTab === 'chart' ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-500'
                }`}
              >
                Distribution Chart
              </button>
            </div>

            <span className="text-xs text-slate-400 font-medium hidden sm:inline">WHO Standard Criteria</span>
          </div>

          {/* Interactive Visual Display */}
          <div className="bg-slate-50/70 dark:bg-slate-900/60 rounded-3xl p-4 border border-slate-200/60 dark:border-slate-800/60 flex flex-col items-center justify-center min-h-[260px]">
            {activeTab === 'gauge' ? (
              <BmiGauge bmi={result.bmi} category={result.category} />
            ) : (
              <BmiChart userBmi={result.bmi} />
            )}
          </div>

          {/* Multi-Metric Metric Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            
            {/* Healthy Weight Range Card */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Healthy Range</div>
              <div className="text-base font-extrabold text-slate-900 dark:text-white mt-1">
                {unitSystem === 'metric' ? (
                  <>{result.healthyWeightMinKg} – {result.healthyWeightMaxKg} <span className="text-xs font-normal text-slate-400">kg</span></>
                ) : (
                  <>{result.healthyWeightMinLbs} – {result.healthyWeightMaxLbs} <span className="text-xs font-normal text-slate-400">lbs</span></>
                )}
              </div>
            </div>

            {/* Ideal Weight Card */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Ideal Weight</span>
              </div>
              <div className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">
                {unitSystem === 'metric' ? (
                  <>{result.idealWeightKg} <span className="text-xs font-normal text-slate-400">kg</span></>
                ) : (
                  <>{result.idealWeightLbs} <span className="text-xs font-normal text-slate-400">lbs</span></>
                )}
              </div>
            </div>

            {/* Ponderal Index Card */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm col-span-2 sm:col-span-1">
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Ponderal Index</div>
              <div className="text-base font-extrabold text-indigo-600 dark:text-indigo-400 mt-1">
                {result.ponderalIndex} <span className="text-xs font-normal text-slate-400">kg/m³</span>
              </div>
            </div>

          </div>

          {/* Formula Switcher Bar for Ideal Weight */}
          <div className="p-3 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="text-slate-500 font-semibold">Ideal Weight Formula:</span>
            <select
              value={selectedFormula}
              onChange={(e) => setSelectedFormula(e.target.value as IdealWeightFormula)}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white rounded-xl px-2.5 py-1 font-semibold focus:outline-none"
            >
              <option value="bmi22">BMI 22 (Median standard)</option>
              <option value="devine">Devine (1974 clinical)</option>
              <option value="robinson">Robinson (1983 model)</option>
              <option value="miller">Miller (1983 model)</option>
            </select>
          </div>

          {/* Actionable Insights Box */}
          <div className={`p-4 rounded-2xl ${result.category.bgColor} border ${result.category.borderColor} space-y-2`}>
            <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wide" style={{ color: result.category.color }}>
              <Sparkles className="w-4 h-4" /> Personalized Insight
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
              {result.insights.map((insight, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="mt-0.5 font-bold">•</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

      {/* History Drawer Modal */}
      <HistoryDrawer
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        onSelectEntry={handleSelectHistoryEntry}
      />

      {/* Share / Export Modal */}
      <ExportModal
        isOpen={exportOpen}
        onClose={() => setExportOpen(false)}
        result={result}
      />

    </div>
  );
};
