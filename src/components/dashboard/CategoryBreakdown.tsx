import React from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../common/Card';
import { CategoryBadge, categoryColors } from '../common/Badge';
import { calculateCategoryTotals } from '../../services/calculationService';
import { formatRupee } from '../../utils/formatters';
import { ResponsiveContainer, PieChart as RePieChart, Pie, Cell, Tooltip as ReTooltip } from 'recharts';
import { PieChartIcon } from 'lucide-react';

const CHART_COLORS = [
  '#f59e0b', // Food - Amber
  '#3b82f6', // Transport - Blue
  '#a855f7', // Education - Purple
  '#ec4899', // Shopping - Pink
  '#6366f1', // Entertainment - Indigo
  '#f43f5e', // Bills - Rose
  '#10b981', // Health - Emerald
  '#64748b', // Other - Slate
];

export const CategoryBreakdown: React.FC = () => {
  const { expenses, filterByCategoryNav } = useApp();

  const categoryTotals = calculateCategoryTotals(expenses, true);
  const totalAmount = categoryTotals.reduce((sum, c) => sum + c.amount, 0);

  const chartData = categoryTotals
    .filter((c) => c.amount > 0)
    .map((c) => ({
      name: c.category,
      value: c.amount,
      percentage: c.percentage,
    }));

  return (
    <Card className="h-full flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <PieChartIcon className="w-5 h-5 text-brand-600 dark:text-brand-400" />
            <span>Where Your Money Goes</span>
          </h3>
          <span className="text-[11px] font-semibold text-slate-400">This Month</span>
        </div>

        {chartData.length === 0 ? (
          <div className="text-center py-10 text-xs text-slate-400">
            No monthly expense data yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center my-2">
            {/* Donut Chart */}
            <div className="h-48 w-full relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {chartData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <ReTooltip
                    formatter={(val: number) => formatRupee(val)}
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '12px',
                    }}
                  />
                </RePieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Total</span>
                <span className="text-xs font-extrabold text-slate-900 dark:text-slate-100">{formatRupee(totalAmount)}</span>
              </div>
            </div>

            {/* Category List Legend */}
            <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
              {categoryTotals.map((item) => (
                <div
                  key={item.category}
                  onClick={() => filterByCategoryNav(item.category)}
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors text-xs"
                >
                  <div className="flex items-center gap-2">
                    <CategoryBadge category={item.category} />
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-slate-900 dark:text-slate-100">
                      {formatRupee(item.amount)}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                      {item.percentage}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
