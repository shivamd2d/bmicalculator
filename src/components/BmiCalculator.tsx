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
  Activity,
  CheckCircle2,
  Sliders,
  TrendingUp,
  Award
} from 'lucide-react';
import type { UnitSystem, Gender, IdealWeightFormula, BmiInput, HistoryEntry } from '../types/bmi';
import { calculateBMIResult } from '../utils/bmiMath';
import { saveHistoryEntry } from '../utils/storage';
import { BmiGauge } from './calculator/BmiGauge';
import { BmiChart } from './calculator/BmiChart';
import { HistoryDrawer } from './calculator/HistoryDrawer';
import { ExportModal } from './calculator/ExportModal';

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

  // Sync inputs dynamically when switching unit systems
  const handleUnitSystemChange = (system: UnitSystem) => {
    if (system === unitSystem) return;
    if (system === 'imperial') {
      // CM -> Feet & Inches, KG -> LBS
      const totalInches = Math.round(heightCm * 0.393701);
      setHeightFeet(Math.floor(totalInches / 12));
      setHeightInches(totalInches % 12);
      setWeightLbs(Math.round(weightKg * 2.20462));
    } else {
      // Feet & Inches -> CM, LBS -> KG
      const totalInches = heightFeet * 12 + heightInches;
      setHeightCm(Math.round(totalInches * 2.54));
      setWeightKg(Math.round(weightLbs * 0.453592));
    }
    setUnitSystem(system);
  };

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
                onClick={() => handleUnitSystemChange('metric')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  unitSystem === 'metric'
                    ? 'bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Metric (cm, kg)
              </button>
              <button
                type="button"
                onClick={() => handleUnitSystemChange('imperial')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  unitSystem === 'imperial'
                    ? 'bg-white dark:bg-indigo-600 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                US Customary (ft, lbs)
              </button>
            </div>

            {/* History Button */}
            <button
              type="button"
              onClick={() => setHistoryOpen(true)}
              className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition relative"
              title="View Calculation History"
            >
              <Clock className="w-4 h-4" />
            </button>
          </div>

          {/* Form Controls */}
          <div className="space-y-5">
            
            {/* Gender Toggle */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-indigo-500" />
                Biological Sex
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setGender('female')}
                  className={`py-2.5 px-4 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    gender === 'female'
                      ? 'bg-pink-50 dark:bg-pink-950/50 border-pink-300 dark:border-pink-700 text-pink-700 dark:text-pink-300 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                  }`}
                >
                  <span>🌸 Female</span>
                </button>

                <button
                  type="button"
                  onClick={() => setGender('male')}
                  className={`py-2.5 px-4 rounded-2xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    gender === 'male'
                      ? 'bg-indigo-50 dark:bg-indigo-950/50 border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                  }`}
                >
                  <span>⚡ Male</span>
                </button>
              </div>
            </div>

            {/* Age Input & Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <label className="font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-indigo-500" />
                  Age
                </label>
                <span className="font-extrabold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-lg">
                  {age} yrs
                </span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="2"
                  max="120"
                  value={age}
                  onChange={(e) => setAge(parseInt(e.target.value) || 25)}
                  className="flex-1 accent-indigo-600 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
                />
                <input
                  type="number"
                  min="2"
                  max="120"
                  value={age}
                  onChange={(e) => setAge(Math.max(2, Math.min(120, parseInt(e.target.value) || 2))) }
                  className="w-16 p-2 text-xs font-bold rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Height Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Ruler className="w-3.5 h-3.5 text-indigo-500" />
                Height
              </label>

              {unitSystem === 'metric' ? (
                <div className="relative">
                  <input
                    type="number"
                    min="50"
                    max="250"
                    step="0.5"
                    value={heightCm}
                    onChange={(e) => setHeightCm(parseFloat(e.target.value) || 0)}
                    className="w-full p-3 pr-12 text-sm font-bold rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
                    placeholder="Height in cm"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-extrabold text-slate-400">
                    cm
                  </span>
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
                      className="w-full p-3 pr-10 text-sm font-bold rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
                      placeholder="Feet"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-extrabold text-slate-400">
                      ft
                    </span>
                  </div>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="11"
                      value={heightInches}
                      onChange={(e) => setHeightInches(parseInt(e.target.value) || 0)}
                      className="w-full p-3 pr-10 text-sm font-bold rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
                      placeholder="Inches"
                    />
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-extrabold text-slate-400">
                      in
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Weight Input */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-indigo-500" />
                Weight
              </label>

              {unitSystem === 'metric' ? (
                <div className="relative">
                  <input
                    type="number"
                    min="10"
                    max="300"
                    step="0.5"
                    value={weightKg}
                    onChange={(e) => setWeightKg(parseFloat(e.target.value) || 0)}
                    className="w-full p-3 pr-12 text-sm font-bold rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
                    placeholder="Weight in kg"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-extrabold text-slate-400">
                    kg
                  </span>
                </div>
              ) : (
                <div className="relative">
                  <input
                    type="number"
                    min="20"
                    max="660"
                    step="0.5"
                    value={weightLbs}
                    onChange={(e) => setWeightLbs(parseFloat(e.target.value) || 0)}
                    className="w-full p-3 pr-12 text-sm font-bold rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
                    placeholder="Weight in lbs"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-extrabold text-slate-400">
                    lbs
                  </span>
                </div>
              )}
            </div>

          </div>

          {/* Quick Actions */}
          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleSaveToHistory}
              className="flex-1 py-2.5 px-3 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center justify-center gap-1.5 transition"
            >
              <BookmarkPlus className="w-4 h-4 text-indigo-500" />
              <span>Save Result</span>
            </button>

            <button
              type="button"
              onClick={() => setExportOpen(true)}
              className="flex-1 py-2.5 px-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition"
            >
              <Share2 className="w-4 h-4" />
              <span>Share & Export</span>
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: Interactive Visual Gauge & Results (7 cols) */}
        <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
          
          {/* Top Result Banner */}
          <div className="p-6 rounded-3xl bg-slate-900 text-white shadow-xl relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none"></div>

            <div className="space-y-1 text-center sm:text-left z-10">
              <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-400 flex items-center gap-1 justify-center sm:justify-start">
                <Sparkles className="w-3.5 h-3.5" />
                Body Mass Index
              </span>
              <div className="flex items-baseline gap-2 justify-center sm:justify-start">
                <span className="text-5xl sm:text-6xl font-black tracking-tight text-white">
                  {result.bmi}
                </span>
                <span className="text-xs text-slate-400 font-bold">kg/m²</span>
              </div>
            </div>

            {/* Dynamic WHO Category Badge */}
            <div className="z-10 text-center sm:text-right space-y-2">
              <div
                className="inline-block px-4 py-2 rounded-2xl text-xs font-black shadow-lg uppercase tracking-wider"
                style={{
                  backgroundColor: result.category.color,
                  color: '#ffffff'
                }}
              >
                {result.category.label}
              </div>
              <p className="text-[11px] text-slate-300 max-w-[200px] leading-tight">
                WHO Adult Standard ({result.category.rangeText})
              </p>
            </div>
          </div>

          {/* Tab Switcher: Gauge vs Chart */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('gauge')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'gauge'
                      ? 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Visual Spectrum Gauge
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('chart')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeTab === 'chart'
                      ? 'bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Health Risk Curve
                </button>
              </div>

              <span className="text-[11px] text-slate-500 font-bold hidden sm:inline">
                WHO Medical Reference
              </span>
            </div>

            {/* Active Visual Component */}
            <div className="pt-2">
              {activeTab === 'gauge' ? (
                <BmiGauge bmi={result.bmi} category={result.category} />
              ) : (
                <BmiChart currentBmi={result.bmi} />
              )}
            </div>
          </div>

          {/* Detailed Metric Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            
            {/* Healthy Weight Range */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Healthy Range
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white">
                {unitSystem === 'metric'
                  ? `${result.healthyWeightMinKg} – ${result.healthyWeightMaxKg} kg`
                  : `${result.healthyWeightMinLbs} – ${result.healthyWeightMaxLbs} lbs`}
              </span>
            </div>

            {/* BMI Prime */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block flex items-center justify-between">
                <span>BMI Prime</span>
                <Info className="w-3 h-3 text-slate-400" title="Ratio of BMI to upper healthy limit (25.0)" />
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-indigo-600 dark:text-indigo-400">
                {result.bmiPrime}
              </span>
            </div>

            {/* Ponderal Index */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block flex items-center justify-between">
                <span>Ponderal Index</span>
                <Info className="w-3 h-3 text-slate-400" title="Height-adjusted volumetric mass index" />
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white">
                {unitSystem === 'metric' ? `${result.ponderalIndex} kg/m³` : `${result.ponderalIndexUs}`}
              </span>
            </div>

            {/* Ideal Body Weight */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Ideal Weight
              </span>
              <span className="text-xs sm:text-sm font-extrabold text-emerald-600 dark:text-emerald-400">
                {unitSystem === 'metric'
                  ? `${result.idealWeightKg} kg`
                  : `${result.idealWeightLbs} lbs`}
              </span>
            </div>

          </div>

          {/* Clinical Insights */}
          <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 space-y-2">
            <h4 className="text-xs font-extrabold text-indigo-900 dark:text-indigo-200 flex items-center gap-1.5">
              <Activity className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              Personalized Clinical Summary
            </h4>
            <ul className="space-y-1 text-xs text-slate-700 dark:text-slate-300">
              {result.insights.map((insight, idx) => (
                <li key={idx} className="leading-relaxed">
                  {insight}
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

      {/* Drawers & Modals */}
      <HistoryDrawer
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        onSelectEntry={handleSelectHistoryEntry}
      />

      <ExportModal
        isOpen={exportOpen}
        onClose={() => setExportOpen(false)}
        result={result}
        unitSystem={unitSystem}
      />

    </div>
  );
};

export default BmiCalculator;
