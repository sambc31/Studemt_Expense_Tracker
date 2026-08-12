import { UserProfile, Expense, Budget, SavingGoal } from '../types';

const STORAGE_KEYS = {
  PROFILE: 'spendwise_profile',
  EXPENSES: 'spendwise_expenses',
  BUDGET: 'spendwise_budget',
  SAVING_GOAL: 'spendwise_saving_goal',
  THEME: 'spendwise_theme',
  NOTIFICATIONS: 'spendwise_notifications',
};

export const storageService = {
  // Profile Storage
  getProfile: (): UserProfile | null => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Failed to parse user profile from LocalStorage', e);
      return null;
    }
  },

  saveProfile: (profile: UserProfile): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
    } catch (e) {
      console.error('Failed to save profile to LocalStorage', e);
    }
  },

  // Expenses Storage
  getExpenses: (): Expense[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.EXPENSES);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error('Failed to parse expenses from LocalStorage', e);
      return [];
    }
  },

  saveExpenses: (expenses: Expense[]): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
    } catch (e) {
      console.error('Failed to save expenses to LocalStorage', e);
    }
  },

  // Budget Storage
  getBudget: (): Budget => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.BUDGET);
      return data
        ? JSON.parse(data)
        : { monthlyLimit: 15000, updatedAt: new Date().toISOString() };
    } catch (e) {
      return { monthlyLimit: 15000, updatedAt: new Date().toISOString() };
    }
  },

  saveBudget: (budget: Budget): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.BUDGET, JSON.stringify(budget));
    } catch (e) {
      console.error('Failed to save budget to LocalStorage', e);
    }
  },

  // Saving Goal Storage
  getSavingGoal: (): SavingGoal | null => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SAVING_GOAL);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  saveSavingGoal: (goal: SavingGoal | null): void => {
    try {
      if (goal) {
        localStorage.setItem(STORAGE_KEYS.SAVING_GOAL, JSON.stringify(goal));
      } else {
        localStorage.removeItem(STORAGE_KEYS.SAVING_GOAL);
      }
    } catch (e) {
      console.error('Failed to save saving goal to LocalStorage', e);
    }
  },

  // Theme Storage
  getTheme: (): 'light' | 'dark' => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.THEME);
      if (data === 'light' || data === 'dark') return data;
      // System preference fallback
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    } catch {
      return 'light';
    }
  },

  saveTheme: (theme: 'light' | 'dark'): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
    } catch (e) {
      console.error('Failed to save theme preference', e);
    }
  },

  // Complete Application Factory Reset
  clearAll: (): void => {
    try {
      Object.values(STORAGE_KEYS).forEach((key) => {
        localStorage.removeItem(key);
      });
    } catch (e) {
      console.error('Failed to clear application storage', e);
    }
  },
};
