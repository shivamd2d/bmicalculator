import type { HistoryEntry } from '../types/bmi';

const HISTORY_STORAGE_KEY = 'bmi_calculator_history_v1';
const MAX_HISTORY_ITEMS = 20;

export function getHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(HISTORY_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Failed to load BMI history from localStorage:', err);
    return [];
  }
}

export function saveHistoryEntry(entry: Omit<HistoryEntry, 'id' | 'timestamp' | 'dateStr'>): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const current = getHistory();
    const now = new Date();
    const newEntry: HistoryEntry = {
      ...entry,
      id: `bmi_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      timestamp: Date.now(),
      dateStr: now.toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    const updated = [newEntry, ...current].slice(0, MAX_HISTORY_ITEMS);
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to save BMI history to localStorage:', err);
    return [];
  }
}

export function deleteHistoryEntry(id: string): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const current = getHistory();
    const updated = current.filter(item => item.id !== id);
    localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (err) {
    console.error('Failed to delete BMI history item:', err);
    return [];
  }
}

export function clearHistory(): HistoryEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    localStorage.removeItem(HISTORY_STORAGE_KEY);
    return [];
  } catch (err) {
    console.error('Failed to clear BMI history:', err);
    return [];
  }
}
