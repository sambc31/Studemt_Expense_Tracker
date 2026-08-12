import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../common/Card';
import { CategoryBadge, PaymentBadge } from '../common/Badge';
import { DeleteConfirmModal } from '../expenses/DeleteConfirmModal';
import { formatRupee, formatDate } from '../../utils/formatters';
import { Expense } from '../../types';
import { Tooltip } from '../common/Tooltip';
import { Clock, ArrowRight, Edit3, Trash2 } from 'lucide-react';

export const RecentExpenses: React.FC = () => {
  const { expenses, setActiveTab, openAddExpenseModal, deleteExpense } = useApp();
  const [expenseToDelete, setExpenseToDelete] = useState<Expense | null>(null);

  const recentList = [...expenses]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <Card className="h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Clock className="w-5 h-5 text-brand-600 dark:text-brand-400" />
            <span>Recent Expenses</span>
          </h3>
          <button
            onClick={() => setActiveTab('expenses')}
            className="inline-flex items-center gap-1 text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {recentList.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-400">
            No expenses recorded yet.
          </div>
        ) : (
          <div className="space-y-3">
            {recentList.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/80 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <div className="shrink-0">
                    <CategoryBadge category={item.category} showIcon={true} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                      <span>{formatDate(item.date)}</span>
                      <span>•</span>
                      <PaymentBadge method={item.paymentMethod} />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-slate-100">
                    {formatRupee(item.amount)}
                  </span>
                  <div className="flex items-center gap-1">
                    <Tooltip content="Edit expense">
                      <button
                        onClick={() => openAddExpenseModal(item)}
                        className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                        aria-label="Edit expense"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </Tooltip>
                    <Tooltip content="Delete expense">
                      <button
                        onClick={() => setExpenseToDelete(item)}
                        className="p-1 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400"
                        aria-label="Delete expense"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </Tooltip>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <DeleteConfirmModal
        isOpen={!!expenseToDelete}
        onClose={() => setExpenseToDelete(null)}
        onConfirm={() => {
          if (expenseToDelete) {
            deleteExpense(expenseToDelete.id);
            setExpenseToDelete(null);
          }
        }}
        expense={expenseToDelete}
      />
    </Card>
  );
};
