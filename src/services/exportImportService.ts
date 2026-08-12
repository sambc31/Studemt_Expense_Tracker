import { Expense, UserProfile, Budget, SavingGoal } from '../types';

export interface ExportDataPayload {
  version: string;
  exportedAt: string;
  profile: UserProfile | null;
  budget: Budget;
  expenses: Expense[];
  savingGoal: SavingGoal | null;
}

export const exportImportService = {
  /**
   * Export user data as a downloadable JSON file
   */
  exportJSON: (
    profile: UserProfile | null,
    budget: Budget,
    expenses: Expense[],
    savingGoal: SavingGoal | null
  ): void => {
    const payload: ExportDataPayload = {
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      profile,
      budget,
      expenses,
      savingGoal,
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(payload, null, 2));
    const downloadAnchor = document.createElement('a');
    const fileName = `spendwise_backup_${new Date().toISOString().split('T')[0]}.json`;

    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', fileName);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  },

  /**
   * Export expenses table as a downloadable CSV file
   */
  exportCSV: (expenses: Expense[]): void => {
    if (!expenses || expenses.length === 0) return;

    const headers = ['ID', 'Title', 'Amount (INR)', 'Category', 'Date', 'Payment Method', 'Notes'];
    const rows = expenses.map((e) => [
      `"${e.id}"`,
      `"${e.title.replace(/"/g, '""')}"`,
      e.amount,
      `"${e.category}"`,
      `"${e.date}"`,
      `"${e.paymentMethod}"`,
      `"${(e.note || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `spendwise_expenses_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  },

  /**
   * Validates imported JSON data payload
   */
  validateImportPayload: (data: any): { isValid: boolean; parsedData?: ExportDataPayload; error?: string } => {
    if (!data || typeof data !== 'object') {
      return { isValid: false, error: 'Invalid file format. Must be a valid JSON object.' };
    }

    // Must have expenses array or valid schema
    if (!Array.isArray(data.expenses)) {
      return { isValid: false, error: 'Invalid data structure: missing expenses list.' };
    }

    // Check individual expense items
    for (let i = 0; i < data.expenses.length; i++) {
      const e = data.expenses[i];
      if (!e || typeof e !== 'object') {
        return { isValid: false, error: `Invalid expense record at position ${i + 1}.` };
      }
      if (!e.title || typeof e.title !== 'string') {
        return { isValid: false, error: `Expense at position ${i + 1} is missing a title.` };
      }
      if (typeof e.amount !== 'number' || isNaN(e.amount) || e.amount <= 0) {
        return { isValid: false, error: `Expense "${e.title}" has an invalid amount.` };
      }
      if (!e.category || !e.date || !e.paymentMethod) {
        return { isValid: false, error: `Expense "${e.title}" has missing required fields.` };
      }
    }

    return {
      isValid: true,
      parsedData: {
        version: data.version || '1.0.0',
        exportedAt: data.exportedAt || new Date().toISOString(),
        profile: data.profile || null,
        budget: data.budget || { monthlyLimit: 15000, updatedAt: new Date().toISOString() },
        expenses: data.expenses,
        savingGoal: data.savingGoal || null,
      },
    };
  },
};
