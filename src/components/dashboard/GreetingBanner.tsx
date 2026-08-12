import React from 'react';
import { useApp } from '../../context/AppContext';
import { getTimeBasedGreeting, formatDate } from '../../utils/formatters';
import { Calendar } from 'lucide-react';

export const GreetingBanner: React.FC = () => {
  const { profile } = useApp();
  const userName = profile?.name || 'Student';
  const { greeting, icon } = getTimeBasedGreeting(userName);
  const todayFormatted = formatDate(new Date().toISOString());

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 bg-gradient-to-r from-brand-600 via-brand-700 to-slate-900 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6 rounded-3xl text-white shadow-lg shadow-brand-600/10 border border-brand-500/20">
      <div>
        <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight flex items-center gap-2">
          <span>{greeting}</span>
          <span className="text-2xl">{icon}</span>
        </h2>
        <p className="text-xs sm:text-sm text-brand-100/90 dark:text-slate-300 mt-1">
          Here’s your personal spending overview.
        </p>
      </div>

      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 backdrop-blur-md text-xs font-semibold text-brand-100 dark:text-slate-300 border border-white/10 self-start sm:self-auto">
        <Calendar className="w-4 h-4 text-emerald-300" />
        <span>Today: {todayFormatted}</span>
      </div>
    </div>
  );
};
