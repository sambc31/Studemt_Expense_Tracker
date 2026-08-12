import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Target, Calendar, Trash2 } from 'lucide-react';

export const SmartSavingGoalModal: React.FC = () => {
  const { isSavingGoalModalOpen, closeSavingGoalModal, savingGoal, saveSavingGoal } = useApp();

  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [currentAmount, setCurrentAmount] = useState('');
  const [targetDate, setTargetDate] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (savingGoal) {
      setName(savingGoal.name);
      setTargetAmount(savingGoal.targetAmount.toString());
      setCurrentAmount(savingGoal.currentAmount.toString());
      setTargetDate(savingGoal.targetDate);
    } else {
      setName('');
      setTargetAmount('');
      setCurrentAmount('0');
      const defaultTarget = new Date();
      defaultTarget.setMonth(defaultTarget.getMonth() + 3);
      setTargetDate(defaultTarget.toISOString().split('T')[0]);
    }
    setErrors({});
  }, [savingGoal, isSavingGoalModalOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name || !name.trim()) {
      newErrors.name = 'Goal name is required.';
    }

    const targetNum = parseFloat(targetAmount);
    if (isNaN(targetNum) || targetNum <= 0) {
      newErrors.targetAmount = 'Please enter a valid target amount greater than ₹0.';
    }

    const currentNum = parseFloat(currentAmount) || 0;
    if (currentNum < 0) {
      newErrors.currentAmount = 'Current saved amount cannot be negative.';
    }

    if (!targetDate) {
      newErrors.targetDate = 'Target date is required.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    saveSavingGoal({
      id: savingGoal ? savingGoal.id : `goal-${Date.now()}`,
      name: name.trim(),
      targetAmount: targetNum,
      currentAmount: currentNum,
      targetDate,
      createdAt: savingGoal ? savingGoal.createdAt : new Date().toISOString(),
    });

    closeSavingGoalModal();
  };

  const handleClear = () => {
    saveSavingGoal(null);
    closeSavingGoalModal();
  };

  return (
    <Modal
      isOpen={isSavingGoalModalOpen}
      onClose={closeSavingGoalModal}
      title={savingGoal ? 'Edit Savings Goal' : 'Create Smart Student Saving Goal'}
      subtitle="Set a financial target to track progress and calculate required savings"
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Input
          label="Goal Name *"
          placeholder="e.g. New Laptop, Textbooks Fund, Emergency Reserve"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
          }}
          error={errors.name}
          leftIcon={<Target className="w-4 h-4 text-brand-500" />}
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Target Amount (₹ INR) *"
            type="number"
            placeholder="e.g. 30000"
            value={targetAmount}
            onChange={(e) => {
              setTargetAmount(e.target.value);
              if (errors.targetAmount) setErrors((prev) => ({ ...prev, targetAmount: '' }));
            }}
            error={errors.targetAmount}
            leftIcon={<span className="text-xs font-bold text-slate-400">₹</span>}
            required
          />

          <Input
            label="Current Saved Amount (₹ INR)"
            type="number"
            placeholder="e.g. 6000"
            value={currentAmount}
            onChange={(e) => {
              setCurrentAmount(e.target.value);
              if (errors.currentAmount) setErrors((prev) => ({ ...prev, currentAmount: '' }));
            }}
            error={errors.currentAmount}
            leftIcon={<span className="text-xs font-bold text-slate-400">₹</span>}
          />
        </div>

        <Input
          label="Target Date *"
          type="date"
          value={targetDate}
          onChange={(e) => {
            setTargetDate(e.target.value);
            if (errors.targetDate) setErrors((prev) => ({ ...prev, targetDate: '' }));
          }}
          error={errors.targetDate}
          leftIcon={<Calendar className="w-4 h-4" />}
          required
        />

        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          {savingGoal ? (
            <Button
              type="button"
              variant="danger"
              size="sm"
              onClick={handleClear}
              icon={<Trash2 className="w-4 h-4" />}
            >
              Clear Goal
            </Button>
          ) : <div />}

          <div className="flex gap-2">
            <Button type="button" variant="ghost" onClick={closeSavingGoalModal}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Target
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};
