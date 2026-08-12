import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AIMessage } from '../../types';
import { processUserAIQuery } from '../../services/aiService';
import { AIMessageList } from './AIMessageList';
import { AISuggestedPrompts } from './AISuggestedPrompts';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Sparkles, X, Send } from 'lucide-react';

interface AIFloatingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIFloatingDrawer: React.FC<AIFloatingDrawerProps> = ({ isOpen, onClose }) => {
  const { profile, expenses, budget, savingGoal } = useApp();
  const firstName = profile?.name ? profile.name.trim().split(/\s+/)[0] : 'Student';

  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'drawer-init-1',
      sender: 'ai',
      text: `Hi **${firstName}**! 👋 How can I help you analyze your expenses today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend || !textToSend.trim() || isTyping) return;

    const userMsg: AIMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    try {
      const aiMsg = await processUserAIQuery(textToSend, profile, expenses, budget, savingGoal);
      setMessages((prev) => [...prev, aiMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: 'ai',
          text: `I'm having trouble connecting right now, but your data is safe!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col animate-slideLeft">
      {/* Header */}
      <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-gradient-to-r from-brand-600 to-emerald-600 text-white">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 bg-white/20 rounded-xl">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-extrabold">SpendWise AI</h3>
            <p className="text-[10px] text-brand-100">Personal Spending Companion</p>
          </div>
        </div>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/10 text-white" aria-label="Close AI drawer">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AIMessageList messages={messages} isTyping={isTyping} />
      </div>

      {/* Quick Prompts */}
      <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/60">
        <AISuggestedPrompts onSelectPrompt={(p) => handleSend(p)} />
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="p-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 bg-white dark:bg-slate-900"
      >
        <Input
          placeholder="Ask a question..."
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          disabled={isTyping}
        />
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={!inputQuery.trim() || isTyping}
          icon={<Send className="w-4 h-4" />}
        />
      </form>
    </div>
  );
};
