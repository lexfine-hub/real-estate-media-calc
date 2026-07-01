'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { QuoteRequest } from '@/lib/types';
import { getQuoteById, saveQuote } from '@/lib/utils/storage';
import { getPricingConfig } from '@/lib/utils/storage';
import { calculateQuoteSummary, getRecommendedPackage, getSquareFootageAdjustment } from '@/lib/utils/calculations';
import { formatCurrency, formatDate } from '@/lib/utils/format';
import { defaultPricingConfig } from '@/lib/pricing/config';
import QuoteCalculator from '@/components/admin/QuoteCalculator';

export default function QuoteDetailPage() {
  const params = useParams();
  const router = useRouter();
  const quoteId = params.id as string;

  const [quote, setQuote] = useState<QuoteRequest | null>(null);
  const [pricingConfig, setPricingConfig] = useState(defaultPricingConfig);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadQuote = async () => {
      const { getQuoteByIdAsync } = await import('@/lib/utils/storage');
      const loadedQuote = await getQuoteByIdAsync(quoteId);
      const loadedPricing = getPricingConfig();
      setQuote(loadedQuote);
      setPricingConfig(loadedPricing);
      setIsLoading(false);
    };

    loadQuote();
  }, [quoteId]);

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!quote) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 font-semibold">Quote not found</p>
        <button
          onClick={() => router.back()}
          className="mt-4 bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  const handleSave = async () => {
    setIsSaving(true);
    saveQuote(quote);
    setIsSaving(false);
    alert('Quote saved successfully!');
  };

  const handleUpdateQuote = (updates: Partial<QuoteRequest>) => {
    setQuote({ ...quote, ...updates });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-8 border border-slate-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Quote Review</h1>
            <p className="text-slate-600">
              {quote.agentInfo.name} • {quote.propertyInfo.address}, {quote.propertyInfo.city}
            </p>
          </div>
          <button
            onClick={() => router.back()}
            className="text-slate-600 hover:text-slate-900"
          >
            ← Back
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Client Information */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Client Information</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-slate-600 font-semibold mb-1">Agent Name</p>
                <p className="text-slate-900 font-semibold">{quote.agentInfo.name}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 font-semibold mb-1">Brokerage</p>
                <p className="text-slate-900">{quote.agentInfo.brokerage || '—'}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 font-semibold mb-1">Email</p>
                <p className="text-slate-900">{quote.agentInfo.email}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 font-semibold mb-1">Phone</p>
                <p className="text-slate-900">{quote.agentInfo.phone}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 font-semibold mb-1">Preferred Contact</p>
                <p className="text-slate-900 capitalize">{quote.agentInfo.preferredContact}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 font-semibold mb-1">Submitted</p>
                <p className="text-slate-900">{formatDate(quote.createdAt)}</p>
              </div>
            </div>
          </div>

          {/* Property Information */}
          <div className="bg-white rounded-2xl p-8 border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Property Information</h2>
            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <p className="text-sm text-slate-600 font-semibold mb-1">Address</p>
                <p className="text-slate-900 font-semibold">
                  {quote.propertyInfo.address}, {quote.propertyInfo.city}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600 font-semibold mb-1">Property Type</p>
                <p className="text-slate-900 capitalize">{quote.propertyInfo.propertyType}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 font-semibold mb-1">Square Footage</p>
                <p className="text-slate-900">{quote.propertyInfo.squareFootage.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 font-semibold mb-1">Bedrooms</p>
                <p className="text-slate-900">{quote.propertyInfo.bedrooms}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 font-semibold mb-1">Bathrooms</p>
                <p className="text-slate-900">{quote.propertyInfo.bathrooms}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 font-semibold mb-1">Listing Price</p>
                <p className="text-slate-900">${quote.propertyInfo.listingPrice.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 font-semibold mb-1">Preferred Shoot Date</p>
                <p className="text-slate-900">{quote.propertyInfo.preferredShootDate}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 font-semibold mb-1">Occupancy Status</p>
                <p className="text-slate-900 capitalize">{quote.propertyInfo.occupancyStatus}</p>
              </div>
            </div>
          </div>

          {/* Selected Services */}
          {quote.selectedServices.length > 0 && (
            <div className="bg-white rounded-2xl p-8 border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Services Selected</h2>
              <div className="flex flex-wrap gap-2">
                {quote.selectedServices.map((serviceId) => (
                  <span key={serviceId} className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                    {serviceId}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Special Instructions */}
          {quote.specialInstructions && (
            <div className="bg-white rounded-2xl p-8 border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Special Instructions</h2>
              <p className="text-slate-700 whitespace-pre-wrap">{quote.specialInstructions}</p>
            </div>
          )}
        </div>

        {/* Sidebar - Quote Calculator */}
        <div className="lg:col-span-1">
          <QuoteCalculator
            quote={quote}
            pricingConfig={pricingConfig}
            onUpdateQuote={handleUpdateQuote}
            onSave={handleSave}
            isSaving={isSaving}
          />
        </div>
      </div>
    </div>
  );
}
