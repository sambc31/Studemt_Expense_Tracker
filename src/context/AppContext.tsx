import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  Expense,
  Budget,
  SavingGoal,
  ToastNotification,
  AppNotification,
  FilterOptions,
  ActiveTab,
  ExpenseCategory,
} from '../types';
import { storageService } from '../services/storageService';
import { getSampleExpenses, getSampleSavingGoal } from '../services/sampleData';
import { calculateMonthlyExpenses, calculateBudgetRemaining, calculateBudgetPercentage } from '../services/calculationService';

interface AppContextType {
  profile: UserProfile | null;
  expenses: Expense[];
  budget: Budget;
  savingGoal: SavingGoal | null;
  activeTab: ActiveTab;
  toasts: ToastNotification[];
  notifications: AppNotification[];
  filters: FilterOptions;
  isAddExpenseModalOpen: boolean;
  editingExpense: Expense | null;
  isSavingGoalModalOpen: boolean;

  // Setters & Actions
  setActiveTab: (tab: ActiveTab) => void;
  saveProfile: (profile: UserProfile) => void;
  addExpense: (expense: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateExpense: (id: string, expense: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>) => void;
  deleteExpense: (id: string) => void;
  updateBudget: (limit: number) => void;
  saveSavingGoal: (goal: SavingGoal | null) => void;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
  resetFilters: () => void;

  // Modal Control
  openAddExpenseModal: (expenseToEdit?: Expense) => void;
  closeAddExpenseModal: () => void;
  openSavingGoalModal: () => void;
  closeSavingGoalModal: () => void;

  // Toast & Notifications
  addToast: (message: string, type?: ToastNotification['type'], title?: string) => void;
  removeToast: (id: string) => void;
  markNotificationRead: (id: string) => void;

  // System
  loadDemoData: () => void;
  resetAllData: () => void;
  importDataPayload: (payload: { profile?: UserProfile | null; budget?: Budget; expenses: Expense[]; savingGoal?: SavingGoal | null }) => void;
  filterByCategoryNav: (category: ExpenseCategory) => void;
}

const defaultFilters: FilterOptions = {
  searchQuery: '',
  category: 'All',
  paymentMethod: 'All',
  dateRange: 'all',
  sortBy: 'newest',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile | null>(() => storageService.getProfile());
  const [expenses, setExpenses] = useState<Expense[]>(() => storageService.getExpenses());
  const [budget, setBudget] = useState<Budget>(() => storageService.getBudget());
  const [savingGoal, setSavingGoal] = useState<SavingGoal | null>(() => storageService.getSavingGoal());
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [filters, setFilters] = useState<FilterOptions>(defaultFilters);

  // Modals state
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const [isSavingGoalModalOpen, setIsSavingGoalModalOpen] = useState(false);

  // Toast Dispatcher
  const addToast = (message: string, type: ToastNotification['type'] = 'success', title?: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev.slice(-3), { id, type, message, title }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Check budget warnings automatically on expenses / budget update
  useEffect(() => {
    if (!profile || !profile.isOnboarded) return;

    const monthlySpent = calculateMonthlyExpenses(expenses);
    const pct = calculateBudgetPercentage(budget.monthlyLimit, monthlySpent);
    const remaining = calculateBudgetRemaining(budget.monthlyLimit, monthlySpent);

    if (pct >= 100) {
      const existingWarning = notifications.find((n) => n.type === 'budget_exceeded');
      if (!existingWarning) {
        setNotifications((prev) => [
          {
            id: `notif-${Date.now()}`,
            title: 'Budget Exceeded',
            message: `You have exceeded your monthly budget by ₹${Math.abs(remaining).toLocaleString('en-IN')}`,
            type: 'budget_exceeded',
            date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            read: false,
          },
          ...prev,
        ]);
      }
    } else if (pct >= 75) {
      const existingWarning = notifications.find((n) => n.type === 'budget_warning');
      if (!existingWarning) {
        setNotifications((prev) => [
          {
            id: `notif-${Date.now()}`,
            title: 'Budget Warning',
            message: `You have used ${pct}% of your monthly budget (₹${remaining.toLocaleString('en-IN')} remaining).`,
            type: 'budget_warning',
            date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            read: false,
          },
          ...prev,
        ]);
      }
    }
  }, [expenses, budget.monthlyLimit, profile]);

  // Profile Save
  const saveProfile = (newProfile: UserProfile) => {
    setProfile(newProfile);
    storageService.saveProfile(newProfile);
    addToast('Profile saved successfully.', 'success');
  };

  // Add Expense
  const addExpense = (expenseData: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newExpense: Expense = {
      ...expenseData,
      id: `exp-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = [newExpense, ...expenses];
    setExpenses(updated);
    storageService.saveExpenses(updated);
    addToast('Expense added successfully.', 'success');
  };

  // Update Expense
  const updateExpense = (id: string, expenseData: Omit<Expense, 'id' | 'createdAt' | 'updatedAt'>) => {
    const updated = expenses.map((e) =>
      e.id === id ? { ...e, ...expenseData, updatedAt: new Date().toISOString() } : e
    );
    setExpenses(updated);
    storageService.saveExpenses(updated);
    addToast('Expense updated successfully.', 'success');
  };

  // Delete Expense
  const deleteExpense = (id: string) => {
    const updated = expenses.filter((e) => e.id !== id);
    setExpenses(updated);
    storageService.saveExpenses(updated);
    addToast('Expense deleted successfully.', 'success');
  };

  // Budget Update
  const updateBudget = (limit: number) => {
    const newBudget: Budget = {
      monthlyLimit: limit,
      updatedAt: new Date().toISOString(),
    };
    setBudget(newBudget);
    storageService.saveBudget(newBudget);
    addToast('Monthly budget updated.', 'success');
  };

  // Saving Goal Save
  const saveSavingGoal = (goal: SavingGoal | null) => {
    setSavingGoal(goal);
    storageService.saveSavingGoal(goal);
    addToast(goal ? 'Saving goal updated.' : 'Saving goal cleared.', 'info');
  };

  // Filter Reset
  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  // Modal Control
  const openAddExpenseModal = (expenseToEdit?: Expense) => {
    if (expenseToEdit) {
      setEditingExpense(expenseToEdit);
    } else {
      setEditingExpense(null);
    }
    setIsAddExpenseModalOpen(true);
  };

  const closeAddExpenseModal = () => {
    setIsAddExpenseModalOpen(false);
    setEditingExpense(null);
  };

  const openSavingGoalModal = () => {
    setIsSavingGoalModalOpen(true);
  };

  const closeSavingGoalModal = () => {
    setIsSavingGoalModalOpen(false);
  };

  // Notification action
  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  // Load Demo Data for presentations
  const loadDemoData = () => {
    const demoExpenses = getSampleExpenses();
    const demoGoal = getSampleSavingGoal();
    setExpenses(demoExpenses);
    storageService.saveExpenses(demoExpenses);
    setSavingGoal(demoGoal);
    storageService.saveSavingGoal(demoGoal);
    addToast('Sample student demo data loaded.', 'success');
  };

  // Reset Application Data
  const resetAllData = () => {
    storageService.clearAll();
    setProfile(null);
    setExpenses([]);
    setBudget({ monthlyLimit: 15000, updatedAt: new Date().toISOString() });
    setSavingGoal(null);
    setNotifications([]);
    setFilters(defaultFilters);
    setActiveTab('dashboard');
    addToast('Application data reset successfully.', 'info');
  };

  // Import JSON Data Payload
  const importDataPayload = (payload: {
    profile?: UserProfile | null;
    budget?: Budget;
    expenses: Expense[];
    savingGoal?: SavingGoal | null;
  }) => {
    if (payload.profile) {
      setProfile(payload.profile);
      storageService.saveProfile(payload.profile);
    }
    if (payload.budget) {
      setBudget(payload.budget);
      storageService.saveBudget(payload.budget);
    }
    if (payload.expenses) {
      setExpenses(payload.expenses);
      storageService.saveExpenses(payload.expenses);
    }
    if (payload.savingGoal !== undefined) {
      setSavingGoal(payload.savingGoal);
      storageService.saveSavingGoal(payload.savingGoal);
    }
    addToast('Data imported successfully!', 'success');
  };

  // Navigate to Expenses filtered by a category
  const filterByCategoryNav = (category: ExpenseCategory) => {
    setFilters((prev) => ({ ...prev, category, searchQuery: '' }));
    setActiveTab('expenses');
  };

  return (
    <AppContext.Provider
      value={{
        profile,
        expenses,
        budget,
        savingGoal,
        activeTab,
        toasts,
        notifications,
        filters,
        isAddExpenseModalOpen,
        editingExpense,
        isSavingGoalModalOpen,
        setActiveTab,
        saveProfile,
        addExpense,
        updateExpense,
        deleteExpense,
        updateBudget,
        saveSavingGoal,
        setFilters,
        resetFilters,
        openAddExpenseModal,
        closeAddExpenseModal,
        openSavingGoalModal,
        closeSavingGoalModal,
        addToast,
        removeToast,
        markNotificationRead,
        loadDemoData,
        resetAllData,
        importDataPayload,
        filterByCategoryNav,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
