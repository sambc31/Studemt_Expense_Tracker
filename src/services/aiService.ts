import { Expense, UserProfile, Budget, SavingGoal, AIMessage } from '../types';
import {
  calculateTotalExpenses,
  calculateMonthlyExpenses,
  calculateCategoryTotals,
  calculateLargestExpense,
  calculateBudgetRemaining,
  calculateBudgetPercentage,
  calculateMonthlyChange,
  calculateAverageDailySpend,
} from './calculationService';
import { formatRupee } from '../utils/formatters';

export const SUGGESTED_PROMPTS = [
  'Where am I spending the most?',
  'How much did I spend this month?',
  'Give me 3 ways to reduce my spending.',
  'Am I close to my budget limit?',
  'How much can I spend per day?',
  'Analyze my overall spending.',
  'What was my largest expense?',
  'Analyze my food expenses.',
];

/**
 * AI Service for SpendWise
 */
export const processUserAIQuery = async (
  query: string,
  profile: UserProfile | null,
  expenses: Expense[],
  budget: Budget,
  savingGoal: SavingGoal | null
): Promise<AIMessage> => {
  const firstName = profile && profile.name ? profile.name.trim().split(/\s+/)[0] : 'Student';
  const qLower = query.toLowerCase().trim();

  const now = new Date();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const daysRemaining = Math.max(1, daysInMonth - now.getDate() + 1);

  const monthlySpent = calculateMonthlyExpenses(expenses);
  const totalSpent = calculateTotalExpenses(expenses);
  const budgetRemaining = calculateBudgetRemaining(budget.monthlyLimit, monthlySpent);
  const budgetPct = calculateBudgetPercentage(budget.monthlyLimit, monthlySpent);
  const categoryTotals = calculateCategoryTotals(expenses, true);
  const largestExpense = calculateLargestExpense(expenses);

  const topCategory = categoryTotals.length > 0
    ? [...categoryTotals].sort((a, b) => b.amount - a.amount)[0]
    : null;

  // 1. Check for Gemini API key if available
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (apiKey) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [
                  {
                    text: `You are SpendWise AI, a friendly personal finance assistant for university students. 
Address the student as "${firstName}".
Available Data Context:
- Monthly Budget: ${formatRupee(budget.monthlyLimit)}
- Spent This Month: ${formatRupee(monthlySpent)} (${budgetPct}% used)
- Total Spending: ${formatRupee(totalSpent)}
- Top Category: ${topCategory ? `${topCategory.category} (${formatRupee(topCategory.amount)})` : 'None'}
- Days Remaining in Month: ${daysRemaining}
- Daily Budget Allowance: ${formatRupee(Math.max(0, Math.round(budgetRemaining / daysRemaining)))}
- Largest Single Expense: ${largestExpense ? `${largestExpense.title} - ${formatRupee(largestExpense.amount)}` : 'None'}

User Question: "${query}"

Provide a concise, clear, student-friendly answer in markdown with bullet points where appropriate. Do not produce walls of text.`,
                  },
                ],
              },
            ],
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) {
          return {
            id: `ai-${Date.now()}`,
            sender: 'ai',
            text: text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            actions: getContextualActions(qLower, topCategory?.category),
          };
        }
      }
    } catch (e) {
      console.warn('Gemini API call failed, falling back to local agentic engine.', e);
    }
  }

  // 2. Deterministic Local Agentic Engine (Guaranteed fallback)
  // Simulate natural delay for realistic UX
  await new Promise((resolve) => setTimeout(resolve, 350));

  // No expenses edge case
  if (expenses.length === 0) {
    return {
      id: `ai-${Date.now()}`,
      sender: 'ai',
      text: `Hello **${firstName}**! 👋 I don't have enough spending data yet. Add your first few expenses and I'll analyze your budget and give tailored recommendations!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actions: [{ label: '➕ Add Expense', action: 'open_add_expense' }],
    };
  }

  // Intent 1: Highest spending / Where am I spending the most
  if (
    qLower.includes('where am i spending') ||
    qLower.includes('most') ||
    qLower.includes('top category') ||
    qLower.includes('biggest category') ||
    qLower.includes('highest spending')
  ) {
    if (!topCategory) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: `You haven't recorded any expenses for this month yet!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: [{ label: '➕ Add Expense', action: 'open_add_expense' }],
      };
    }

    return {
      id: `ai-${Date.now()}`,
      sender: 'ai',
      text: `**${firstName}**, your highest spending category this month is **${topCategory.category}**.

• Total Spent on ${topCategory.category}: **${formatRupee(topCategory.amount)}**
• Share of Monthly Expenses: **${topCategory.percentage}%**

Would you like to review all your ${topCategory.category} transactions?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actions: [
        { label: `View ${topCategory.category} Expenses`, action: 'filter_category', payload: topCategory.category },
        { label: '📊 View Analytics', action: 'navigate', payload: 'analytics' },
      ],
    };
  }

  // Intent 2: Total spending / How much spent this month
  if (
    qLower.includes('how much') ||
    qLower.includes('this month') ||
    qLower.includes('monthly spend') ||
    qLower.includes('total spend')
  ) {
    const change = calculateMonthlyChange(expenses);
    let trendNote = '';
    if (!change.isPreviousZero) {
      trendNote =
        change.direction === 'up'
          ? `\n\n📈 You have spent **${change.percentageChange}% more** this month compared to last month.`
          : change.direction === 'down'
          ? `\n\n📉 Great job! You spent **${Math.abs(change.percentageChange)}% less** this month than last month.`
          : '';
    }

    return {
      id: `ai-${Date.now()}`,
      sender: 'ai',
      text: `Here is your current monthly spending breakdown, **${firstName}**:

• Monthly Expenses: **${formatRupee(monthlySpent)}**
• Monthly Budget: **${formatRupee(budget.monthlyLimit)}**
• Budget Used: **${budgetPct}%** (${formatRupee(Math.max(0, budgetRemaining))} remaining)${trendNote}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actions: [
        { label: '💳 View All Expenses', action: 'navigate', payload: 'expenses' },
        { label: '🎯 View Budget', action: 'navigate', payload: 'budget' },
      ],
    };
  }

  // Intent 3: Daily spending allowance / How much can I spend per day
  if (
    qLower.includes('per day') ||
    qLower.includes('daily') ||
    qLower.includes('spend each day') ||
    qLower.includes('available daily')
  ) {
    const dailyAllowance = Math.round(budgetRemaining / daysRemaining);
    const avgDaily = calculateAverageDailySpend(expenses);

    if (budgetRemaining <= 0) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: `⚠️ **${firstName}**, you have already used 100% of your monthly budget limit of **${formatRupee(
          budget.monthlyLimit
        )}**!

• Current Monthly Spend: **${formatRupee(monthlySpent)}**
• Over Budget By: **${formatRupee(Math.abs(budgetRemaining))}**

I recommend pausing non-essential spending for the remaining **${daysRemaining} days** of this month.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: [{ label: '⚙️ Adjust Budget', action: 'navigate', payload: 'budget' }],
      };
    }

    return {
      id: `ai-${Date.now()}`,
      sender: 'ai',
      text: `Here is your daily spending guide, **${firstName}**:

• Remaining Budget: **${formatRupee(budgetRemaining)}**
• Days Remaining in Month: **${daysRemaining} days**
• **Recommended Daily Allowance: ${formatRupee(dailyAllowance)} / day**

💡 *Your actual average daily spend so far this month has been **${formatRupee(avgDaily)}/day**.*`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actions: [{ label: '📊 View Analytics', action: 'navigate', payload: 'analytics' }],
    };
  }

  // Intent 4: Budget status / Am I close to budget
  if (
    qLower.includes('budget') ||
    qLower.includes('close to limit') ||
    qLower.includes('over budget') ||
    qLower.includes('remaining')
  ) {
    let statusMsg = '';
    if (budgetPct < 50) {
      statusMsg = '✅ Your spending is well on track!';
    } else if (budgetPct < 75) {
      statusMsg = '🟡 You are halfway through your monthly budget.';
    } else if (budgetPct < 90) {
      statusMsg = '⚠️ Be careful — you are approaching your budget limit.';
    } else if (budgetPct <= 100) {
      statusMsg = '🚨 Warning: You are very close to your budget limit!';
    } else {
      statusMsg = `🔥 You have exceeded your monthly budget by ${formatRupee(Math.abs(budgetRemaining))}!`;
    }

    return {
      id: `ai-${Date.now()}`,
      sender: 'ai',
      text: `**Budget Status Overview:**

${statusMsg}

• Monthly Limit: **${formatRupee(budget.monthlyLimit)}**
• Total Spent: **${formatRupee(monthlySpent)}** (${budgetPct}%)
• Remaining Balance: **${formatRupee(Math.max(0, budgetRemaining))}**`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actions: [{ label: '⚙️ Manage Budget', action: 'navigate', payload: 'budget' }],
    };
  }

  // Intent 5: Largest expense
  if (
    qLower.includes('largest') ||
    qLower.includes('biggest expense') ||
    qLower.includes('highest single')
  ) {
    if (!largestExpense) {
      return {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: `No expenses recorded yet!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
    }

    return {
      id: `ai-${Date.now()}`,
      sender: 'ai',
      text: `Your largest single expense on record is:

📌 **${largestExpense.title}**
• Amount: **${formatRupee(largestExpense.amount)}**
• Category: **${largestExpense.category}**
• Date: **${largestExpense.date}**
• Payment Method: **${largestExpense.paymentMethod}**`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actions: [
        { label: `View ${largestExpense.category}`, action: 'filter_category', payload: largestExpense.category },
      ],
    };
  }

  // Intent 6: Savings tips / How to reduce spending
  if (
    qLower.includes('reduce') ||
    qLower.includes('save') ||
    qLower.includes('cut down') ||
    qLower.includes('ways to save') ||
    qLower.includes('tips')
  ) {
    const highestCat = topCategory ? topCategory.category : 'Food';

    return {
      id: `ai-${Date.now()}`,
      sender: 'ai',
      text: `Here are **3 practical savings tips** tailored for your student routine, **${firstName}**:

1️⃣ **Control ${highestCat} Expenses**: Since ${highestCat} is your largest expense category (${topCategory ? formatRupee(topCategory.amount) : '₹0'}), look for campus meal pass discounts or cook bulk meals.
2️⃣ **Use UPI Sub-limits**: Set a daily UPI transaction alert to avoid impulse online snack and delivery purchases.
3️⃣ **Leverage Student Discounts**: Always ask for student concessions on bus passes, software subscriptions (e.g. Spotify, Notion), and book orders.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actions: [{ label: '🎯 View Saving Goal', action: 'navigate', payload: 'dashboard' }],
    };
  }

  // Intent 7: Full Spending Analysis
  if (qLower.includes('analyze') || qLower.includes('analysis') || qLower.includes('summary')) {
    const avgDaily = calculateAverageDailySpend(expenses);

    return {
      id: `ai-${Date.now()}`,
      sender: 'ai',
      text: `📊 **SpendWise Financial Analysis for ${firstName}:**

• **Total Spent This Month:** ${formatRupee(monthlySpent)}
• **Budget Utilization:** ${budgetPct}% of ${formatRupee(budget.monthlyLimit)}
• **Highest Category:** ${topCategory ? `${topCategory.category} (${formatRupee(topCategory.amount)})` : 'None'}
• **Average Daily Spend:** ${formatRupee(avgDaily)}/day
• **Largest Transaction:** ${largestExpense ? `${largestExpense.title} (${formatRupee(largestExpense.amount)})` : 'None'}

💡 **Key Insight:** ${
        budgetPct > 75
          ? 'Your budget usage is high. Prioritize essential bills and hold off on leisure shopping until next month.'
          : 'Your budget health is good! You are maintaining a healthy spending pace.'
      }`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      actions: [
        { label: '📊 Full Analytics', action: 'navigate', payload: 'analytics' },
        { label: '💳 All Expenses', action: 'navigate', payload: 'expenses' },
      ],
    };
  }

  // Generic fallback
  return {
    id: `ai-${Date.now()}`,
    sender: 'ai',
    text: `I'm **SpendWise AI**, your financial companion. 

You have **${expenses.length} expenses** recorded totaling **${formatRupee(monthlySpent)}** this month out of your **${formatRupee(budget.monthlyLimit)}** budget.

Try asking me:
• *"Where am I spending the most?"*
• *"How much can I spend per day?"*
• *"Give me 3 ways to reduce spending"*`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    actions: [
      { label: '📊 View Analytics', action: 'navigate', payload: 'analytics' },
      { label: '💳 View Expenses', action: 'navigate', payload: 'expenses' },
    ],
  };
};

/**
 * Generate contextual action buttons based on prompt query
 */
const getContextualActions = (query: string, topCat?: string) => {
  if (query.includes('food') || query.includes('category')) {
    return [{ label: `View ${topCat || 'Food'} Expenses`, action: 'filter_category', payload: topCat || 'Food' }];
  }
  if (query.includes('budget')) {
    return [{ label: '🎯 Open Budget', action: 'navigate', payload: 'budget' }];
  }
  return [
    { label: '➕ Add Expense', action: 'open_add_expense' },
    { label: '📊 View Analytics', action: 'navigate', payload: 'analytics' },
  ];
};
