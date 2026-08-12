import React, { useRef, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { exportImportService } from '../../services/exportImportService';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { Download, Upload, RotateCcw, Database, AlertTriangle, FileSpreadsheet } from 'lucide-react';

export const DataManagement: React.FC = () => {
  const {
    profile,
    budget,
    expenses,
    savingGoal,
    loadDemoData,
    resetAllData,
    importDataPayload,
    addToast,
  } = useApp();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [isDemoConfirmOpen, setIsDemoConfirmOpen] = useState(false);
  const [pendingImport, setPendingImport] = useState<any | null>(null);

  const handleExportJSON = () => {
    exportImportService.exportJSON(profile, budget, expenses, savingGoal);
    addToast('Data backup exported as JSON.', 'success');
  };

  const handleExportCSV = () => {
    exportImportService.exportCSV(expenses);
    addToast('Expenses table exported as CSV.', 'success');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        const validation = exportImportService.validateImportPayload(json);
        if (!validation.isValid) {
          addToast(validation.error || 'Invalid data file.', 'error', 'Import Failed');
          return;
        }
        setPendingImport(validation.parsedData);
      } catch {
        addToast('Invalid data file format. Must be JSON.', 'error', 'Import Error');
      }
    };
    reader.readAsText(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center gap-2 mb-2">
        <Database className="w-5 h-5 text-brand-600 dark:text-brand-400" />
        <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
          Data Backup & Storage Management
        </h3>
      </div>

      {/* Export Section */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
        <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
          Export Backup
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Download your complete financial records, budget settings, and saving targets for safe keeping.
        </p>
        <div className="flex flex-wrap gap-3 pt-1">
          <Button variant="outline" size="sm" onClick={handleExportJSON} icon={<Download className="w-4 h-4" />}>
            Export JSON Backup
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportCSV} icon={<FileSpreadsheet className="w-4 h-4" />}>
            Export Expenses CSV
          </Button>
        </div>
      </div>

      {/* Import Section */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
        <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
          Import Data File
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Restore data from a previously saved SpendWise JSON backup file.
        </p>
        <input
          type="file"
          ref={fileInputRef}
          accept=".json"
          onChange={handleFileChange}
          className="hidden"
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          icon={<Upload className="w-4 h-4" />}
        >
          Select JSON File to Import
        </Button>
      </div>

      {/* Demo Mode Loader for Presentations */}
      <div className="p-5 rounded-2xl bg-brand-50/50 dark:bg-slate-800/80 border border-brand-200/60 dark:border-slate-800 shadow-sm space-y-3">
        <h4 className="text-xs font-bold text-brand-900 dark:text-brand-300 uppercase tracking-wider">
          🎓 Presentation Demo Mode
        </h4>
        <p className="text-xs text-slate-600 dark:text-slate-300">
          Load realistic student expense data (canteen, textbooks, transport, phone recharge) to showcase the application during college presentations.
        </p>
        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsDemoConfirmOpen(true)}
          icon={<Database className="w-4 h-4" />}
        >
          Load Presentation Sample Data
        </Button>
      </div>

      {/* Danger Zone: Reset Application Data */}
      <div className="p-5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 shadow-sm space-y-3">
        <h4 className="text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider">
          Reset Application Data
        </h4>
        <p className="text-xs text-slate-600 dark:text-slate-300">
          Permanently erase all expenses, budget limits, saving goals, and profile information.
        </p>
        <Button
          variant="danger"
          size="sm"
          onClick={() => setIsResetConfirmOpen(true)}
          icon={<RotateCcw className="w-4 h-4" />}
        >
          Reset Application Data
        </Button>
      </div>

      {/* Confirmation Modal for Import Overwrite */}
      {pendingImport && (
        <Modal isOpen={true} onClose={() => setPendingImport(null)} maxWidth="sm">
          <div className="text-center py-2">
            <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
              Overwrite Existing Data?
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Importing this backup file will replace your current expenses ({expenses.length} items) and budget settings.
            </p>
            <div className="flex gap-2 justify-center">
              <Button variant="outline" size="sm" onClick={() => setPendingImport(null)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  importDataPayload(pendingImport);
                  setPendingImport(null);
                }}
              >
                Confirm Import
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Confirmation Modal for Demo Data */}
      <Modal isOpen={isDemoConfirmOpen} onClose={() => setIsDemoConfirmOpen(false)} maxWidth="sm">
        <div className="text-center py-2">
          <Database className="w-8 h-8 text-brand-500 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
            Load Sample Student Data?
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            This will populate SpendWise with 12+ realistic student expenses in Indian Rupees.
          </p>
          <div className="flex gap-2 justify-center">
            <Button variant="outline" size="sm" onClick={() => setIsDemoConfirmOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setIsDemoConfirmOpen(false);
                loadDemoData();
              }}
            >
              Load Demo Data
            </Button>
          </div>
        </div>
      </Modal>

      {/* Confirmation Modal for Factory Reset */}
      <Modal isOpen={isResetConfirmOpen} onClose={() => setIsResetConfirmOpen(false)} maxWidth="sm">
        <div className="text-center py-2">
          <AlertTriangle className="w-8 h-8 text-rose-500 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
            Reset Application Data?
          </h3>
          <p className="text-xs text-slate-500 mb-4">
            This action cannot be undone. All recorded expenses, budget limits, profile information, and savings goals will be deleted.
          </p>
          <div className="flex gap-2 justify-center">
            <Button variant="outline" size="sm" onClick={() => setIsResetConfirmOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => {
                setIsResetConfirmOpen(false);
                resetAllData();
              }}
            >
              Reset Everything
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
