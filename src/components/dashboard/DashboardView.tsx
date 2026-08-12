import React from 'react';
import { useApp } from '../../context/AppContext';
import { GreetingBanner } from './GreetingBanner';
import { SummaryCards } from './SummaryCards';
import { SmartSavingGoalCard } from './SmartSavingGoalCard';
import { SpendingChart } from './SpendingChart';
import { CategoryBreakdown } from './CategoryBreakdown';
import { RecentExpenses } from './RecentExpenses';
import { calculateMonthlyChange } from '../../services/calculationService';
import { TrendingUp, TrendingDown, Info } from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { expenses } = useApp();
  const change = calculateMonthlyChange(expenses);

  return (
    <div className="space-y-6">
      {/* Dynamic Personalized Greeting Header */}
      <GreetingBanner />

      {/* Monthly Personalized Trend Banner */}
      {!change.isPreviousZero && (
        <div
          className={`p-3.5 rounded-2xl border text-xs font-semibold flex items-center justify-between animate-fadeIn ${
            change.direction === 'up'
              ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/40 text-amber-900 dark:text-amber-200'
              : change.direction === 'down'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/40 text-emerald-900 dark:text-emerald-200'
              : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {change.direction === 'up' ? (
              <TrendingUp className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            ) : change.direction === 'down' ? (
              <TrendingDown className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            ) : (
              <Info className="w-4 h-4 text-slate-500 shrink-0" />
            )}
            <span>
              {change.direction === 'up'
                ? `Your spending is ${change.percentageChange}% higher than last month.`
                : change.direction === 'down'
                ? `Great job! Your spending is ${Math.abs(change.percentageChange)}% lower than last month.`
                : 'Your spending is steady compared to last month.'}
            </span>
          </div>
        </div>
      )}

      {/* 4 KPI Summary Cards */}
      <SummaryCards />

      {/* Smart Saving Target Widget */}
      <SmartSavingGoalCard />

      {/* Spending Overview Trend Chart */}
      <SpendingChart />

      {/* Category Breakdown & Recent Expenses Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryBreakdown />
        <RecentExpenses />
      </div>
    </div>
  );
};
