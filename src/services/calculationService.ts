import { Expense, ExpenseCategory, FilterOptions } from '../types';

export const ALL_CATEGORIES: ExpenseCategory[] = [
  'Food',
  'Transport',
  'Education',
  'Shopping',
  'Entertainment',
  'Bills',
  'Health',
  'Other',
];

/**
 * Filter and sort expense list based on user selections
 */
export const filterAndSortExpenses = (
  expenses: Expense[],
  filters: FilterOptions
): Expense[] => {
  let result = [...expenses];

  // 1. Search Query (Title, Category, Payment Method, Note)
  if (filters.searchQuery && filters.searchQuery.trim() !== '') {
    const q = filters.searchQuery.trim().toLowerCase();
    result = result.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        e.paymentMethod.toLowerCase().includes(q) ||
        (e.note && e.note.toLowerCase().includes(q))
    );
  }

  // 2. Category Filter
  if (filters.category && filters.category !== 'All') {
    result = result.filter((e) => e.category === filters.category);
  }

  // 3. Payment Method Filter
  if (filters.paymentMethod && filters.paymentMethod !== 'All') {
    result = result.filter((e) => e.paymentMethod === filters.paymentMethod);
  }

  // 4. Date Range Filter
  if (filters.dateRange && filters.dateRange !== 'all') {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    result = result.filter((e) => {
      const eDate = new Date(e.date);
      if (isNaN(eDate.getTime())) return false;

      if (filters.dateRange === '7d') {
        const d7 = new Date(today);
        d7.setDate(d7.getDate() - 7);
        return eDate >= d7;
      } else if (filters.dateRange === '30d') {
        const d30 = new Date(today);
        d30.setDate(d30.getDate() - 30);
        return eDate >= d30;
      } else if (filters.dateRange === '90d') {
        const d90 = new Date(today);
        d90.setDate(d90.getDate() - 90);
        return eDate >= d90;
      } else if (filters.dateRange === 'this_month') {
        return (
          eDate.getFullYear() === now.getFullYear() &&
          eDate.getMonth() === now.getMonth()
        );
      } else if (filters.dateRange === 'last_month') {
        const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        return (
          eDate.getFullYear() === lastMonthDate.getFullYear() &&
          eDate.getMonth() === lastMonthDate.getMonth()
        );
      }
      return true;
    });
  }

  // 5. Amount Range Filter
  if (filters.minAmount !== undefined && !isNaN(filters.minAmount)) {
    result = result.filter((e) => e.amount >= filters.minAmount!);
  }
  if (filters.maxAmount !== undefined && !isNaN(filters.maxAmount)) {
    result = result.filter((e) => e.amount <= filters.maxAmount!);
  }

  // 6. Sorting
  result.sort((a, b) => {
    if (filters.sortBy === 'newest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (filters.sortBy === 'oldest') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    } else if (filters.sortBy === 'highest') {
      return b.amount - a.amount;
    } else if (filters.sortBy === 'lowest') {
      return a.amount - b.amount;
    }
    return 0;
  });

  return result;
};

/**
 * Calculate grand total of all expenses in dataset
 */
export const calculateTotalExpenses = (expenses: Expense[]): number => {
  return expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
};

/**
 * Calculate total expenses for the current calendar month
 */
export const calculateMonthlyExpenses = (expenses: Expense[], targetDate?: Date): number => {
  const date = targetDate || new Date();
  const year = date.getFullYear();
  const month = date.getMonth();

  return expenses
    .filter((e) => {
      const d = new Date(e.date);
      return !isNaN(d.getTime()) && d.getFullYear() === year && d.getMonth() === month;
    })
    .reduce((sum, e) => sum + (e.amount || 0), 0);
};

/**
 * Calculate total expenses for the past 7 days
 */
export const calculateWeeklyExpenses = (expenses: Expense[]): number => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const d7 = new Date(today);
  d7.setDate(d7.getDate() - 6);

  return expenses
    .filter((e) => {
      const d = new Date(e.date);
      return !isNaN(d.getTime()) && d >= d7 && d <= now;
    })
    .reduce((sum, e) => sum + (e.amount || 0), 0);
};

/**
 * Calculate total expenses for today
 */
export const calculateTodayExpenses = (expenses: Expense[]): number => {
  const now = new Date();
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
    now.getDate()
  ).padStart(2, '0')}`;

  return expenses
    .filter((e) => e.date === todayStr)
    .reduce((sum, e) => sum + (e.amount || 0), 0);
};

/**
 * Calculate category breakdown with totals and percentages for current month
 */
export const calculateCategoryTotals = (
  expenses: Expense[],
  currentMonthOnly: boolean = true
): { category: ExpenseCategory; amount: number; percentage: number; count: number }[] => {
  let targetExpenses = expenses;
  if (currentMonthOnly) {
    const now = new Date();
    targetExpenses = expenses.filter((e) => {
      const d = new Date(e.date);
      return !isNaN(d.getTime()) && d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
    });
  }

  const grandTotal = targetExpenses.reduce((sum, e) => sum + (e.amount || 0), 0);

  const categoryMap: Record<ExpenseCategory, { amount: number; count: number }> = {
    Food: { amount: 0, count: 0 },
    Transport: { amount: 0, count: 0 },
    Education: { amount: 0, count: 0 },
    Shopping: { amount: 0, count: 0 },
    Entertainment: { amount: 0, count: 0 },
    Bills: { amount: 0, count: 0 },
    Health: { amount: 0, count: 0 },
    Other: { amount: 0, count: 0 },
  };

  targetExpenses.forEach((e) => {
    if (categoryMap[e.category]) {
      categoryMap[e.category].amount += e.amount || 0;
      categoryMap[e.category].count += 1;
    }
  });

  return ALL_CATEGORIES.map((category) => {
    const item = categoryMap[category];
    const percentage = grandTotal > 0 ? (item.amount / grandTotal) * 100 : 0;
    return {
      category,
      amount: item.amount,
      percentage: Math.round(percentage * 10) / 10,
      count: item.count,
    };
  }).filter((item) => item.amount > 0 || !currentMonthOnly);
};

/**
 * Calculate average daily spending for the current month
 */
export const calculateAverageDailySpend = (expenses: Expense[]): number => {
  const now = new Date();
  const dayOfMonth = Math.max(1, now.getDate());
  const monthTotal = calculateMonthlyExpenses(expenses);
  return Math.round(monthTotal / dayOfMonth);
};

/**
 * Identify largest expense record in dataset
 */
export const calculateLargestExpense = (expenses: Expense[]): Expense | null => {
  if (!expenses || expenses.length === 0) return null;
  return expenses.reduce(
    (max, e) => (e.amount > (max ? max.amount : 0) ? e : max),
    null as Expense | null
  );
};

/**
 * Calculate remaining budget balance
 */
export const calculateBudgetRemaining = (monthlyLimit: number, monthlySpent: number): number => {
  return monthlyLimit - monthlySpent;
};

/**
 * Calculate percentage of budget used
 */
export const calculateBudgetPercentage = (monthlyLimit: number, monthlySpent: number): number => {
  if (!monthlyLimit || monthlyLimit <= 0) return 0;
  return Math.round((monthlySpent / monthlyLimit) * 100);
};

/**
 * Calculate month-over-month comparison (% change)
 * Handles zero previous-month spending safely without returning NaN or Infinity
 */
export const calculateMonthlyChange = (
  expenses: Expense[]
): {
  currentMonth: number;
  prevMonth: number;
  percentageChange: number;
  direction: 'up' | 'down' | 'neutral';
  isPreviousZero: boolean;
} => {
  const now = new Date();
  const currentMonthTotal = calculateMonthlyExpenses(expenses, now);

  const prevMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const prevMonthTotal = calculateMonthlyExpenses(expenses, prevMonthDate);

  if (prevMonthTotal === 0) {
    return {
      currentMonth: currentMonthTotal,
      prevMonth: 0,
      percentageChange: 0,
      direction: 'neutral',
      isPreviousZero: true,
    };
  }

  const diff = currentMonthTotal - prevMonthTotal;
  const percentageChange = Math.round((diff / prevMonthTotal) * 100);

  return {
    currentMonth: currentMonthTotal,
    prevMonth: prevMonthTotal,
    percentageChange,
    direction: percentageChange > 0 ? 'up' : percentageChange < 0 ? 'down' : 'neutral',
    isPreviousZero: false,
  };
};

/**
 * Get daily timeline data for charts (e.g. 7 days or 30 days)
 */
export const getDailyChartData = (
  expenses: Expense[],
  daysCount: number = 7
): { date: string; amount: number; formattedDate: string }[] => {
  const result: { date: string; amount: number; formattedDate: string }[] = [];
  const now = new Date();

  for (let i = daysCount - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    const dateStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
      d.getDate()
    ).padStart(2, '0')}`;

    const formattedDate = new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
    }).format(d);

    const dayTotal = expenses
      .filter((e) => e.date === dateStr)
      .reduce((sum, e) => sum + e.amount, 0);

    result.push({
      date: dateStr,
      amount: dayTotal,
      formattedDate,
    });
  }

  return result;
};
