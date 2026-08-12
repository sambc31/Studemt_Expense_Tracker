import React from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../common/Card';
import {
  calculateCategoryTotals,
  calculateAverageDailySpend,
  calculateMonthlyChange,
  calculateLargestExpense,
} from '../../services/calculationService';
import { formatRupee } from '../../utils/formatters';
import { Lightbulb, Sparkles, CheckCircle2 } from 'lucide-react';

export const SpendingInsights: React.FC = () => {
  const { expenses } = useApp();

  if (expenses.length === 0) {
    return (
      <Card>
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Smart Spending Insights
          </h3>
        </div>
        <p className="text-xs text-slate-400 py-4 text-center">
          Add expenses to generate automated rule-based insights.
        </p>
      </Card>
    );
  }

  const categoryTotals = calculateCategoryTotals(expenses, true);
  const avgDaily = calculateAverageDailySpend(expenses);
  const change = calculateMonthlyChange(expenses);
  const largest = calculateLargestExpense(expenses);

  const topCategory = categoryTotals.length > 0
    ? [...categoryTotals].sort((a, b) => b.amount - a.amount)[0]
    : null;

  const insights: string[] = [];

  if (topCategory && topCategory.amount > 0) {
    insights.push(
      `**${topCategory.category}** is your largest spending category this month (${formatRupee(topCategory.amount)}, accounting for ${topCategory.percentage}% of your expenses).`
    );
  }

  insights.push(`Your average daily spending this month is **${formatRupee(avgDaily)}/day**.`);

  if (largest) {
    insights.push(
      `Your single highest recorded purchase is **"${largest.title}"** for **${formatRupee(largest.amount)}**.`
    );
  }

  if (!change.isPreviousZero) {
    if (change.direction === 'down') {
      insights.push(
        `Great habit! You spent **${Math.abs(change.percentageChange)}% less** this month compared to last month.`
      );
    } else if (change.direction === 'up') {
      insights.push(
        `Monthly expenses increased by **${change.percentageChange}%** compared to last month. Consider reviewing non-essential purchases.`
      );
    }
  }

  return (
    <Card className="h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <span>Smart Spending Insights</span>
          </h3>
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-md flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Live Data Derived
          </span>
        </div>

        <div className="space-y-3">
          {insights.map((insightText, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-200"
            >
              <CheckCircle2 className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
              <div
                className="leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: insightText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'),
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
