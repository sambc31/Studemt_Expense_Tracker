import React from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../common/Card';
import { formatRupee } from '../../utils/formatters';
import {
  calculateMonthlyExpenses,
  calculateBudgetRemaining,
  calculateBudgetPercentage,
} from '../../services/calculationService';
import { ShieldCheck, AlertTriangle, AlertCircle, Info, Sparkles } from 'lucide-react';

export const BudgetProgress: React.FC = () => {
  const { expenses, budget, setActiveTab } = useApp();

  const monthlySpent = calculateMonthlyExpenses(expenses);
  const remaining = calculateBudgetRemaining(budget.monthlyLimit, monthlySpent);
  const percentage = calculateBudgetPercentage(budget.monthlyLimit, monthlySpent);

  // Status computation based on prompt spec (Section 27)
  let statusText = '';
  let statusType: 'success' | 'info' | 'warning' | 'danger' = 'success';
  let statusIcon = <ShieldCheck className="w-5 h-5" />;
  let barColorClass = 'from-emerald-500 to-teal-400';

  if (percentage < 50) {
    statusText = 'Your spending is on track.';
    statusType = 'success';
    statusIcon = <ShieldCheck className="w-5 h-5 text-emerald-500" />;
    barColorClass = 'from-emerald-500 to-teal-400';
  } else if (percentage >= 50 && percentage < 75) {
    statusText = 'You’re halfway through your monthly budget.';
    statusType = 'info';
    statusIcon = <Info className="w-5 h-5 text-blue-500" />;
    barColorClass = 'from-blue-500 to-indigo-400';
  } else if (percentage >= 75 && percentage < 90) {
    statusText = 'Be careful — you’re approaching your budget limit.';
    statusType = 'warning';
    statusIcon = <AlertTriangle className="w-5 h-5 text-amber-500" />;
    barColorClass = 'from-amber-500 to-orange-400';
  } else if (percentage >= 90 && percentage <= 100) {
    statusText = 'You’re very close to your budget limit.';
    statusType = 'warning';
    statusIcon = <AlertTriangle className="w-5 h-5 text-orange-500" />;
    barColorClass = 'from-orange-500 to-rose-500';
  } else {
    statusText = 'You have exceeded your monthly budget.';
    statusType = 'danger';
    statusIcon = <AlertCircle className="w-5 h-5 text-rose-500" />;
    barColorClass = 'from-rose-500 to-red-600';
  }

  const clampedPercentage = Math.min(100, percentage);

  return (
    <Card className="mb-6 space-y-6">
      {/* Top metrics grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Monthly Budget
          </span>
          <p className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
            {formatRupee(budget.monthlyLimit)}
          </p>
        </div>

        <div>
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Amount Spent
          </span>
          <p className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
            {formatRupee(monthlySpent)}
          </p>
        </div>

        <div>
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            {remaining >= 0 ? 'Remaining' : 'Over Budget'}
          </span>
          <p
            className={`text-xl font-extrabold mt-1 ${
              remaining < 0 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-900 dark:text-slate-100'
            }`}
          >
            {formatRupee(Math.abs(remaining))}
          </p>
        </div>

        <div>
          <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Percentage Used
          </span>
          <p className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
            {percentage}%
          </p>
        </div>
      </div>

      {/* Progress Gauge Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-300">
          <span>Monthly Progress</span>
          <span>{percentage}% Used</span>
        </div>

        <div className="w-full h-4 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-200/60 dark:border-slate-800">
          <div
            className={`h-full bg-gradient-to-r ${barColorClass} rounded-full transition-all duration-500`}
            style={{ width: `${clampedPercentage}%` }}
          />
        </div>
      </div>

      {/* Dynamic Status Callout Banner */}
      <div
        className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${
          statusType === 'success'
            ? 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900/40 text-emerald-900 dark:text-emerald-200'
            : statusType === 'info'
            ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900/40 text-blue-900 dark:text-blue-200'
            : statusType === 'warning'
            ? 'bg-amber-50/70 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900/40 text-amber-900 dark:text-amber-200'
            : 'bg-rose-50/70 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900/40 text-rose-900 dark:text-rose-200'
        }`}
      >
        <div className="flex items-center gap-3">
          {statusIcon}
          <div>
            <h4 className="text-xs font-bold">{statusText}</h4>
            <p className="text-[11px] opacity-80 mt-0.5">
              {percentage > 100
                ? `You have spent ${formatRupee(Math.abs(remaining))} more than your set limit.`
                : `You have ${formatRupee(remaining)} remaining for the rest of the month.`}
            </p>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('ai-assistant')}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/80 dark:bg-slate-900/80 rounded-xl text-xs font-bold shadow-sm hover:scale-105 transition-transform shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5 text-brand-500" />
          <span>Ask AI</span>
        </button>
      </div>
    </Card>
  );
};
