import React from 'react';
import { SUGGESTED_PROMPTS } from '../../services/aiService';

interface AISuggestedPromptsProps {
  onSelectPrompt: (prompt: string) => void;
}

export const AISuggestedPrompts: React.FC<AISuggestedPromptsProps> = ({ onSelectPrompt }) => {
  return (
    <div className="space-y-2">
      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
        Suggested Quick Prompts
      </span>
      <div className="flex flex-wrap gap-2">
        {SUGGESTED_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => onSelectPrompt(prompt)}
            className="px-3 py-1.5 bg-slate-100 hover:bg-brand-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 hover:text-brand-700 dark:hover:text-brand-300 text-xs font-semibold rounded-xl border border-slate-200/80 dark:border-slate-700 transition-all text-left"
          >
            💬 "{prompt}"
          </button>
        ))}
      </div>
    </div>
  );
};
