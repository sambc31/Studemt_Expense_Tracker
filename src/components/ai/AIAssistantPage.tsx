import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AIMessage } from '../../types';
import { processUserAIQuery } from '../../services/aiService';
import { AIMessageList } from './AIMessageList';
import { AISuggestedPrompts } from './AISuggestedPrompts';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Sparkles, Send, Trash2 } from 'lucide-react';

export const AIAssistantPage: React.FC = () => {
  const { profile, expenses, budget, savingGoal } = useApp();
  const firstName = profile?.name ? profile.name.trim().split(/\s+/)[0] : 'Student';

  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'init-1',
      sender: 'ai',
      text: `Hello **${firstName}**! 👋 I am **SpendWise AI**, your personal student spending companion.

Ask me anything about your recorded expenses, monthly budget limit, category breakdowns, or savings targets!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);

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
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: 'ai',
          text: `I'm having trouble connecting right now, but your expense records are safe! Try asking another question.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: `init-${Date.now()}`,
        sender: 'ai',
        text: `Chat history cleared. How can I help you manage your expenses today, **${firstName}**?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Header Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-brand-600 dark:bg-brand-500 text-white rounded-2xl shadow-md">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-slate-100">
              SpendWise AI Assistant
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Your personal spending companion. Data-aware & intelligent.
            </p>
          </div>
        </div>

        <Button variant="ghost" size="sm" onClick={clearChat} icon={<Trash2 className="w-4 h-4" />}>
          Clear Conversation
        </Button>
      </div>

      {/* Main Chat Box Container */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-4 sm:p-6 shadow-sm flex flex-col min-h-[500px]">
        {/* Messages List Area */}
        <div className="flex-1 overflow-y-auto pr-2 space-y-4 mb-4">
          <AIMessageList messages={messages} isTyping={isTyping} />
        </div>

        {/* Suggested Prompts Pill Container */}
        <div className="my-3 pt-3 border-t border-slate-100 dark:border-slate-800">
          <AISuggestedPrompts onSelectPrompt={(p) => handleSend(p)} />
        </div>

        {/* Input Control Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2 pt-2"
        >
          <div className="flex-1">
            <Input
              placeholder="Ask SpendWise AI about your budget, highest expenses, daily spending..."
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              disabled={isTyping}
            />
          </div>
          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={!inputQuery.trim() || isTyping}
            icon={<Send className="w-4 h-4" />}
          >
            Send
          </Button>
        </form>
      </div>
    </div>
  );
};
