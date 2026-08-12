import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { validateBudget } from '../../utils/validators';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { formatRupee } from '../../utils/formatters';
import { Target, CheckCircle2 } from 'lucide-react';

export const BudgetEditor: React.FC = () => {
  const { budget, updateBudget } = useApp();
  const [limit, setLimit] = useState(budget.monthlyLimit.toString());
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateBudget(limit);
    if (!validation.isValid) {
      setError(validation.error || '');
      return;
    }

    const numLimit = parseFloat(limit);
    updateBudget(numLimit);
    setIsEditing(false);
    setError('');
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-brand-100 dark:bg-brand-950/80 text-brand-700 dark:text-brand-300 rounded-2xl">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Monthly Spending Budget
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Current limit: <span className="font-extrabold text-slate-800 dark:text-slate-200">{formatRupee(budget.monthlyLimit)}</span>
            </p>
          </div>
        </div>

        {!isEditing ? (
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
            Edit Monthly Budget
          </Button>
        ) : (
          <form onSubmit={handleSave} className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2" noValidate>
            <div className="w-44">
              <Input
                type="number"
                step="any"
                min="0"
                placeholder="e.g. 15000"
                value={limit}
                onChange={(e) => {
                  setLimit(e.target.value);
                  if (error) setError('');
                }}
                error={error}
                leftIcon={<span className="text-xs font-bold text-slate-400">₹</span>}
              />
            </div>
            <div className="flex gap-2">
              <Button type="submit" variant="primary" size="sm" icon={<CheckCircle2 className="w-4 h-4" />}>
                Save
              </Button>
              <Button type="button" variant="ghost" size="sm" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
