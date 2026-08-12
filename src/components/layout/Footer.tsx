import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-12 py-6 px-4 border-t border-slate-200/60 dark:border-slate-800/60 text-center text-xs text-slate-500 dark:text-slate-400">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-800 dark:text-slate-200">SpendWise</span>
          <span>— Wise Spending for Smart Students</span>
        </div>
        <div className="font-semibold text-brand-600 dark:text-brand-400">
          Developed by Sam Branham Christopher I
        </div>
      </div>
    </footer>
  );
};
