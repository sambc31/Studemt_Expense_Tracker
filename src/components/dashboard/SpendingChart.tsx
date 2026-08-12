import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../common/Card';
import { EmptyState } from '../common/EmptyState';
import { getDailyChartData } from '../../services/calculationService';
import { formatRupee } from '../../utils/formatters';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  CartesianGrid,
} from 'recharts';
import { TrendingUp } from 'lucide-react';

export const SpendingChart: React.FC = () => {
  const { expenses, openAddExpenseModal } = useApp();
  const [timeframe, setTimeframe] = useState<7 | 30 | 90>(7);

  const chartData = getDailyChartData(expenses, timeframe);
  const totalInPeriod = chartData.reduce((sum, item) => sum + item.amount, 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs border border-slate-800">
          <p className="font-semibold text-slate-300">{data.formattedDate}</p>
          <p className="text-sm font-extrabold text-brand-400 mt-1">
            {formatRupee(data.amount)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-brand-600 dark:text-brand-400" />
            <span>Spending Overview</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Total in period: <span className="font-bold text-slate-800 dark:text-slate-200">{formatRupee(totalInPeriod)}</span>
          </p>
        </div>

        {/* Timeframe selector */}
        <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold self-start sm:self-auto">
          <button
            onClick={() => setTimeframe(7)}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              timeframe === 7
                ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            7 Days
          </button>
          <button
            onClick={() => setTimeframe(30)}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              timeframe === 30
                ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            30 Days
          </button>
          <button
            onClick={() => setTimeframe(90)}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              timeframe === 90
                ? 'bg-white dark:bg-slate-700 text-brand-600 dark:text-brand-300 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            90 Days
          </button>
        </div>
      </div>

      {expenses.length === 0 ? (
        <EmptyState
          type="no_expenses"
          title="No spending data yet."
          description="Add your first expense to unlock interactive spending trend charts."
          actionLabel="➕ Add your first expense"
          onAction={() => openAddExpenseModal()}
        />
      ) : (
        <div className="h-64 sm:h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="spendingGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.15} />
              <XAxis
                dataKey="formattedDate"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: '#94a3b8' }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 11, fill: '#94a3b8' }}
                tickFormatter={(value) => `₹${value}`}
              />
              <RechartsTooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#10b981"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#spendingGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
};
