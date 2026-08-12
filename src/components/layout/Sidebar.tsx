import React from 'react';
import { useApp } from '../../context/AppContext';
import { ActiveTab } from '../../types';
import { getInitials } from '../../utils/formatters';
import { Tooltip } from '../common/Tooltip';
import {
  Wallet,
  LayoutDashboard,
  Receipt,
  PieChart,
  Target,
  Sparkles,
  Settings,
  PlusCircle,
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, profile, openAddExpenseModal } = useApp();

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'expenses', label: 'Expenses', icon: <Receipt className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <PieChart className="w-4 h-4" /> },
    { id: 'budget', label: 'Budget', icon: <Target className="w-4 h-4" /> },
    { id: 'ai-assistant', label: 'AI Assistant', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
  ];

  const initials = profile ? getInitials(profile.name) : 'SW';

  return (
    <aside className="hidden md:flex flex-col w-64 bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 h-screen sticky top-0 z-30 transition-colors">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-100 dark:border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-brand-600 dark:bg-brand-500 rounded-xl text-white shadow-md shadow-brand-500/20">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              SpendWise
            </h1>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
              Student Expense Tracker
            </p>
          </div>
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="px-4 py-4">
        <button
          onClick={() => openAddExpenseModal()}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-brand-600 hover:bg-brand-700 dark:bg-brand-500 dark:hover:bg-brand-600 text-white font-semibold text-sm rounded-xl shadow-sm transition-all active:scale-[0.98]"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Add Expense</span>
        </button>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto py-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-xs transition-all ${
                isActive
                  ? 'bg-brand-50 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 font-bold border border-brand-200/60 dark:border-brand-900/40'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <span className={isActive ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400'}>
                {item.icon}
              </span>
              <span>{item.label}</span>
              {item.id === 'ai-assistant' && (
                <span className="ml-auto px-1.5 py-0.5 text-[9px] font-extrabold uppercase bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 rounded-md">
                  AI
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* User Profile Area Footer */}
      {profile && (
        <div className="p-4 border-t border-slate-100 dark:border-slate-800/80">
          <div
            onClick={() => setActiveTab('settings')}
            className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-brand-100 dark:bg-brand-950 text-brand-700 dark:text-brand-300 font-bold text-xs flex items-center justify-center shrink-0 border border-brand-200 dark:border-brand-800">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                {profile.name}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                {profile.email}
              </p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
