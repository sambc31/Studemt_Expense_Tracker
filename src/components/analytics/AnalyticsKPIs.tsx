import React from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../common/Card';
import { formatRupee } from '../../utils/formatters';
import {
  calculateTotalExpenses,
  calculateMonthlyExpenses,
  calculateAverageDailySpend,
  calculateLargestExpense,
  calculateCategoryTotals,
} from '../../services/calculationService';
import { DollarSign, Calendar, TrendingUp, Award } from 'lucide-react';

export const AnalyticsKPIs: React.FC = () => {
  const { expenses } = useApp();

  const totalSpent = calculateTotalExpenses(expenses);
  const monthSpent = calculateMonthlyExpenses(expenses);
  const avgDaily = calculateAverageDailySpend(expenses);
  const largest = calculateLargestExpense(expenses);
  const categoryTotals = calculateCategoryTotals(expenses, true);

  const topCategory = categoryTotals.length > 0
    ? [...categoryTotals].sort((a, b) => b.amount - a.amount)[0]
    : null;

  const kpis = [
    {
      label: 'Total All-Time Spend',
      value: formatRupee(totalSpent),
      sub: `${expenses.length} transactions`,
      icon: <DollarSign className="w-5 h-5 text-emerald-500" />,
      bgIcon: 'bg-emerald-50 dark:bg-emerald-950/60',
    },
    {
      label: 'Avg Daily Spend (Month)',
      value: formatRupee(avgDaily),
      sub: 'Per day average',
      icon: <Calendar className="w-5 h-5 text-blue-500" />,
      bgIcon: 'bg-blue-50 dark:bg-blue-950/60',
    },
    {
      label: 'Largest Single Expense',
      value: largest ? formatRupee(largest.amount) : '₹0',
      sub: largest ? largest.title : 'None',
      icon: <Award className="w-5 h-5 text-purple-500" />,
      bgIcon: 'bg-purple-50 dark:bg-purple-950/60',
    },
    {
      label: 'Most Expensive Category',
      value: topCategory ? topCategory.category : 'None',
      sub: topCategory ? formatRupee(topCategory.amount) : '₹0',
      icon: <TrendingUp className="w-5 h-5 text-amber-500" />,
      bgIcon: 'bg-amber-50 dark:bg-amber-950/60',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {kpis.map((kpi, idx) => (
        <Card key={idx}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {kpi.label}
            </span>
            <div className={`p-2 rounded-xl ${kpi.bgIcon}`}>{kpi.icon}</div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            {kpi.value}
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 truncate">
            {kpi.sub}
          </p>
        </Card>
      ))}
    </div>
  );
};
