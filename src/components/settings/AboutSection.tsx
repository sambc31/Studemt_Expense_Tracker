import React from 'react';
import { Card } from '../common/Card';
import { Wallet, Info, Code, ShieldCheck } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <div className="space-y-4 max-w-xl">
      <div className="flex items-center gap-2 mb-2">
        <Info className="w-5 h-5 text-brand-600 dark:text-brand-400" />
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
          About SpendWise
        </h3>
      </div>

      <Card className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-brand-600 dark:bg-brand-500 text-white rounded-2xl">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-base font-extrabold text-slate-900 dark:text-slate-100">
              SpendWise
            </h4>
            <p className="text-xs text-brand-600 dark:text-brand-400 font-semibold">
              Wise Spending for Smart Students
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          SpendWise is a personal finance companion designed for university students to track daily spending, manage monthly budgets, set savings goals, and gain data-driven AI financial insights.
        </p>

        <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs space-y-2 border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold">
            <Code className="w-4 h-4 text-brand-500" />
            <span>Built as a college project</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>100% Private local offline storage</span>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-xs font-bold text-brand-700 dark:text-brand-300">
          Developed by Sam Branham Christopher I
        </div>
      </Card>
    </div>
  );
};
