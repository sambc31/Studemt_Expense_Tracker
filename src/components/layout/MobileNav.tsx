import React from 'react';
import { useApp } from '../../context/AppContext';
import { ActiveTab } from '../../types';
import {
  LayoutDashboard,
  Receipt,
  PieChart,
  Target,
  Sparkles,
  Settings,
  Plus,
} from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { activeTab, setActiveTab, openAddExpenseModal } = useApp();

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Home', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: 'expenses', label: 'Expenses', icon: <Receipt className="w-5 h-5" /> },
    { id: 'analytics', label: 'Analytics', icon: <PieChart className="w-5 h-5" /> },
    { id: 'budget', label: 'Budget', icon: <Target className="w-5 h-5" /> },
    { id: 'ai-assistant', label: 'AI', icon: <Sparkles className="w-5 h-5" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200/80 dark:border-slate-800 px-2 py-2 shadow-lg">
      <div className="flex items-center justify-around">
        {navItems.slice(0, 3).map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center p-1.5 min-w-[50px] transition-colors ${
                isActive ? 'text-brand-600 dark:text-brand-400 font-bold' : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              {item.icon}
              <span className="text-[10px] mt-1">{item.label}</span>
            </button>
          );
        })}

        {/* Center Add Floating Action */}
        <button
          onClick={() => openAddExpenseModal()}
          className="flex items-center justify-center w-11 h-11 bg-brand-600 dark:bg-brand-500 text-white rounded-full shadow-lg shadow-brand-500/30 -mt-5 active:scale-95 transition-transform"
          aria-label="Add Expense"
        >
          <Plus className="w-6 h-6" />
        </button>

        {navItems.slice(3).map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center p-1.5 min-w-[50px] transition-colors ${
                isActive ? 'text-brand-600 dark:text-brand-400 font-bold' : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              {item.icon}
              <span className="text-[10px] mt-1">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
