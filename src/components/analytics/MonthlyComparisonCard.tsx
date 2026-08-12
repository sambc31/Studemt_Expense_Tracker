import React from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../common/Card';
import { calculateMonthlyChange } from '../../services/calculationService';
import { formatRupee } from '../../utils/formatters';
import { ArrowUpRight, ArrowDownRight, Minus, Calendar } from 'lucide-react';

export const MonthlyComparisonCard: React.FC = () => {
  const { expenses } = useApp();
  const change = calculateMonthlyChange(expenses);

  return (
    <Card className="h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-brand-600 dark:text-brand-400" />
            <span>This Month vs Last Month</span>
          </h3>
          <span className="text-[11px] font-semibold text-slate-400">Comparative</span>
        </div>

        <div className="grid grid-cols-2 gap-4 my-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              This Month
            </span>
            <p className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mt-0.5">
              {formatRupee(change.currentMonth)}
            </p>
          </div>

          <div>
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
              Last Month
            </span>
            <p className="text-xl font-extrabold text-slate-900 dark:text-slate-100 mt-0.5">
              {formatRupee(change.prevMonth)}
            </p>
          </div>
        </div>

        {/* Change Indicator */}
        <div className="flex items-center gap-3">
          {change.isPreviousZero ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold">
              <Minus className="w-4 h-4 text-slate-500" />
              <span>No data for last month to compare.</span>
            </div>
          ) : change.direction === 'up' ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-bold border border-rose-200 dark:border-rose-900/40">
              <ArrowUpRight className="w-4 h-4" />
              <span>Increased by {change.percentageChange}%</span>
            </div>
          ) : change.direction === 'down' ? (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold border border-emerald-200 dark:border-emerald-900/40">
              <ArrowDownRight className="w-4 h-4" />
              <span>Decreased by {Math.abs(change.percentageChange)}%</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold">
              <Minus className="w-4 h-4 text-slate-500" />
              <span>Exact same spending as last month.</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
