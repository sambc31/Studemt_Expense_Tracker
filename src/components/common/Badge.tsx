import React from 'react';
import { ExpenseCategory, PaymentMethod } from '../../types';
import { Utensils, Bus, GraduationCap, ShoppingBag, Film, Receipt, HeartPulse, Package, CreditCard, Smartphone, Banknote, Landmark } from 'lucide-react';

export const categoryIcons: Record<ExpenseCategory, React.ReactNode> = {
  Food: <Utensils className="w-3.5 h-3.5" />,
  Transport: <Bus className="w-3.5 h-3.5" />,
  Education: <GraduationCap className="w-3.5 h-3.5" />,
  Shopping: <ShoppingBag className="w-3.5 h-3.5" />,
  Entertainment: <Film className="w-3.5 h-3.5" />,
  Bills: <Receipt className="w-3.5 h-3.5" />,
  Health: <HeartPulse className="w-3.5 h-3.5" />,
  Other: <Package className="w-3.5 h-3.5" />,
};

export const categoryColors: Record<ExpenseCategory, string> = {
  Food: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200 dark:border-amber-900/40',
  Transport: 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-900/40',
  Education: 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-900/40',
  Shopping: 'bg-pink-100 text-pink-800 dark:bg-pink-950/60 dark:text-pink-300 border-pink-200 dark:border-pink-900/40',
  Entertainment: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200 dark:border-indigo-900/40',
  Bills: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-200 dark:border-rose-900/40',
  Health: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900/40',
  Other: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700',
};

export const paymentMethodIcons: Record<PaymentMethod, React.ReactNode> = {
  Cash: <Banknote className="w-3.5 h-3.5" />,
  UPI: <Smartphone className="w-3.5 h-3.5" />,
  'Debit Card': <CreditCard className="w-3.5 h-3.5" />,
  'Credit Card': <CreditCard className="w-3.5 h-3.5" />,
  'Bank Transfer': <Landmark className="w-3.5 h-3.5" />,
  Other: <Package className="w-3.5 h-3.5" />,
};

interface CategoryBadgeProps {
  category: ExpenseCategory;
  showIcon?: boolean;
}

export const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, showIcon = true }) => {
  const icon = categoryIcons[category] || categoryIcons.Other;
  const colorClass = categoryColors[category] || categoryColors.Other;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg border ${colorClass}`}>
      {showIcon && icon}
      {category}
    </span>
  );
};

interface PaymentBadgeProps {
  method: PaymentMethod;
}

export const PaymentBadge: React.FC<PaymentBadgeProps> = ({ method }) => {
  const icon = paymentMethodIcons[method] || paymentMethodIcons.Other;

  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
      {icon}
      {method}
    </span>
  );
};
