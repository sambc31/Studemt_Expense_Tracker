import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { ExpenseCategory, PaymentMethod } from '../../types';
import { ALL_CATEGORIES } from '../../services/calculationService';
import { validateExpense } from '../../utils/validators';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import { Receipt, Calendar, CreditCard, Tag, FileText } from 'lucide-react';

const paymentMethodOptions: { value: PaymentMethod; label: string }[] = [
  { value: 'UPI', label: 'UPI (GPay / PhonePe / Paytm)' },
  { value: 'Cash', label: 'Cash' },
  { value: 'Debit Card', label: 'Debit Card' },
  { value: 'Credit Card', label: 'Credit Card' },
  { value: 'Bank Transfer', label: 'Bank Transfer' },
  { value: 'Other', label: 'Other' },
];

const categorySelectOptions = [
  { value: '', label: 'Select a category...' },
  ...ALL_CATEGORIES.map((cat) => ({ value: cat, label: cat })),
];

export const ExpenseModal: React.FC = () => {
  const { isAddExpenseModalOpen, closeAddExpenseModal, editingExpense, addExpense, updateExpense } = useApp();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseCategory | ''>('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('UPI');
  const [note, setNote] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editingExpense) {
      setTitle(editingExpense.title);
      setAmount(editingExpense.amount.toString());
      setCategory(editingExpense.category);
      setDate(editingExpense.date);
      setPaymentMethod(editingExpense.paymentMethod);
      setNote(editingExpense.note || '');
      setErrors({});
    } else {
      setTitle('');
      setAmount('');
      setCategory('');
      setDate(new Date().toISOString().split('T')[0]);
      setPaymentMethod('UPI');
      setNote('');
      setErrors({});
    }
  }, [editingExpense, isAddExpenseModalOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const numAmount = parseFloat(amount);
    const validation = validateExpense({
      title,
      amount: numAmount,
      category,
      date,
      paymentMethod,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    if (editingExpense) {
      updateExpense(editingExpense.id, {
        title: title.trim(),
        amount: numAmount,
        category: category as ExpenseCategory,
        date,
        paymentMethod,
        note: note.trim(),
      });
    } else {
      addExpense({
        title: title.trim(),
        amount: numAmount,
        category: category as ExpenseCategory,
        date,
        paymentMethod,
        note: note.trim(),
      });
    }

    closeAddExpenseModal();
  };

  return (
    <Modal
      isOpen={isAddExpenseModalOpen}
      onClose={closeAddExpenseModal}
      title={editingExpense ? 'Edit Expense Record' : 'Add New Student Expense'}
      subtitle={editingExpense ? 'Modify expense details below' : 'Record a new college or personal purchase'}
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Title Input */}
        <Input
          label="Expense Title *"
          placeholder="e.g. Lunch at Cafeteria, Bus Pass, Textbook"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (errors.title) setErrors((prev) => ({ ...prev, title: '' }));
          }}
          error={errors.title}
          leftIcon={<Receipt className="w-4 h-4" />}
          required
        />

        {/* Amount & Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Amount (₹ INR) *"
            type="number"
            step="any"
            min="1"
            placeholder="e.g. 250"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              if (errors.amount) setErrors((prev) => ({ ...prev, amount: '' }));
            }}
            error={errors.amount}
            leftIcon={<span className="text-xs font-bold text-slate-500">₹</span>}
            required
          />

          <Select
            label="Category *"
            options={categorySelectOptions}
            value={category}
            onChange={(e) => {
              setCategory(e.target.value as ExpenseCategory);
              if (errors.category) setErrors((prev) => ({ ...prev, category: '' }));
            }}
            error={errors.category}
            required
          />
        </div>

        {/* Date & Payment Method Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Date *"
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              if (errors.date) setErrors((prev) => ({ ...prev, date: '' }));
            }}
            error={errors.date}
            leftIcon={<Calendar className="w-4 h-4" />}
            required
          />

          <Select
            label="Payment Method *"
            options={paymentMethodOptions}
            value={paymentMethod}
            onChange={(e) => {
              setPaymentMethod(e.target.value as PaymentMethod);
              if (errors.paymentMethod) setErrors((prev) => ({ ...prev, paymentMethod: '' }));
            }}
            error={errors.paymentMethod}
            required
          />
        </div>

        {/* Note / Description Input */}
        <Input
          label="Optional Note"
          placeholder="e.g. Shared bill with hostel roommates"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          leftIcon={<FileText className="w-4 h-4" />}
        />

        {/* Modal Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          <Button type="button" variant="ghost" onClick={closeAddExpenseModal}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            {editingExpense ? 'Save Changes' : '➕ Save Expense'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
