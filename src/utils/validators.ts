/**
 * Validates strictly if an email address is a valid Gmail address
 * Accept: example@gmail.com
 * Reject: example@yahoo.com, example, @gmail.com, whitespace
 */
export const validateGmail = (email: string): { isValid: boolean; error?: string } => {
  if (!email || !email.trim()) {
    return { isValid: false, error: 'Gmail address is required.' };
  }

  const trimmed = email.trim().toLowerCase();

  // Basic email pattern check + explicit @gmail.com ending requirement
  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  if (!trimmed.endsWith('@gmail.com')) {
    return { isValid: false, error: 'Must be a valid Gmail address ending in @gmail.com' };
  }

  if (trimmed.startsWith('@gmail.com')) {
    return { isValid: false, error: 'Please enter a username before @gmail.com' };
  }

  if (!gmailRegex.test(trimmed)) {
    return { isValid: false, error: 'Invalid Gmail address format.' };
  }

  return { isValid: true };
};

/**
 * Validates Full Name field
 */
export const validateName = (name: string): { isValid: boolean; error?: string } => {
  if (!name || !name.trim()) {
    return { isValid: false, error: 'Full name is required.' };
  }
  if (name.trim().length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters long.' };
  }
  return { isValid: true };
};

/**
 * Validates Expense entry form
 */
export const validateExpense = (expense: {
  title: string;
  amount: number | string;
  category: string;
  date: string;
  paymentMethod: string;
}): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  if (!expense.title || !expense.title.trim()) {
    errors.title = 'Expense title is required.';
  } else if (expense.title.trim().length > 100) {
    errors.title = 'Title must be under 100 characters.';
  }

  const numAmount = typeof expense.amount === 'string' ? parseFloat(expense.amount) : expense.amount;

  if (isNaN(numAmount) || numAmount === null || numAmount === undefined) {
    errors.amount = 'Please enter a valid amount.';
  } else if (numAmount <= 0) {
    errors.amount = 'Amount must be greater than ₹0.';
  } else if (numAmount > 10000000) {
    errors.amount = 'Amount is unrealistically large.';
  }

  if (!expense.category) {
    errors.category = 'Please select a category.';
  }

  if (!expense.date) {
    errors.date = 'Date is required.';
  } else {
    const d = new Date(expense.date);
    if (isNaN(d.getTime())) {
      errors.date = 'Invalid date selected.';
    }
  }

  if (!expense.paymentMethod) {
    errors.paymentMethod = 'Please select a payment method.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

/**
 * Validates Budget amount input
 */
export const validateBudget = (limit: number | string): { isValid: boolean; error?: string } => {
  const num = typeof limit === 'string' ? parseFloat(limit) : limit;
  if (isNaN(num) || num < 0) {
    return { isValid: false, error: 'Budget amount must be a positive number.' };
  }
  return { isValid: true };
};
