import React from 'react';
import { useApp } from '../../context/AppContext';
import { FilterBar } from './FilterBar';
import { ExpenseTable } from './ExpenseTable';
import { filterAndSortExpenses } from '../../services/calculationService';
import { Button } from '../common/Button';
import { PlusCircle, Receipt } from 'lucide-react';

export const ExpensesView: React.FC = () => {
  const { expenses, filters, openAddExpenseModal } = useApp();

  const filteredExpenses = filterAndSortExpenses(expenses, filters);

  return (
    <div className="space-y-6">
      {/* Top Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
        <div>
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Receipt className="w-5 h-5 text-brand-600 dark:text-brand-400" />
            <span>Manage Expenses</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            View, search, filter, edit, or remove your recorded student transactions.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          onClick={() => openAddExpenseModal()}
          icon={<PlusCircle className="w-4 h-4" />}
        >
          Add Expense
        </Button>
      </div>

      {/* Filter and Search Control Bar */}
      <FilterBar totalResultsCount={filteredExpenses.length} />

      {/* Table / Card List View */}
      <ExpenseTable expenses={filteredExpenses} />
    </div>
  );
};
