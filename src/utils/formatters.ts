/**
 * Format a number into Indian Rupee currency format (e.g. ₹12,450)
 */
export const formatRupee = (amount: number, showDecimals: boolean = false): string => {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '₹0';
  }

  const rounded = showDecimals ? amount : Math.round(amount);

  try {
    const formatted = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: showDecimals ? 2 : 0,
      minimumFractionDigits: showDecimals ? 2 : 0,
    }).format(rounded);

    return formatted;
  } catch {
    return `₹${rounded.toLocaleString('en-IN')}`;
  }
};

/**
 * Format ISO date string into readable format (e.g., 12 Aug 2026)
 */
export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    return new Intl.DateTimeFormat('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  } catch {
    return dateString;
  }
};

/**
 * Format percentage change (e.g., +12% or -8%)
 */
export const formatPercentage = (value: number): string => {
  if (isNaN(value) || !isFinite(value)) return '0%';
  const sign = value > 0 ? '↑ ' : value < 0 ? '↓ ' : '';
  const absValue = Math.abs(value).toFixed(1);
  // Remove trailing .0 if integer
  const cleanVal = absValue.endsWith('.0') ? Math.abs(value).toFixed(0) : absValue;
  return `${sign}${cleanVal}%`;
};

/**
 * Extract user initials from name (e.g. "Sam Branham" -> "SB")
 */
export const getInitials = (name: string): string => {
  if (!name || typeof name !== 'string') return 'SW';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

/**
 * Dynamic greeting based on current local time
 */
export const getTimeBasedGreeting = (name: string): { greeting: string; icon: string } => {
  const hour = new Date().getHours();
  const firstName = name ? name.trim().split(/\s+/)[0] : 'Student';

  if (hour >= 5 && hour < 12) {
    return { greeting: `Good morning, ${firstName}`, icon: '☀️' };
  } else if (hour >= 12 && hour < 17) {
    return { greeting: `Good afternoon, ${firstName}`, icon: '👋' };
  } else if (hour >= 17 && hour < 22) {
    return { greeting: `Good evening, ${firstName}`, icon: '🌙' };
  } else {
    return { greeting: `Good night, ${firstName}`, icon: '✨' };
  }
};
