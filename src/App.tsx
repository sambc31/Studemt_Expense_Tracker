import React from 'react';
import { useApp } from './context/AppContext';
import { AppShell } from './components/layout/AppShell';
import { DashboardView } from './components/dashboard/DashboardView';
import { ExpensesView } from './components/expenses/ExpensesView';
import { AnalyticsView } from './components/analytics/AnalyticsView';
import { BudgetView } from './components/budget/BudgetView';
import { AIAssistantPage } from './components/ai/AIAssistantPage';
import { SettingsView } from './components/settings/SettingsView';

export const AppContent: React.FC = () => {
  const { activeTab } = useApp();

  return (
    <AppShell>
      {activeTab === 'dashboard' && <DashboardView />}
      {activeTab === 'expenses' && <ExpensesView />}
      {activeTab === 'analytics' && <AnalyticsView />}
      {activeTab === 'budget' && <BudgetView />}
      {activeTab === 'ai-assistant' && <AIAssistantPage />}
      {activeTab === 'settings' && <SettingsView />}
    </AppShell>
  );
};

export default AppContent;
