import React from 'react';
import { AIMessage } from '../../types';
import { useApp } from '../../context/AppContext';
import { getInitials } from '../../utils/formatters';
import { Sparkles } from 'lucide-react';

interface AIMessageListProps {
  messages: AIMessage[];
  isTyping: boolean;
}

export const AIMessageList: React.FC<AIMessageListProps> = ({ messages, isTyping }) => {
  const { profile, setActiveTab, openAddExpenseModal, filterByCategoryNav } = useApp();
  const initials = profile ? getInitials(profile.name) : 'ME';

  const handleAction = (action: string, payload?: any) => {
    if (action === 'navigate') {
      setActiveTab(payload);
    } else if (action === 'open_add_expense') {
      openAddExpenseModal();
    } else if (action === 'filter_category') {
      filterByCategoryNav(payload);
    }
  };

  return (
    <div className="space-y-4 py-2">
      {messages.map((msg) => {
        const isAI = msg.sender === 'ai';
        return (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${isAI ? '' : 'flex-row-reverse'} animate-fadeIn`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 shadow-sm ${
                isAI
                  ? 'bg-brand-600 dark:bg-brand-500 text-white'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
              }`}
            >
              {isAI ? <Sparkles className="w-4 h-4" /> : initials}
            </div>

            {/* Bubble Container */}
            <div className={`max-w-[85%] sm:max-w-[75%] space-y-2`}>
              <div
                className={`p-4 rounded-2xl text-xs leading-relaxed ${
                  isAI
                    ? 'bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-800 dark:text-slate-100 shadow-sm'
                    : 'bg-brand-600 dark:bg-brand-500 text-white font-medium'
                }`}
              >
                {/* Text Formatting */}
                <div
                  className="space-y-1.5 whitespace-pre-wrap"
                  dangerouslySetInnerHTML={{
                    __html: msg.text
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/• /g, '• '),
                  }}
                />
              </div>

              {/* Action Buttons */}
              {isAI && msg.actions && msg.actions.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {msg.actions.map((act, i) => (
                    <button
                      key={i}
                      onClick={() => handleAction(act.action, act.payload)}
                      className="px-3 py-1.5 bg-brand-50 hover:bg-brand-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-brand-700 dark:text-brand-300 font-bold text-[11px] rounded-xl border border-brand-200/60 dark:border-slate-700 transition-colors shadow-sm"
                    >
                      {act.label}
                    </button>
                  ))}
                </div>
              )}

              <span
                className={`block text-[10px] text-slate-400 dark:text-slate-500 ${
                  isAI ? 'text-left' : 'text-right'
                }`}
              >
                {msg.timestamp}
              </span>
            </div>
          </div>
        );
      })}

      {/* Typing indicator */}
      {isTyping && (
        <div className="flex items-center gap-3 animate-fadeIn">
          <div className="w-8 h-8 rounded-xl bg-brand-600 dark:bg-brand-500 text-white font-bold text-xs flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 animate-spin" />
          </div>
          <div className="p-3 bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 rounded-2xl text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 shadow-sm">
            <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce" />
            <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce [animation-delay:0.2s]" />
            <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-bounce [animation-delay:0.4s]" />
            <span className="ml-1 font-semibold">SpendWise AI is thinking...</span>
          </div>
        </div>
      )}
    </div>
  );
};
