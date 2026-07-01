'use client';

import { useEffect, useState } from 'react';
import { PricingConfig } from '@/lib/types';
import { getPricingConfig, savePricingConfig, resetPricingConfig } from '@/lib/utils/storage';
import { defaultPricingConfig } from '@/lib/pricing/config';
import PricingEditor from '@/components/admin/PricingEditor';

export default function PricingSettingsPage() {
  const [pricingConfig, setPricingConfig] = useState<PricingConfig>(defaultPricingConfig);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const loaded = getPricingConfig();
    setPricingConfig(loaded);
    setIsLoading(false);
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    savePricingConfig(pricingConfig);
    setHasChanges(false);
    setIsSaving(false);
    alert('Pricing configuration saved successfully!');
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset to default pricing? This cannot be undone.')) {
      resetPricingConfig();
      setPricingConfig(defaultPricingConfig);
      setHasChanges(false);
    }
  };

  const handleConfigChange = (newConfig: PricingConfig) => {
    setPricingConfig(newConfig);
    setHasChanges(true);
  };

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-8 border border-slate-200">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Pricing Settings</h1>
        <p className="text-slate-600">
          Configure all pricing for packages, services, and add-ons. Changes are saved to local storage
          and can later be connected to a database.
        </p>
      </div>

      {/* Alert */}
      {hasChanges && (
        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4">
          <p className="text-amber-800 font-semibold">
            You have unsaved changes. Click "Save Settings" to apply them.
          </p>
        </div>
      )}

      {/* Pricing Editor */}
      <PricingEditor config={pricingConfig} onChange={handleConfigChange} />

      {/* Actions */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 flex gap-3">
        <button
          onClick={handleSave}
          disabled={isSaving || !hasChanges}
          className="flex-1 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white font-bold py-3 px-4 rounded-lg transition-colors"
        >
          {isSaving ? 'Saving...' : 'Save Settings'}
        </button>
        <button
          onClick={handleReset}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
        >
          Reset to Defaults
        </button>
      </div>
    </div>
  );
}
