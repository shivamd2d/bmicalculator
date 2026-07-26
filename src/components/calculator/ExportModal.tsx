import React, { useState } from 'react';
import { Download, Printer, Copy, Share2, Check, X, ShieldCheck } from 'lucide-react';
import type { BmiResult } from '../../types/bmi';
import { exportElementAsPng, printBmiReport, generateShareUrl, copyToClipboard } from '../../utils/export';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: BmiResult;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, result }) => {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  if (!isOpen) return null;

  const shareUrl = generateShareUrl({
    bmi: result.bmi,
    heightCm: result.heightCm,
    weightKg: result.weightKg
  });

  const handleCopyLink = async () => {
    const success = await copyToClipboard(shareUrl);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleDownloadPng = async () => {
    setDownloading(true);
    await exportElementAsPng('bmi-share-card', `BMI-Result-${result.bmi}.png`);
    setDownloading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-bold text-slate-900 dark:text-white">Share & Export Result</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5">
          
          {/* Exportable Card Preview */}
          <div
            id="bmi-share-card"
            className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-xl relative overflow-hidden"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-400" />
                <span className="font-bold text-sm tracking-wide text-indigo-200">BMI CALCULATOR</span>
              </div>
              <span className="text-xs text-white/60">{new Date().toLocaleDateString()}</span>
            </div>

            <div className="flex items-center justify-between my-4">
              <div>
                <div className="text-xs uppercase tracking-widest text-indigo-300 font-semibold mb-1">Your Score</div>
                <div className="text-5xl font-black tracking-tight" style={{ color: result.category.color }}>
                  {result.bmi.toFixed(1)}
                </div>
                <div className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: `${result.category.color}30`, color: result.category.color }}>
                  {result.category.label}
                </div>
              </div>

              <div className="text-right space-y-1.5 text-xs text-slate-300">
                <p><span className="text-slate-400">Height:</span> {result.heightCm} cm</p>
                <p><span className="text-slate-400">Weight:</span> {result.weightKg} kg</p>
                <p><span className="text-slate-400">Ponderal:</span> {result.ponderalIndex}</p>
                <p><span className="text-slate-400">Healthy Range:</span> {result.healthyWeightMinKg} - {result.healthyWeightMaxKg} kg</p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 text-[11px] text-slate-400 flex justify-between items-center">
              <span>Calculated on bmicalculator.app</span>
              <span>WHO Standards</span>
            </div>
          </div>

          {/* Action Grid */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleDownloadPng}
              disabled={downloading}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition shadow-md shadow-indigo-500/20 disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              {downloading ? 'Exporting...' : 'Save as PNG'}
            </button>

            <button
              onClick={() => printBmiReport('bmi-share-card')}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold text-sm transition"
            >
              <Printer className="w-4 h-4" />
              Print Report
            </button>
          </div>

          {/* Share Link Copy Input */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-400">Shareable URL</label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 focus:outline-none"
              />
              <button
                onClick={handleCopyLink}
                className="px-4 py-2 rounded-xl bg-slate-900 dark:bg-indigo-600 hover:bg-slate-800 dark:hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
