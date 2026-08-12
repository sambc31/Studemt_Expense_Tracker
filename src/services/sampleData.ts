import { Expense, SavingGoal } from '../types';

export const getSampleExpenses = (): Expense[] => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-indexed current month
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;

  // Helper date formatter YYYY-MM-DD
  const formatDateStr = (y: number, m: number, d: number) => {
    const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
    return `${y}-${pad(m + 1)}-${pad(d)}`;
  };

  return [
    {
      id: 'sample-1',
      title: 'College Cafeteria Lunch',
      amount: 120,
      category: 'Food',
      date: formatDateStr(year, month, Math.max(1, now.getDate() - 1)),
      paymentMethod: 'UPI',
      note: 'Thali & Fresh Juice',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'sample-2',
      title: 'Monthly Bus Pass',
      amount: 650,
      category: 'Transport',
      date: formatDateStr(year, month, Math.max(1, now.getDate() - 3)),
      paymentMethod: 'UPI',
      note: 'Student Concession Pass',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'sample-3',
      title: 'Python Data Science Course',
      amount: 1499,
      category: 'Education',
      date: formatDateStr(year, month, Math.max(1, now.getDate() - 5)),
      paymentMethod: 'Debit Card',
      note: 'Udemy Online Certification',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'sample-4',
      title: 'Stationery & Project Notebooks',
      amount: 320,
      category: 'Education',
      date: formatDateStr(year, month, Math.max(1, now.getDate() - 7)),
      paymentMethod: 'Cash',
      note: 'Graph books & Gel pens',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'sample-5',
      title: 'Movie Night with Friends',
      amount: 450,
      category: 'Entertainment',
      date: formatDateStr(year, month, Math.max(1, now.getDate() - 9)),
      paymentMethod: 'UPI',
      note: 'PVR Ticket + Popcorn',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'sample-6',
      title: 'Mobile Phone Unlimited Plan',
      amount: 299,
      category: 'Bills',
      date: formatDateStr(year, month, Math.max(1, now.getDate() - 10)),
      paymentMethod: 'UPI',
      note: 'Jio 28-day 2GB/day recharge',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'sample-7',
      title: 'Engineering Reference Textbook',
      amount: 850,
      category: 'Education',
      date: formatDateStr(year, month, Math.max(1, now.getDate() - 12)),
      paymentMethod: 'Credit Card',
      note: 'Computer Architecture 5th Ed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'sample-8',
      title: 'Campus Cafe Coffee & Snacks',
      amount: 180,
      category: 'Food',
      date: formatDateStr(year, month, Math.max(1, now.getDate() - 14)),
      paymentMethod: 'UPI',
      note: 'Group study session snack',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'sample-9',
      title: 'Hostel Electricity & Maintenance',
      amount: 1200,
      category: 'Bills',
      date: formatDateStr(year, month, Math.max(1, now.getDate() - 15)),
      paymentMethod: 'Bank Transfer',
      note: 'Monthly hostel bill share',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'sample-10',
      title: 'Pharmacy & Cold Medicine',
      amount: 240,
      category: 'Health',
      date: formatDateStr(year, month, Math.max(1, now.getDate() - 18)),
      paymentMethod: 'Cash',
      note: 'Vitamins and Paracetamol',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'sample-11',
      title: 'Casual Hoodie & Sneakers',
      amount: 2100,
      category: 'Shopping',
      date: formatDateStr(year, month, Math.max(1, now.getDate() - 20)),
      paymentMethod: 'UPI',
      note: 'College winter apparel',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'sample-12',
      title: 'Grocery Supplies for Room',
      amount: 950,
      category: 'Food',
      date: formatDateStr(year, month, Math.max(1, now.getDate() - 22)),
      paymentMethod: 'UPI',
      note: 'Oats, Milk, Fruits & Rice',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    // Previous Month Sample Data for Comparison
    {
      id: 'sample-prev-1',
      title: 'Previous Month Canteen Expenses',
      amount: 1450,
      category: 'Food',
      date: formatDateStr(prevYear, prevMonth, 15),
      paymentMethod: 'UPI',
      note: 'Total canteen spend last month',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: 'sample-prev-2',
      title: 'Previous Month Metro & Cab',
      amount: 980,
      category: 'Transport',
      date: formatDateStr(prevYear, prevMonth, 20),
      paymentMethod: 'UPI',
      note: 'Travel expenses last month',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];
};

export const getSampleSavingGoal = (): SavingGoal => {
  const target = new Date();
  target.setMonth(target.getMonth() + 4);

  return {
    id: 'goal-sample-1',
    name: 'New College Laptop',
    targetAmount: 45000,
    currentAmount: 18500,
    targetDate: target.toISOString().split('T')[0],
    createdAt: new Date().toISOString(),
  };
};
