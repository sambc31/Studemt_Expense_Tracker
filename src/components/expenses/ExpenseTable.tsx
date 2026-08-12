import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Expense } from '../../types';
import { CategoryBadge, PaymentBadge } from '../common/Badge';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import { EmptyState } from '../common/EmptyState';
import { Tooltip } from '../common/Tooltip';
import { formatRupee, formatDate } from '../../utils/formatters';
import { Edit3, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';

interface ExpenseTableProps {
  expenses: Expense[];
}

const ITEMS_PER_PAGE = 10;

export const ExpenseTable: React.FC<ExpenseTableProps> = ({ expenses }) => {
  const { openAddExpenseModal, deleteExpense, filters, resetFilters } = useApp();
  const [currentPage, setCurrentPage] = useState(1);
  const [expenseToDelete, setExpenseToDelete] = useState<Expense | null>(null);

  const totalPages = Math.max(1, Math.ceil(expenses.length / ITEMS_PER_PAGE));
  const validPage = Math.min(currentPage, totalPages);

  const startIndex = (validPage - 1) * ITEMS_PER_PAGE;
  const paginatedExpenses = expenses.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  if (expenses.length === 0) {
    if (filters.searchQuery) {
      return <EmptyState type="no_search" onAction={resetFilters} />;
    }
    if (filters.category !== 'All' || filters.paymentMethod !== 'All' || filters.dateRange !== 'all') {
      return <EmptyState type="no_filter" onAction={resetFilters} />;
    }
    return <EmptyState type="no_expenses" onAction={() => openAddExpenseModal()} />;
  }

  return (
    <div className="space-y-4">
      {/* Desktop Table View */}
      <div className="hidden md:block bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <th className="py-3.5 px-4">Expense Title</th>
              <th className="py-3.5 px-4">Category</th>
              <th className="py-3.5 px-4">Date</th>
              <th className="py-3.5 px-4">Payment Method</th>
              <th className="py-3.5 px-4 text-right">Amount</th>
              <th className="py-3.5 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-xs">
            {paginatedExpenses.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors group"
              >
                <td className="py-3.5 px-4">
                  <div className="font-bold text-slate-900 dark:text-slate-100">
                    {item.title}
                  </div>
                  {item.note && (
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 italic mt-0.5 truncate max-w-xs">
                      {item.note}
                    </div>
                  )}
                </td>
                <td className="py-3.5 px-4">
                  <CategoryBadge category={item.category} />
                </td>
                <td className="py-3.5 px-4 font-medium text-slate-600 dark:text-slate-300 whitespace-nowrap">
                  {formatDate(item.date)}
                </td>
                <td className="py-3.5 px-4">
                  <PaymentBadge method={item.paymentMethod} />
                </td>
                <td className="py-3.5 px-4 text-right font-extrabold text-sm text-slate-900 dark:text-slate-100 whitespace-nowrap">
                  {formatRupee(item.amount)}
                </td>
                <td className="py-3.5 px-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Tooltip content="Edit expense">
                      <button
                        onClick={() => openAddExpenseModal(item)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        aria-label="Edit expense"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </Tooltip>
                    <Tooltip content="Delete expense">
                      <button
                        onClick={() => setExpenseToDelete(item)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        aria-label="Delete expense"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </Tooltip>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View Grid */}
      <div className="md:hidden space-y-3">
        {paginatedExpenses.map((item) => (
          <div
            key={item.id}
            className="p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm space-y-3"
          >
            <div className="flex items-start justify-between gap-2">
              <div>
                <CategoryBadge category={item.category} />
                <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-2">
                  {item.title}
                </h4>
                {item.note && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 italic mt-0.5">
                    {item.note}
                  </p>
                )}
              </div>
              <span className="text-base font-extrabold text-slate-900 dark:text-slate-100 shrink-0">
                {formatRupee(item.amount)}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <span>{formatDate(item.date)}</span>
                <span>•</span>
                <PaymentBadge method={item.paymentMethod} />
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAddExpenseModal(item)}
                  className="p-2 rounded-lg text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 text-xs font-semibold flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => setExpenseToDelete(item)}
                  className="p-2 rounded-lg text-rose-600 bg-rose-50 dark:bg-rose-950/40 text-xs font-semibold flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl text-xs font-semibold text-slate-600 dark:text-slate-400">
          <span>
            Showing {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, expenses.length)} of {expenses.length}
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={validPage === 1}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span>
              Page {validPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={validPage === totalPages}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
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
    </div>
  );
};
