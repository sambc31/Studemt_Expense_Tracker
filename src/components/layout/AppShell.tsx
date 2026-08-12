import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileNav } from './MobileNav';
import { Footer } from './Footer';
import { ToastContainer } from '../common/ToastContainer';
import { OnboardingModal } from '../onboarding/OnboardingModal';
import { ExpenseModal } from '../expenses/ExpenseModal';
import { SmartSavingGoalModal } from '../saving/SmartSavingGoalModal';
import { AIFloatingDrawer } from '../ai/AIFloatingDrawer';
import { Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const { activeTab, setActiveTab } = useApp();
  const [isAIDrawerOpen, setIsAIDrawerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col md:flex-row transition-colors">
      {/* Onboarding Modal Overlay */}
      <OnboardingModal />

      {/* Desktop Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Column */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 md:pb-0">
        <Header />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto animate-fadeIn">
          {children}
        </main>

        <Footer />
      </div>

      {/* Mobile Navigation Bar */}
      <MobileNav />

      {/* Global Toast Notifications Container */}
      <ToastContainer />

      {/* Global Expense Add/Edit Modal */}
      <ExpenseModal />

      {/* Global Smart Saving Goal Modal */}
      <SmartSavingGoalModal />

      {/* Floating AI Assistant Trigger & Drawer */}
      {activeTab !== 'ai-assistant' && (
        <>
          <button
            onClick={() => setIsAIDrawerOpen(true)}
            className="fixed bottom-20 md:bottom-6 right-5 z-40 flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-brand-600 to-emerald-600 hover:from-brand-700 hover:to-emerald-700 text-white font-bold text-xs rounded-full shadow-xl shadow-brand-500/30 transition-all hover:scale-105 active:scale-95"
            aria-label="Open SpendWise AI assistant"
          >
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>Ask SpendWise AI</span>
          </button>

          <AIFloatingDrawer isOpen={isAIDrawerOpen} onClose={() => setIsAIDrawerOpen(false)} />
        </>
      )}
    </div>
  );
};
