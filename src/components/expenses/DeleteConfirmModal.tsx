import React from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { AlertTriangle } from 'lucide-react';
import { Expense } from '../../types';
import { formatRupee } from '../../utils/formatters';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  expense: Expense | null;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  expense,
}) => {
  if (!expense) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} maxWidth="sm">
      <div className="text-center py-2">
        <div className="mx-auto w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-4">
          <AlertTriangle className="w-6 h-6" />
        </div>

        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">
          Delete this expense?
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          Are you sure you want to remove <span className="font-bold text-slate-700 dark:text-slate-200">"{expense.title}"</span> ({formatRupee(expense.amount)})? This action cannot be undone.
        </p>

        <div className="flex gap-3 justify-center pt-2">
          <Button variant="outline" size="md" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button variant="danger" size="md" onClick={onConfirm} className="flex-1">
            Delete Expense
          </Button>
        </div>
      </div>
    </Modal>
  );
};
