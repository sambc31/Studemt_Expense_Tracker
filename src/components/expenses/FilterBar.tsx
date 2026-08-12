import React from 'react';
import { useApp } from '../../context/AppContext';
import { ALL_CATEGORIES } from '../../services/calculationService';
import { ExpenseCategory, PaymentMethod } from '../../types';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import { Search, FilterX } from 'lucide-react';

interface FilterBarProps {
  totalResultsCount: number;
}

const categoryOptions = [
  { value: 'All', label: 'All Categories' },
  ...ALL_CATEGORIES.map((c) => ({ value: c, label: c })),
];

const paymentOptions = [
  { value: 'All', label: 'All Payment Methods' },
  { value: 'UPI', label: 'UPI' },
  { value: 'Cash', label: 'Cash' },
  { value: 'Debit Card', label: 'Debit Card' },
  { value: 'Credit Card', label: 'Credit Card' },
  { value: 'Bank Transfer', label: 'Bank Transfer' },
  { value: 'Other', label: 'Other' },
];

const dateRangeOptions = [
  { value: 'all', label: 'All Dates' },
  { value: '7d', label: 'Last 7 Days' },
  { value: '30d', label: 'Last 30 Days' },
  { value: '90d', label: 'Last 90 Days' },
  { value: 'this_month', label: 'This Month' },
  { value: 'last_month', label: 'Last Month' },
];

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'highest', label: 'Highest Amount' },
  { value: 'lowest', label: 'Lowest Amount' },
];

export const FilterBar: React.FC<FilterBarProps> = ({ totalResultsCount }) => {
  const { filters, setFilters, resetFilters } = useApp();

  const isFiltered =
    filters.searchQuery !== '' ||
    filters.category !== 'All' ||
    filters.paymentMethod !== 'All' ||
    filters.dateRange !== 'all' ||
    filters.sortBy !== 'newest';

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 shadow-sm space-y-4 mb-6">
      {/* Top row: Search Bar & Count */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex-1">
          <Input
            placeholder="Search expenses by title, category, note, UPI..."
            value={filters.searchQuery}
            onChange={(e) => setFilters((prev) => ({ ...prev, searchQuery: e.target.value }))}
            leftIcon={<Search className="w-4 h-4 text-slate-400" />}
          />
        </div>
        <div className="flex items-center justify-between sm:justify-end gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400 shrink-0">
          <span>
            {totalResultsCount} {totalResultsCount === 1 ? 'expense' : 'expenses'} found
          </span>
          {isFiltered && (
            <Button variant="ghost" size="sm" onClick={resetFilters} icon={<FilterX className="w-3.5 h-3.5" />}>
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      {/* Bottom row: Multi Filter Dropdowns */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800/80">
        <Select
          options={categoryOptions}
          value={filters.category}
          onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value as ExpenseCategory | 'All' }))}
        />

        <Select
          options={paymentOptions}
          value={filters.paymentMethod}
          onChange={(e) => setFilters((prev) => ({ ...prev, paymentMethod: e.target.value as PaymentMethod | 'All' }))}
        />

        <Select
          options={dateRangeOptions}
          value={filters.dateRange}
          onChange={(e) => setFilters((prev) => ({ ...prev, dateRange: e.target.value as any }))}
        />

        <Select
          options={sortOptions}
          value={filters.sortBy}
          onChange={(e) => setFilters((prev) => ({ ...prev, sortBy: e.target.value as any }))}
        />
      </div>
    </div>
  );
};
