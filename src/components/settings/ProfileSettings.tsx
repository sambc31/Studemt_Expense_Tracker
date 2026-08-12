import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { validateGmail, validateName } from '../../utils/validators';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { User, CheckCircle2 } from 'lucide-react';

export const ProfileSettings: React.FC = () => {
  const { profile, saveProfile } = useApp();

  const [name, setName] = useState(profile?.name || '');
  const [email, setEmail] = useState(profile?.email || '');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nameValidation = validateName(name);
    const emailValidation = validateGmail(email);

    setNameError(nameValidation.error || '');
    setEmailError(emailValidation.error || '');

    if (!nameValidation.isValid || !emailValidation.isValid) {
      return;
    }

    saveProfile({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      theme: profile?.theme || 'light',
      isOnboarded: true,
      createdAt: profile?.createdAt || new Date().toISOString(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg" noValidate>
      <div className="flex items-center gap-2 mb-2">
        <User className="w-5 h-5 text-brand-600 dark:text-brand-400" />
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
          Personal Profile
        </h3>
      </div>

      <Input
        label="Full Name *"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          if (nameError) setNameError('');
        }}
        error={nameError}
        required
      />

      <Input
        label="Gmail Address *"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (emailError) setEmailError('');
        }}
        error={emailError}
        helperText="Must end with @gmail.com"
        required
      />

      <div className="pt-2">
        <Button type="submit" variant="primary" icon={<CheckCircle2 className="w-4 h-4" />}>
          Save Profile Changes
        </Button>
      </div>
    </form>
  );
};
