export type ExpenseCategory =
  | 'Food'
  | 'Transport'
  | 'Education'
  | 'Shopping'
  | 'Entertainment'
  | 'Bills'
  | 'Health'
  | 'Other';

export type PaymentMethod =
  | 'Cash'
  | 'UPI'
  | 'Debit Card'
  | 'Credit Card'
  | 'Bank Transfer'
  | 'Other';

export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: ExpenseCategory;
  date: string; // ISO date string YYYY-MM-DD
  paymentMethod: PaymentMethod;
  note?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  name: string;
  email: string;
  theme: 'light' | 'dark';
  isOnboarded: boolean;
  createdAt: string;
}

export interface Budget {
  monthlyLimit: number;
  updatedAt: string;
}

export interface SavingGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string; // ISO date string YYYY-MM-DD
  createdAt: string;
}

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastNotification {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'budget_warning' | 'budget_exceeded' | 'insight' | 'system';
  date: string;
  read: boolean;
}

export interface FilterOptions {
  searchQuery: string;
  category: ExpenseCategory | 'All';
  paymentMethod: PaymentMethod | 'All';
  dateRange: 'all' | '7d' | '30d' | '90d' | 'this_month' | 'last_month';
  minAmount?: number;
  maxAmount?: number;
  sortBy: 'newest' | 'oldest' | 'highest' | 'lowest';
}

export interface AIMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  actions?: {
    label: string;
    action: string;
    payload?: any;
  }[];
}

export type ActiveTab =
  | 'dashboard'
  | 'expenses'
  | 'analytics'
  | 'budget'
  | 'ai-assistant'
  | 'settings';
