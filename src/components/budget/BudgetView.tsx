import React from 'react';
import { useApp } from '../../context/AppContext';
import { BudgetEditor } from './BudgetEditor';
import { BudgetProgress } from './BudgetProgress';
import { Card } from '../common/Card';
import { calculateCategoryTotals, calculateMonthlyExpenses } from '../../services/calculationService';
import { formatRupee } from '../../utils/formatters';
import { CategoryBadge } from '../common/Badge';
import { Target, Lightbulb } from 'lucide-react';

export const BudgetView: React.FC = () => {
  const { expenses, budget } = useApp();

  const monthlySpent = calculateMonthlyExpenses(expenses);
  const categoryTotals = calculateCategoryTotals(expenses, true);

  return (
    <div className="space-y-6">
      {/* Top Header Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
        <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Target className="w-5 h-5 text-brand-600 dark:text-brand-400" />
          <span>Budget Management</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Set monthly limits, monitor percentage thresholds, and receive real-time budget warnings.
        </p>
      </div>

      {/* Budget Limit Config Editor */}
      <BudgetEditor />

      {/* Budget Gauge & Progress Status */}
      <BudgetProgress />

      {/* Category Wise Budget Allocation Insights */}
      <Card>
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Category Budget Breakdown (This Month)
          </h3>
        </div>

        {categoryTotals.length === 0 ? (
          <div className="text-center py-6 text-xs text-slate-400">
            No expenses recorded this month yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {categoryTotals.map((item) => (
              <div
                key={item.category}
                className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800"
              >
                <div className="flex items-center justify-between mb-2">
                  <CategoryBadge category={item.category} />
                  <span className="text-[10px] font-bold text-slate-400">{item.percentage}%</span>
                </div>

                <div className="text-base font-extrabold text-slate-900 dark:text-slate-100">
                  {formatRupee(item.amount)}
                </div>

                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full bg-brand-500 rounded-full"
                    style={{ width: `${Math.min(100, item.percentage)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};
