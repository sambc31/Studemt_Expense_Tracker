import React from 'react';
import { Button } from './Button';
import { FolderOpen, SearchX, FilterX, PieChart, Wallet } from 'lucide-react';

interface EmptyStateProps {
  type?: 'no_expenses' | 'no_search' | 'no_filter' | 'no_analytics' | 'no_budget';
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  type = 'no_expenses',
  title,
  description,
  actionLabel,
  onAction,
  icon,
}) => {
  const presets = {
    no_expenses: {
      title: title || 'No expenses recorded yet',
      description:
        description || 'Start tracking your student spending by adding your first expense.',
      actionLabel: actionLabel || '➕ Add Your First Expense',
      icon: icon || <FolderOpen className="w-10 h-10 text-brand-500" />,
    },
    no_search: {
      title: title || 'No matching expenses found',
      description:
        description || 'We couldn\'t find any transactions matching your search query.',
      actionLabel: actionLabel || 'Clear Search',
      icon: icon || <SearchX className="w-10 h-10 text-amber-500" />,
    },
    no_filter: {
      title: title || 'No expenses match the selected filters',
      description: description || 'Try adjusting or clearing your active category or date filters.',
      actionLabel: actionLabel || 'Reset Filters',
      icon: icon || <FilterX className="w-10 h-10 text-indigo-500" />,
    },
    no_analytics: {
      title: title || 'Insufficient data for analytics',
      description: description || 'Add a few expenses across different categories to unlock spending charts and trends.',
      actionLabel: actionLabel || 'Add Sample Expenses',
      icon: icon || <PieChart className="w-10 h-10 text-emerald-500" />,
    },
    no_budget: {
      title: title || 'No monthly budget configured',
      description: description || 'Set a monthly spending budget to track usage and receive warning alerts.',
      actionLabel: actionLabel || 'Set Monthly Budget',
      icon: icon || <Wallet className="w-10 h-10 text-blue-500" />,
    },
  };

  const current = presets[type] || presets.no_expenses;

  return (
    <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 bg-white/60 dark:bg-slate-900/60 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 my-4 animate-fadeIn">
      <div className="p-4 bg-slate-100 dark:bg-slate-800/80 rounded-2xl mb-4">
        {current.icon}
      </div>
      <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">
        {current.title}
      </h3>
      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-6 leading-relaxed">
        {current.description}
      </p>
      {onAction && current.actionLabel && (
        <Button onClick={onAction} variant="primary" size="md">
          {current.actionLabel}
        </Button>
      )}
    </div>
  );
};
