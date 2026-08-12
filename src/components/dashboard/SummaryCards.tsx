import React from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../common/Card';
import { formatRupee } from '../../utils/formatters';
import {
  calculateTotalExpenses,
  calculateMonthlyExpenses,
  calculateWeeklyExpenses,
  calculateBudgetRemaining,
  calculateBudgetPercentage,
} from '../../services/calculationService';
import { Wallet, Calendar, Clock, PiggyBank } from 'lucide-react';

export const SummaryCards: React.FC = () => {
  const { expenses, budget, setActiveTab } = useApp();

  const grandTotal = calculateTotalExpenses(expenses);
  const monthTotal = calculateMonthlyExpenses(expenses);
  const weekTotal = calculateWeeklyExpenses(expenses);
  const remainingBudget = calculateBudgetRemaining(budget.monthlyLimit, monthTotal);
  const budgetPercentage = calculateBudgetPercentage(budget.monthlyLimit, monthTotal);

  const cards = [
    {
      id: 'total',
      label: 'Total Expenses',
      amount: formatRupee(grandTotal),
      secondary: `${expenses.length} transactions recorded`,
      icon: <Wallet className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />,
      bgIcon: 'bg-emerald-50 dark:bg-emerald-950/60',
      badgeColor: 'text-emerald-700 bg-emerald-100 dark:bg-emerald-950 dark:text-emerald-300',
    },
    {
      id: 'month',
      label: 'This Month',
      amount: formatRupee(monthTotal),
      secondary: `Limit: ${formatRupee(budget.monthlyLimit)}`,
      icon: <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
      bgIcon: 'bg-blue-50 dark:bg-blue-950/60',
      badgeColor: 'text-blue-700 bg-blue-100 dark:bg-blue-950 dark:text-blue-300',
    },
    {
      id: 'week',
      label: 'This Week',
      amount: formatRupee(weekTotal),
      secondary: 'Past 7 days spending',
      icon: <Clock className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
      bgIcon: 'bg-purple-50 dark:bg-purple-950/60',
      badgeColor: 'text-purple-700 bg-purple-100 dark:bg-purple-950 dark:text-purple-300',
    },
    {
      id: 'remaining',
      label: 'Remaining Budget',
      amount: formatRupee(remainingBudget),
      secondary: `${budgetPercentage}% of budget used`,
      icon: <PiggyBank className="w-5 h-5 text-amber-600 dark:text-amber-400" />,
      bgIcon: 'bg-amber-50 dark:bg-amber-950/60',
      badgeColor:
        budgetPercentage > 90
          ? 'text-rose-700 bg-rose-100 dark:bg-rose-950 dark:text-rose-300'
          : 'text-amber-700 bg-amber-100 dark:bg-amber-950 dark:text-amber-300',
      onClick: () => setActiveTab('budget'),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card) => (
        <Card
          key={card.id}
          onClick={card.onClick}
          hoverable={!!card.onClick}
          className="relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {card.label}
            </span>
            <div className={`p-2.5 rounded-xl ${card.bgIcon}`}>
              {card.icon}
            </div>
          </div>

          <div className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-1">
            {card.amount}
          </div>

          <div className="flex items-center justify-between text-xs mt-2">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
              {card.secondary}
            </span>
          </div>
        </Card>
      ))}
    </div>
  );
};
