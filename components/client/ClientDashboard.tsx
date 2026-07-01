'use client';

import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { QuoteRequest } from '@/lib/types';
import { formatCurrency, formatDate } from '@/lib/utils/format';

interface Props {
  email: string;
  onLogout: () => void;
}

const statusColors: Record<string, { bg: string; text: string; label: string }> = {
  new: { bg: 'bg-green-100', text: 'text-green-700', label: 'New Request' },
  reviewing: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Under Review' },
  quote_sent: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Quote Sent' },
  booked: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Booked' },
  lost: { bg: 'bg-red-100', text: 'text-red-700', label: 'Lost' },
  archived: { bg: 'bg-slate-100', text: 'text-slate-700', label: 'Archived' },
};

export default function ClientDashboard({ email, onLogout }: Props) {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);

  useEffect(() => {
    const loadQuotes = async () => {
      try {
        const { getAllQuotesAsync } = await import('@/lib/utils/storage');
        const allQuotes = await getAllQuotesAsync();

        // Filter quotes by email
        const userQuotes = allQuotes.filter((q) => q.agentInfo.email.toLowerCase() === email.toLowerCase());
        const sorted = userQuotes.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setQuotes(sorted);
      } catch (error) {
        console.error('Error loading quotes:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadQuotes();
  }, [email]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
          <p className="mt-4 text-slate-600">Loading your quotes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white px-6 py-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Your Quote Requests</h1>
            <p className="text-slate-400 mt-2">{email}</p>
          </div>
          <button
            onClick={onLogout}
            className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold py-2 px-6 rounded-lg transition"
          >
            Log Out
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {quotes.length === 0 ? (
          <div className="bg-slate-50 rounded-2xl p-12 text-center border border-slate-200">
            <p className="text-slate-600 text-lg mb-4">No quotes found</p>
            <p className="text-slate-500">
              Once you submit a quote request, it will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {quotes.map((quote) => {
              const status = statusColors[quote.status] || statusColors.new;
              return (
                <div
                  key={quote.id}
                  onClick={() => setSelectedQuote(quote)}
                  className="bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg transition cursor-pointer"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-slate-900">
                          {quote.propertyInfo.address}
                        </h3>
                        <span className={`${status.bg} ${status.text} px-3 py-1 rounded-full text-sm font-semibold`}>
                          {status.label}
                        </span>
                      </div>
                      <p className="text-slate-600">{quote.propertyInfo.city}</p>
                      <p className="text-sm text-slate-500 mt-2">
                        Submitted: {formatDate(quote.createdAt)}
                      </p>
                      {quote.scheduledShootDate && (
                        <p className="text-sm text-emerald-700 font-semibold mt-2">
                          📅 Shoot Scheduled: {quote.scheduledShootDate} at {quote.scheduledShootTime}
                        </p>
                      )}
                    </div>

                    <div className="text-right">
                      {quote.finalTotal ? (
                        <div>
                          <p className="text-sm text-slate-600">Estimated Price</p>
                          <p className="text-2xl font-bold text-slate-900">
                            {formatCurrency(quote.finalTotal)}
                          </p>
                        </div>
                      ) : (
                        <p className="text-slate-500 text-sm">Price TBD</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedQuote && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-900">Quote Details</h2>
              <button
                onClick={() => setSelectedQuote(null)}
                className="text-slate-500 hover:text-slate-700 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Status */}
              <div>
                <h3 className="text-sm font-semibold text-slate-900 mb-2">Status</h3>
                <div className={`inline-block ${statusColors[selectedQuote.status]?.bg} ${statusColors[selectedQuote.status]?.text} px-4 py-2 rounded-full font-semibold`}>
                  {statusColors[selectedQuote.status]?.label}
                </div>
              </div>

              {/* Property Info */}
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">Property</h3>
                <div className="space-y-2 text-slate-700">
                  <p>
                    <span className="font-semibold">Address:</span> {selectedQuote.propertyInfo.address}
                  </p>
                  <p>
                    <span className="font-semibold">City:</span> {selectedQuote.propertyInfo.city}
                  </p>
                  <p>
                    <span className="font-semibold">Type:</span> {selectedQuote.propertyInfo.propertyType}
                  </p>
                  <p>
                    <span className="font-semibold">Square Footage:</span>{' '}
                    {selectedQuote.propertyInfo.squareFootage.toLocaleString()}
                  </p>
                  <p>
                    <span className="font-semibold">Bedrooms:</span> {selectedQuote.propertyInfo.bedrooms}
                  </p>
                  <p>
                    <span className="font-semibold">Bathrooms:</span> {selectedQuote.propertyInfo.bathrooms}
                  </p>
                  <p>
                    <span className="font-semibold">Listing Price:</span>{' '}
                    {formatCurrency(selectedQuote.propertyInfo.listingPrice)}
                  </p>
                </div>
              </div>

              {/* Selected Services */}
              {selectedQuote.selectedServices && selectedQuote.selectedServices.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">Services Requested</h3>
                  <ul className="space-y-1 text-slate-700">
                    {selectedQuote.selectedServices.map((service) => (
                      <li key={service}>• {service}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Scheduled Shoot */}
              {selectedQuote.scheduledShootDate && (
                <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-200">
                  <h3 className="text-lg font-bold text-emerald-700 mb-3">📅 Scheduled Shoot</h3>
                  <div className="space-y-2 text-slate-700">
                    <p>
                      <span className="font-semibold">Date:</span> {selectedQuote.scheduledShootDate}
                    </p>
                    <p>
                      <span className="font-semibold">Time:</span> {selectedQuote.scheduledShootTime}
                    </p>
                  </div>
                </div>
              )}

              {/* Pricing */}
              {selectedQuote.finalTotal && (
                <div className="bg-yellow-50 rounded-xl p-4 border border-yellow-200">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-slate-900">Estimated Total:</span>
                    <span className="text-2xl font-bold text-slate-900">
                      {formatCurrency(selectedQuote.finalTotal)}
                    </span>
                  </div>
                </div>
              )}

              {/* Notes from Admin */}
              {selectedQuote.internalNotes && (
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">Admin Notes</h3>
                  <p className="text-slate-700 bg-slate-50 p-4 rounded-lg">
                    {selectedQuote.internalNotes}
                  </p>
                </div>
              )}

              <div className="text-sm text-slate-500 pt-4 border-t border-slate-200">
                Quote ID: {selectedQuote.id}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
