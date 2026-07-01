'use client';

import { useState } from 'react';
import { PricingConfig } from '@/lib/types';

interface Props {
  config: PricingConfig;
  onChange: (config: PricingConfig) => void;
}

export default function PricingEditor({ config, onChange }: Props) {
  const [activeTab, setActiveTab] = useState<
    'packages' | 'alaCarte' | 'aiEditing' | 'sqftAdjustments' | 'general'
  >('packages');

  const tabs = [
    { id: 'packages', label: 'Packages', icon: '📦' },
    { id: 'alaCarte', label: 'À La Carte Services', icon: '🎯' },
    { id: 'aiEditing', label: 'AI Editing Add-ons', icon: '✨' },
    { id: 'sqftAdjustments', label: 'Sq Ft Adjustments', icon: '📐' },
    { id: 'general', label: 'General Settings', icon: '⚙️' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-slate-200 bg-slate-50 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-4 font-semibold text-sm whitespace-nowrap transition-colors border-b-2 ${
              activeTab === tab.id
                ? 'border-yellow-400 text-slate-900 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-8">
        {activeTab === 'packages' && (
          <PackagesEditor config={config} onChange={onChange} />
        )}
        {activeTab === 'alaCarte' && (
          <ALACarteEditor config={config} onChange={onChange} />
        )}
        {activeTab === 'aiEditing' && (
          <AIEditingEditor config={config} onChange={onChange} />
        )}
        {activeTab === 'sqftAdjustments' && (
          <SqftAdjustmentsEditor config={config} onChange={onChange} />
        )}
        {activeTab === 'general' && (
          <GeneralSettingsEditor config={config} onChange={onChange} />
        )}
      </div>
    </div>
  );
}

function PackagesEditor({
  config,
  onChange,
}: {
  config: PricingConfig;
  onChange: (config: PricingConfig) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          Edit package names, prices, and descriptions. Packages are the main service bundles offered to clients.
        </p>
      </div>

      <div className="space-y-6">
        {Object.entries(config.packages).map(([packageId, pkg]) => (
          <div key={packageId} className="border border-slate-200 rounded-lg p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Package Name</label>
                <input
                  type="text"
                  value={pkg.name}
                  onChange={(e) => {
                    const updated = { ...config };
                    updated.packages[packageId].name = e.target.value;
                    onChange(updated);
                  }}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">Base Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-slate-500">$</span>
                  <input
                    type="number"
                    value={pkg.basePrice}
                    onChange={(e) => {
                      const updated = { ...config };
                      updated.packages[packageId].basePrice = parseFloat(e.target.value) || 0;
                      onChange(updated);
                    }}
                    className="w-full pl-7 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Description</label>
              <input
                type="text"
                value={pkg.description}
                onChange={(e) => {
                  const updated = { ...config };
                  updated.packages[packageId].description = e.target.value;
                  onChange(updated);
                }}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ALACarteEditor({
  config,
  onChange,
}: {
  config: PricingConfig;
  onChange: (config: PricingConfig) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          Configure individual services that clients can add on top of packages.
        </p>
      </div>

      <div className="space-y-4">
        {Object.entries(config.alaCarte).map(([serviceId, service]) => (
          <div key={serviceId} className="border border-slate-200 rounded-lg p-4 flex items-center gap-4">
            <input
              type="text"
              value={service.name}
              onChange={(e) => {
                const updated = { ...config };
                updated.alaCarte[serviceId].name = e.target.value;
                onChange(updated);
              }}
              placeholder="Service name"
              className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none text-sm"
            />

            <div className="relative w-24">
              <span className="absolute left-3 top-2 text-slate-500 text-sm">$</span>
              <input
                type="number"
                value={service.price}
                onChange={(e) => {
                  const updated = { ...config };
                  updated.alaCarte[serviceId].price = parseFloat(e.target.value) || 0;
                  onChange(updated);
                }}
                className="w-full pl-7 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none text-sm"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AIEditingEditor({
  config,
  onChange,
}: {
  config: PricingConfig;
  onChange: (config: PricingConfig) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          Configure AI editing add-ons. Some may have per-image pricing, others may be flat fees.
        </p>
      </div>

      <div className="space-y-4">
        {Object.entries(config.aiEditing).map(([addonId, addon]) => (
          <div key={addonId} className="border border-slate-200 rounded-lg p-4 space-y-3">
            <input
              type="text"
              value={addon.name}
              onChange={(e) => {
                const updated = { ...config };
                updated.aiEditing[addonId].name = e.target.value;
                onChange(updated);
              }}
              placeholder="Add-on name"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none text-sm"
            />

            <div className="grid grid-cols-2 gap-3">
              {addon.flatFee ? (
                <div className="relative">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Flat Fee</label>
                  <span className="absolute left-3 top-8 text-slate-500">$</span>
                  <input
                    type="number"
                    value={addon.flatFee}
                    onChange={(e) => {
                      const updated = { ...config };
                      updated.aiEditing[addonId].flatFee = parseFloat(e.target.value) || 0;
                      onChange(updated);
                    }}
                    className="w-full pl-7 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none text-sm"
                  />
                </div>
              ) : (
                <>
                  <div className="relative">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Price Per Unit</label>
                    <span className="absolute left-3 top-8 text-slate-500">$</span>
                    <input
                      type="number"
                      value={addon.pricePerUnit}
                      onChange={(e) => {
                        const updated = { ...config };
                        updated.aiEditing[addonId].pricePerUnit = parseFloat(e.target.value) || 0;
                        onChange(updated);
                      }}
                      className="w-full pl-7 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Unit</label>
                    <input
                      type="text"
                      value={addon.unit || 'per image'}
                      onChange={(e) => {
                        const updated = { ...config };
                        updated.aiEditing[addonId].unit = e.target.value;
                        onChange(updated);
                      }}
                      placeholder="e.g., per image"
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none text-sm"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SqftAdjustmentsEditor({
  config,
  onChange,
}: {
  config: PricingConfig;
  onChange: (config: PricingConfig) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          Define pricing adjustments based on property square footage.
        </p>
      </div>

      <div className="space-y-4">
        {config.sqftAdjustments.map((adjustment, idx) => (
          <div key={idx} className="border border-slate-200 rounded-lg p-4 flex items-center gap-4">
            <div className="flex-1">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Range</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  value={adjustment.min}
                  onChange={(e) => {
                    const updated = { ...config };
                    updated.sqftAdjustments[idx].min = parseFloat(e.target.value) || 0;
                    onChange(updated);
                  }}
                  placeholder="Min"
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none text-sm"
                />
                <span className="text-slate-500">to</span>
                <input
                  type="number"
                  value={adjustment.max === Infinity ? 99999 : adjustment.max}
                  onChange={(e) => {
                    const updated = { ...config };
                    const value = parseFloat(e.target.value) || 0;
                    updated.sqftAdjustments[idx].max = value > 6000 ? Infinity : value;
                    onChange(updated);
                  }}
                  placeholder="Max"
                  className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none text-sm"
                />
              </div>
            </div>

            <div className="relative w-24">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Adjustment</label>
              <span className="absolute left-3 top-8 text-slate-500">+$</span>
              <input
                type="number"
                value={adjustment.adjustment}
                onChange={(e) => {
                  const updated = { ...config };
                  updated.sqftAdjustments[idx].adjustment = parseFloat(e.target.value) || 0;
                  onChange(updated);
                }}
                className="w-full pl-7 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none text-sm"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GeneralSettingsEditor({
  config,
  onChange,
}: {
  config: PricingConfig;
  onChange: (config: PricingConfig) => void;
}) {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-800">
          Configure general settings like rush delivery fee, tax rate, and default messages.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">Rush Delivery Fee</label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-slate-500">$</span>
            <input
              type="number"
              value={config.rushDeliveryFee}
              onChange={(e) => {
                const updated = { ...config };
                updated.rushDeliveryFee = parseFloat(e.target.value) || 0;
                onChange(updated);
              }}
              className="w-full pl-7 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">Default Travel Fee</label>
          <div className="relative">
            <span className="absolute left-3 top-2 text-slate-500">$</span>
            <input
              type="number"
              value={config.travelFeeDefault}
              onChange={(e) => {
                const updated = { ...config };
                updated.travelFeeDefault = parseFloat(e.target.value) || 0;
                onChange(updated);
              }}
              className="w-full pl-7 pr-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">Sales Tax Rate (%)</label>
          <input
            type="number"
            step="0.01"
            value={config.taxRate}
            onChange={(e) => {
              const updated = { ...config };
              updated.taxRate = parseFloat(e.target.value) || 0;
              onChange(updated);
            }}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-900 mb-2">Default Quote Disclaimer</label>
        <textarea
          value={config.defaultQuoteDisclaimer}
          onChange={(e) => {
            const updated = { ...config };
            updated.defaultQuoteDisclaimer = e.target.value;
            onChange(updated);
          }}
          rows={3}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-900 mb-2">Default Client-Facing Notes</label>
        <textarea
          value={config.defaultClientNotes}
          onChange={(e) => {
            const updated = { ...config };
            updated.defaultClientNotes = e.target.value;
            onChange(updated);
          }}
          rows={3}
          placeholder="Leave blank if not needed"
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
        />
      </div>
    </div>
  );
}
