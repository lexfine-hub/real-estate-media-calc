'use client';

import { useState } from 'react';
import { QuoteRequest, PricingConfig, QuoteStatus } from '@/lib/types';
import { calculateQuoteSummary, getRecommendedPackage, getSquareFootageAdjustment } from '@/lib/utils/calculations';
import { formatCurrency } from '@/lib/utils/format';

interface Props {
  quote: QuoteRequest;
  pricingConfig: PricingConfig;
  onUpdateQuote: (updates: Partial<QuoteRequest>) => void;
  onSave: () => void;
  isSaving: boolean;
}

export default function QuoteCalculator({
  quote,
  pricingConfig,
  onUpdateQuote,
  onSave,
  isSaving,
}: Props) {
  const summary = calculateQuoteSummary(quote, pricingConfig);
  const recommendation = getRecommendedPackage(quote);
  const sqftAdjustment = getSquareFootageAdjustment(quote.propertyInfo.squareFootage, pricingConfig);

  const [showBreakdown, setShowBreakdown] = useState(true);

  const handleStatusChange = (status: QuoteStatus) => {
    onUpdateQuote({ status });
  };

  const handlePackageSelect = (packageId: string) => {
    onUpdateQuote({ selectedPackageId: packageId });
  };

  const handleTravelFeeChange = (amount: number) => {
    onUpdateQuote({ travelFee: amount });
  };

  const handleDiscountChange = (amount: number, percentage: number) => {
    onUpdateQuote({
      discountAmount: amount > 0 ? amount : 0,
      discountPercentage: percentage > 0 ? percentage : 0,
    });
  };

  const handleSalesTaxChange = (applySalesTax: boolean) => {
    onUpdateQuote({ applySalesTax });
  };

  const handleRushDeliveryChange = (rushDelivery: boolean) => {
    onUpdateQuote({ rushDelivery });
  };

  const handleInternalNotesChange = (notes: string) => {
    onUpdateQuote({ internalNotes: notes });
  };

  const handleClientNotesChange = (notes: string) => {
    onUpdateQuote({ clientNotes: notes });
  };

  const packages = Object.values(pricingConfig.packages);

  return (
    <div className="sticky top-6 space-y-4">
      {/* Status Selector */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200">
        <h3 className="font-bold text-slate-900 mb-3">Quote Status</h3>
        <select
          value={quote.status}
          onChange={(e) => handleStatusChange(e.target.value as QuoteStatus)}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none text-sm"
        >
          <option value="new">New</option>
          <option value="reviewing">Reviewing</option>
          <option value="quote_sent">Quote Sent</option>
          <option value="booked">Booked</option>
          <option value="lost">Lost</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {/* Package Selection */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200">
        <h3 className="font-bold text-slate-900 mb-3">Select Package</h3>
        <div className="space-y-2">
          {packages.map((pkg) => (
            <button
              key={pkg.id}
              onClick={() => handlePackageSelect(pkg.id)}
              className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                quote.selectedPackageId === pkg.id
                  ? 'border-yellow-400 bg-yellow-50'
                  : 'border-slate-200 hover:border-yellow-300'
              }`}
            >
              <div className="font-semibold text-sm text-slate-900">{pkg.name}</div>
              <div className="text-yellow-600 font-bold text-sm">${pkg.basePrice}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Pricing Breakdown */}
      <div className="bg-yellow-50 rounded-2xl p-6 border-2 border-yellow-400">
        <button
          onClick={() => setShowBreakdown(!showBreakdown)}
          className="flex items-center justify-between w-full mb-4"
        >
          <h3 className="font-bold text-slate-900 text-lg">Quote Calculator</h3>
          <span className="text-2xl">{showBreakdown ? '▼' : '▶'}</span>
        </button>

        {showBreakdown && (
          <div className="space-y-3">
            {/* Base Package */}
            <div className="flex justify-between text-sm bg-white p-3 rounded">
              <span className="text-slate-700">Base Package</span>
              <span className="font-semibold">${summary.basePackagePrice}</span>
            </div>

            {/* Square Footage Adjustment */}
            {summary.sqftAdjustment > 0 && (
              <div className="flex justify-between text-sm bg-white p-3 rounded">
                <span className="text-slate-700">Sq Ft Adjustment</span>
                <span className="font-semibold">+${summary.sqftAdjustment}</span>
              </div>
            )}

            {/* Selected Services */}
            {summary.selectedServices.length > 0 && (
              <div className="space-y-2">
                {summary.selectedServices.map((service, idx) => (
                  <div key={idx} className="flex justify-between text-sm bg-white p-3 rounded">
                    <span className="text-slate-700">{service.name}</span>
                    <span className="font-semibold">+${service.price}</span>
                  </div>
                ))}
              </div>
            )}

            {/* AI Editing Add-ons */}
            {summary.aiEditingAddons.length > 0 && (
              <div className="space-y-2">
                {summary.aiEditingAddons.map((addon, idx) => (
                  <div key={idx} className="flex justify-between text-sm bg-white p-3 rounded">
                    <span className="text-slate-700">
                      {addon.name} {addon.quantity > 1 ? `(x${addon.quantity})` : ''}
                    </span>
                    <span className="font-semibold">+${addon.totalPrice}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Rush Delivery Toggle */}
            <label className="flex items-center gap-2 p-3 bg-white rounded cursor-pointer">
              <input
                type="checkbox"
                checked={quote.rushDelivery || false}
                onChange={(e) => handleRushDeliveryChange(e.target.checked)}
                className="w-4 h-4 text-yellow-400 rounded"
              />
              <span className="text-sm text-slate-700">Rush Delivery</span>
              <span className="ml-auto font-semibold text-sm">
                ${quote.rushDelivery ? pricingConfig.rushDeliveryFee : 0}
              </span>
            </label>

            {/* Travel Fee */}
            <div className="p-3 bg-white rounded">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-700">Travel Fee</span>
                <input
                  type="number"
                  value={quote.travelFee || 0}
                  onChange={(e) => handleTravelFeeChange(parseFloat(e.target.value) || 0)}
                  className="w-24 px-2 py-1 border border-slate-300 rounded text-sm text-right"
                />
              </div>
            </div>

            {/* Discount */}
            <div className="p-3 bg-white rounded space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-700">Discount</span>
              </div>
              <div className="flex gap-2">
                <input
                  type="number"
                  placeholder="$ Amount"
                  value={quote.discountAmount || 0}
                  onChange={(e) =>
                    handleDiscountChange(parseFloat(e.target.value) || 0, quote.discountPercentage || 0)
                  }
                  className="flex-1 px-2 py-1 border border-slate-300 rounded text-sm"
                />
                <input
                  type="number"
                  placeholder="%"
                  value={quote.discountPercentage || 0}
                  onChange={(e) =>
                    handleDiscountChange(quote.discountAmount || 0, parseFloat(e.target.value) || 0)
                  }
                  className="w-16 px-2 py-1 border border-slate-300 rounded text-sm"
                />
              </div>
            </div>

            {/* Sales Tax Toggle */}
            <label className="flex items-center gap-2 p-3 bg-white rounded cursor-pointer">
              <input
                type="checkbox"
                checked={quote.applySalesTax || false}
                onChange={(e) => handleSalesTaxChange(e.target.checked)}
                className="w-4 h-4 text-yellow-400 rounded"
              />
              <span className="text-sm text-slate-700">Apply Sales Tax ({pricingConfig.taxRate}%)</span>
              <span className="ml-auto font-semibold text-sm">
                ${quote.applySalesTax ? Math.round(summary.taxAmount * 100) / 100 : 0}
              </span>
            </label>

            {/* Subtotal */}
            <div className="flex justify-between text-sm font-semibold bg-slate-100 p-3 rounded border border-slate-300">
              <span>Subtotal</span>
              <span>${Math.round(summary.subtotal * 100) / 100}</span>
            </div>

            {/* Final Total */}
            <div className="flex justify-between text-lg font-bold bg-yellow-400 text-slate-900 p-4 rounded-lg">
              <span>Final Total</span>
              <span>{formatCurrency(summary.finalTotal)}</span>
            </div>
          </div>
        )}
      </div>

      {/* Notes */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200">
        <h3 className="font-bold text-slate-900 mb-3">Internal Notes</h3>
        <textarea
          value={quote.internalNotes || ''}
          onChange={(e) => handleInternalNotesChange(e.target.value)}
          placeholder="Notes for your team only..."
          rows={3}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none text-sm"
        />
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200">
        <h3 className="font-bold text-slate-900 mb-3">Client-Facing Notes</h3>
        <textarea
          value={quote.clientNotes || ''}
          onChange={(e) => handleClientNotesChange(e.target.value)}
          placeholder="Message to include in the quote..."
          rows={3}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none text-sm"
        />
      </div>

      {/* Save Button */}
      <button
        onClick={onSave}
        disabled={isSaving}
        className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white font-bold py-3 px-4 rounded-lg transition-colors"
      >
        {isSaving ? 'Saving...' : 'Save Quote'}
      </button>
    </div>
  );
}
