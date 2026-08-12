import React from 'react';
import { AnalyticsKPIs } from './AnalyticsKPIs';
import { MonthlyComparisonCard } from './MonthlyComparisonCard';
import { SpendingInsights } from './SpendingInsights';
import { CategoryBreakdown } from '../dashboard/CategoryBreakdown';
import { SpendingChart } from '../dashboard/SpendingChart';
import { PieChart } from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
        <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <PieChart className="w-5 h-5 text-brand-600 dark:text-brand-400" />
          <span>Spending Analytics & Insights</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Detailed metrics, month-over-month comparisons, trends, and rule-based insights.
        </p>
      </div>

      {/* Analytics KPIs */}
      <AnalyticsKPIs />

      {/* Interactive Spending Chart */}
      <SpendingChart />

      {/* Grid: Monthly Comparison & Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonthlyComparisonCard />
        <SpendingInsights />
      </div>

      {/* Category Breakdown */}
      <div className="w-full">
        <CategoryBreakdown />
      </div>
    </div>
  );
};
