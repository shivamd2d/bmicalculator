import React, { useState, useEffect } from 'react';
import { Trash2, Clock, X, ChevronRight } from 'lucide-react';
import { getHistory, deleteHistoryEntry, clearHistory } from '../../utils/storage';
import type { HistoryEntry } from '../../types/bmi';
import { BMI_CATEGORIES } from '../../constants/bmi';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEntry?: (entry: HistoryEntry) => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({ isOpen, onClose, onSelectEntry }) => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    if (isOpen) {
      setHistory(getHistory());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = deleteHistoryEntry(id);
    setHistory(updated);
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all history?')) {
      const updated = clearHistory();
      setHistory(updated);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/60 backdrop-blur-sm transition-opacity">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col border-l border-slate-200 dark:border-slate-800 animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Clock className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Calculation History</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {history.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center text-slate-400 dark:text-slate-500">
              <Clock className="w-12 h-12 stroke-[1.5] mb-2 opacity-50" />
              <p className="font-medium text-sm">No saved calculations yet</p>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">Calculations you save will appear here for easy tracking.</p>
            </div>
          ) : (
            history.map((entry) => {
              const catDetails = BMI_CATEGORIES[entry.categoryType] || BMI_CATEGORIES.normal;
              return (
                <div
                  key={entry.id}
                  onClick={() => onSelectEntry && onSelectEntry(entry)}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="text-center min-w-[54px] p-2 rounded-lg bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-700">
                      <div className="text-lg font-black tracking-tight" style={{ color: catDetails.color }}>
                        {entry.bmi.toFixed(1)}
                      </div>
                      <div className="text-[10px] font-semibold uppercase text-slate-400">BMI</div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${catDetails.color}20`, color: catDetails.color }}>
                          {entry.categoryLabel}
                        </span>
                        <span className="text-xs text-slate-400">{entry.dateStr}</span>
                      </div>
                      <div className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                        {entry.unitSystem === 'metric' ? (
                          <>{entry.heightCm} cm • {entry.weightKg} kg</>
                        ) : (
                          <>{Math.floor(entry.heightCm * 0.393701 / 12)}' {Math.round((entry.heightCm * 0.393701) % 12)}" • {Math.round(entry.weightKg * 2.20462)} lbs</>
                        )}
                        <span className="ml-1 text-slate-400">({entry.gender}, {entry.age}y)</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleDelete(entry.id, e)}
                    className="p-2 rounded-lg text-slate-400 hover:text-red-600 dark:hover:text-red-400 opacity-0 group-hover:opacity-100 transition"
                    title="Delete item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {history.length > 0 && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-900/80">
            <span className="text-xs text-slate-500">{history.length} saved entries</span>
            <button
              onClick={handleClearAll}
              className="text-xs font-semibold text-red-600 hover:text-red-700 dark:text-red-400 flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear All
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
