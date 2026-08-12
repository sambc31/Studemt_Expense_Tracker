import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, CheckCircle2 } from 'lucide-react';

export const AppearanceSettings: React.FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-4 max-w-lg">
      <div className="flex items-center gap-2 mb-2">
        <Sun className="w-5 h-5 text-amber-500" />
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
          Appearance & Theme
        </h3>
      </div>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        Choose your preferred application visual theme. Your choice is saved automatically.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        {/* Light Theme Option */}
        <div
          onClick={() => setTheme('light')}
          className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
            theme === 'light'
              ? 'border-brand-600 bg-brand-50/50 text-slate-900 shadow-md'
              : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-amber-100 text-amber-600 rounded-xl">
              <Sun className="w-5 h-5" />
            </div>
            {theme === 'light' && <CheckCircle2 className="w-5 h-5 text-brand-600" />}
          </div>
          <h4 className="text-sm font-bold">Light Theme</h4>
          <p className="text-xs text-slate-500 mt-1">Clean, bright interface for daytime use.</p>
        </div>

        {/* Dark Theme Option */}
        <div
          onClick={() => setTheme('dark')}
          className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
            theme === 'dark'
              ? 'border-brand-500 bg-slate-800 text-slate-100 shadow-md'
              : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
          }`}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-indigo-950 text-indigo-300 rounded-xl">
              <Moon className="w-5 h-5" />
            </div>
            {theme === 'dark' && <CheckCircle2 className="w-5 h-5 text-brand-400" />}
          </div>
          <h4 className="text-sm font-bold">Dark Theme</h4>
          <p className="text-xs text-slate-400 mt-1">Sleek dark mode tailored for late study sessions.</p>
        </div>
      </div>
    </div>
  );
};
