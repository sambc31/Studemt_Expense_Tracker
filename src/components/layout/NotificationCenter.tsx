import React from 'react';
import { useApp } from '../../context/AppContext';
import { Bell, AlertTriangle, AlertCircle, Sparkles } from 'lucide-react';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose }) => {
  const { notifications, markNotificationRead } = useApp();

  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-50 p-4 animate-scaleUp">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-brand-600 dark:text-brand-400" />
          <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
            Notifications
          </h4>
          {unreadCount > 0 && (
            <span className="px-1.5 py-0.5 text-[10px] font-extrabold bg-rose-500 text-white rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
        >
          Close
        </button>
      </div>

      <div className="max-h-72 overflow-y-auto py-2 space-y-2">
        {notifications.length === 0 ? (
          <div className="text-center py-6 text-xs text-slate-400">
            No notifications yet
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => markNotificationRead(n.id)}
              className={`p-3 rounded-xl border text-xs cursor-pointer transition-colors ${
                n.read
                  ? 'bg-slate-50/50 dark:bg-slate-800/40 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  : 'bg-brand-50/40 dark:bg-slate-800 border-brand-200/50 dark:border-slate-700 text-slate-900 dark:text-slate-100'
              }`}
            >
              <div className="flex items-start gap-2.5">
                {n.type === 'budget_exceeded' ? (
                  <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                ) : n.type === 'budget_warning' ? (
                  <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                ) : (
                  <Sparkles className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[11px]">{n.title}</span>
                    <span className="text-[10px] opacity-60">{n.date}</span>
                  </div>
                  <p className="mt-1 leading-relaxed text-[11px] opacity-90">{n.message}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
