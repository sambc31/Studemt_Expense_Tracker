import React from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../common/Card';
import { Button } from '../common/Button';
import { formatRupee, formatDate } from '../../utils/formatters';
import { Target, Edit2, Plus, Sparkles } from 'lucide-react';

export const SmartSavingGoalCard: React.FC = () => {
  const { savingGoal, openSavingGoalModal, setActiveTab } = useApp();

  if (!savingGoal) {
    return (
      <Card className="mb-6 bg-gradient-to-r from-emerald-900/10 via-teal-900/10 to-slate-900/10 border-emerald-500/20">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 rounded-2xl">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                🎯 Smart Student Saving Goal
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Set a target to save for a new laptop, textbook, or project fund!
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={openSavingGoalModal}>
            <Plus className="w-4 h-4 mr-1" />
            Set Saving Target
          </Button>
        </div>
      </Card>
    );
  }

  const pct = Math.min(100, Math.round((savingGoal.currentAmount / savingGoal.targetAmount) * 100));
  const remaining = Math.max(0, savingGoal.targetAmount - savingGoal.currentAmount);

  // Calculate required weekly & monthly saving until target date
  const targetD = new Date(savingGoal.targetDate);
  const now = new Date();
  const diffDays = Math.max(1, Math.ceil((targetD.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
  const diffWeeks = Math.max(1, Math.ceil(diffDays / 7));
  const diffMonths = Math.max(1, Math.ceil(diffDays / 30));

  const neededPerWeek = Math.round(remaining / diffWeeks);
  const neededPerMonth = Math.round(remaining / diffMonths);

  return (
    <Card className="mb-6 border-brand-500/30">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-brand-600 dark:text-brand-400" />
          <h4 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
            🎯 Savings Goal: {savingGoal.name}
          </h4>
        </div>
        <button
          onClick={openSavingGoalModal}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Edit saving goal"
        >
          <Edit2 className="w-4 h-4" />
        </button>
      </div>

      {/* Progress Amount & Bar */}
      <div className="space-y-2">
        <div className="flex items-baseline justify-between text-xs">
          <span className="font-extrabold text-base text-slate-900 dark:text-slate-100">
            {formatRupee(savingGoal.currentAmount)}{' '}
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              / {formatRupee(savingGoal.targetAmount)}
            </span>
          </span>
          <span className="font-extrabold text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-950 px-2 py-0.5 rounded-md">
            {pct}% Complete
          </span>
        </div>

        {/* Animated Progress Bar */}
        <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-brand-500 to-emerald-400 transition-all duration-500 rounded-full"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Breakdown Details */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
        <div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400">Remaining</span>
          <p className="font-bold text-slate-900 dark:text-slate-100">{formatRupee(remaining)}</p>
        </div>
        <div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400">Needed Per Week</span>
          <p className="font-bold text-slate-900 dark:text-slate-100">{formatRupee(neededPerWeek)}/wk</p>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <span className="text-[10px] text-slate-500 dark:text-slate-400">Target Date</span>
          <p className="font-bold text-slate-900 dark:text-slate-100">{formatDate(savingGoal.targetDate)}</p>
        </div>
      </div>

      {/* AI Advice Pill */}
      <div className="mt-3 p-2.5 bg-brand-50/50 dark:bg-slate-800/60 rounded-xl text-[11px] text-brand-900 dark:text-brand-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
          <span>Need saving strategies? Ask SpendWise AI to analyze your goal.</span>
        </div>
        <button
          onClick={() => setActiveTab('ai-assistant')}
          className="font-bold text-brand-600 dark:text-brand-400 hover:underline shrink-0 ml-2"
        >
          Ask AI →
        </button>
      </div>
    </Card>
  );
};
