import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
import { validateGmail, validateName } from '../../utils/validators';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Wallet, Sun, Moon, CheckCircle2, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';

export const OnboardingModal: React.FC = () => {
  const { profile, saveProfile } = useApp();
  const { theme, setTheme } = useTheme();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedTheme, setSelectedTheme] = useState<'light' | 'dark'>(theme);

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If user is already onboarded, hide modal
  if (profile && profile.isOnboarded) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nameValidation = validateName(name);
    const emailValidation = validateGmail(email);

    setNameError(nameValidation.error || '');
    setEmailError(emailValidation.error || '');

    if (!nameValidation.isValid || !emailValidation.isValid) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setTheme(selectedTheme);
      saveProfile({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        theme: selectedTheme,
        isOnboarded: true,
        createdAt: new Date().toISOString(),
      });
      setIsSubmitting(false);
    }, 400);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col md:flex-row animate-scaleUp">
        {/* Left Side: SpendWise Branding & Presentation (Desktop Split) */}
        <div className="md:w-5/12 bg-gradient-to-br from-brand-600 via-brand-700 to-slate-900 p-8 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-brand-400/20 rounded-full blur-3xl pointer-events-none" />

          <div>
            {/* Logo */}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                <Wallet className="w-7 h-7 text-emerald-300" />
              </div>
              <div>
                <h1 className="text-xl font-extrabold tracking-tight">SpendWise</h1>
                <p className="text-[11px] text-brand-200 font-medium">Student Expense Tracker</p>
              </div>
            </div>

            <h2 className="text-2xl font-bold leading-tight mb-3">
              Wise Spending for Smart Students
            </h2>
            <p className="text-xs text-brand-100/90 leading-relaxed mb-6">
              Take complete control of your college finances, set monthly budgets, track daily spendings, and get AI-powered financial advice.
            </p>
          </div>

          {/* Benefits Bullet Points */}
          <div className="space-y-3.5 my-4">
            <div className="flex items-center gap-3 text-xs text-brand-100">
              <div className="p-1.5 bg-white/10 rounded-lg text-emerald-300">
                <TrendingUp className="w-4 h-4" />
              </div>
              <span>Real-time budget warnings & analytics</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-brand-100">
              <div className="p-1.5 bg-white/10 rounded-lg text-emerald-300">
                <Sparkles className="w-4 h-4" />
              </div>
              <span>Integrated SpendWise AI assistant</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-brand-100">
              <div className="p-1.5 bg-white/10 rounded-lg text-emerald-300">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span>100% Private local offline storage</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 text-[10px] text-brand-200/70">
            SpendWise College Project Edition
          </div>
        </div>

        {/* Right Side: Setup Profile Form */}
        <div className="md:w-7/12 p-6 sm:p-8 flex flex-col justify-center">
          <div className="mb-6">
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">
              Welcome to SpendWise
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Your simple personal finance companion for student life. Set up your profile to start.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Full Name Field */}
            <Input
              label="Full Name *"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (nameError) setNameError('');
              }}
              error={nameError}
              required
            />

            {/* Gmail Address Field */}
            <Input
              label="Gmail Address *"
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) setEmailError('');
              }}
              error={emailError}
              helperText="Must be a valid @gmail.com address"
              required
            />

            {/* Theme Selection & Live Preview */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
                Preferred Theme
              </label>

              <div className="grid grid-cols-2 gap-3">
                {/* Light Theme Card */}
                <button
                  type="button"
                  onClick={() => setSelectedTheme('light')}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border-2 transition-all ${
                    selectedTheme === 'light'
                      ? 'border-brand-600 bg-brand-50/50 text-brand-900 dark:bg-slate-800'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-amber-100 text-amber-600 rounded-xl">
                      <Sun className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-bold">Light Theme</div>
                      <div className="text-[10px] opacity-70">Clean & bright</div>
                    </div>
                  </div>
                  {selectedTheme === 'light' && <CheckCircle2 className="w-4 h-4 text-brand-600" />}
                </button>

                {/* Dark Theme Card */}
                <button
                  type="button"
                  onClick={() => setSelectedTheme('dark')}
                  className={`flex items-center justify-between p-3.5 rounded-2xl border-2 transition-all ${
                    selectedTheme === 'dark'
                      ? 'border-brand-500 bg-slate-800 text-slate-100'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 bg-indigo-950 text-indigo-300 rounded-xl">
                      <Moon className="w-4 h-4" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-bold">Dark Theme</div>
                      <div className="text-[10px] opacity-70">Sleek & modern</div>
                    </div>
                  </div>
                  {selectedTheme === 'dark' && <CheckCircle2 className="w-4 h-4 text-brand-400" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                isLoading={isSubmitting}
              >
                Continue to SpendWise →
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
