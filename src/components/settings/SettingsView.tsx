import React, { useState } from 'react';
import { ProfileSettings } from './ProfileSettings';
import { AppearanceSettings } from './AppearanceSettings';
import { DataManagement } from './DataManagement';
import { AboutSection } from './AboutSection';
import { BudgetEditor } from '../budget/BudgetEditor';
import { Settings, User, Sun, Target, Database, Info } from 'lucide-react';

type SettingsTab = 'profile' | 'appearance' | 'budget' | 'data' | 'about';

export const SettingsView: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<SettingsTab>('profile');

  const subTabs: { id: SettingsTab; label: string; icon: React.ReactNode }[] = [
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'appearance', label: 'Appearance', icon: <Sun className="w-4 h-4" /> },
    { id: 'budget', label: 'Budget', icon: <Target className="w-4 h-4" /> },
    { id: 'data', label: 'Data', icon: <Database className="w-4 h-4" /> },
    { id: 'about', label: 'About', icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
        <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Settings className="w-5 h-5 text-brand-600 dark:text-brand-400" />
          <span>Application Settings</span>
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Manage your student profile, theme preferences, budget limits, and data backups.
        </p>
      </div>

      {/* Settings Sub Navigation */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 overflow-x-auto no-scrollbar gap-2 pb-1">
        {subTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl whitespace-nowrap transition-all ${
              activeSubTab === tab.id
                ? 'bg-brand-600 dark:bg-brand-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Active Tab Panel */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm animate-fadeIn">
        {activeSubTab === 'profile' && <ProfileSettings />}
        {activeSubTab === 'appearance' && <AppearanceSettings />}
        {activeSubTab === 'budget' && <BudgetEditor />}
        {activeSubTab === 'data' && <DataManagement />}
        {activeSubTab === 'about' && <AboutSection />}
      </div>
    </div>
  );
};
