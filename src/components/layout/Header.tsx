import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { getInitials } from '../../utils/formatters';
import { Tooltip } from '../common/Tooltip';
import { NotificationCenter } from './NotificationCenter';
import { Sun, Moon, Bell, User, Settings as SettingsIcon, RotateCcw, ChevronDown } from 'lucide-react';

export const Header: React.FC = () => {
  const { activeTab, setActiveTab, profile, notifications, resetAllData } = useApp();
  const { theme, toggleTheme } = useTheme();

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isConfirmResetOpen, setIsConfirmResetOpen] = useState(false);

  const titles: Record<string, string> = {
    dashboard: 'Dashboard',
    expenses: 'Expenses',
    analytics: 'Spending Analytics',
    budget: 'Budget Management',
    'ai-assistant': 'SpendWise AI Assistant',
    settings: 'Settings',
  };

  const unreadCount = notifications.filter((n) => !n.read).length;
  const initials = profile ? getInitials(profile.name) : 'SW';

  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 sticky top-0 z-20 transition-colors px-4 sm:px-8 py-3.5 flex items-center justify-between">
      {/* Title */}
      <div>
        <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-slate-100">
          {titles[activeTab] || 'Dashboard'}
        </h2>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Theme Toggle Button */}
        <Tooltip content={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle light or dark theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-700" />}
          </button>
        </Tooltip>

        {/* Notifications Icon with Badge */}
        <div className="relative">
          <Tooltip content="Notifications">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
              aria-label="Open notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
              )}
            </button>
          </Tooltip>

          <NotificationCenter isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
        </div>

        {/* User Avatar Menu Dropdown */}
        {profile && (
          <div className="relative">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="User profile menu"
            >
              <div className="w-8 h-8 rounded-xl bg-brand-600 dark:bg-brand-500 text-white font-bold text-xs flex items-center justify-center shadow-sm">
                {initials}
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {/* Profile Menu Popover */}
            {isProfileMenuOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl py-2 z-50 animate-scaleUp text-xs"
                onClick={() => setIsProfileMenuOpen(false)}
              >
                <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                  <p className="font-bold text-slate-900 dark:text-slate-100 truncate">{profile.name}</p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{profile.email}</p>
                </div>

                <button
                  onClick={() => setActiveTab('settings')}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  <span>Profile</span>
                </button>

                <button
                  onClick={() => setActiveTab('settings')}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
                >
                  <SettingsIcon className="w-4 h-4 text-slate-400" />
                  <span>Settings</span>
                </button>

                <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

                <button
                  onClick={() => setIsConfirmResetOpen(true)}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 font-medium"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset Application Data</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Confirmation Modal for Reset from Profile Menu */}
      {isConfirmResetOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-2">
              Reset Application Data?
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              This will permanently delete all expenses, budget limits, profile settings, and restore initial onboarding.
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setIsConfirmResetOpen(false)}
                className="px-4 py-2 text-xs font-semibold rounded-xl border border-slate-300 dark:border-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsConfirmResetOpen(false);
                  resetAllData();
                }}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-rose-600 text-white"
              >
                Reset Data
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
