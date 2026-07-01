'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { QuoteRequest, QuoteStatus } from '@/lib/types';
import { getAllQuotes, deleteQuote } from '@/lib/utils/storage';
import { formatCurrency, formatDate } from '@/lib/utils/format';

type FilterStatus = QuoteStatus | 'all';

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadQuotes = async () => {
      const { getAllQuotesAsync } = await import('@/lib/utils/storage');
      const loadedQuotes = await getAllQuotesAsync();
      const sorted = loadedQuotes.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setQuotes(sorted);
      setIsLoading(false);
    };

    loadQuotes();
  }, []);

  const filteredQuotes = quotes.filter((quote) => {
    const matchesStatus = filterStatus === 'all' || quote.status === filterStatus;
    const matchesSearch =
      quote.agentInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.propertyInfo.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      quote.propertyInfo.city.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this quote?')) {
      deleteQuote(id);
      setQuotes(quotes.filter((q) => q.id !== id));
    }
  };

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-8 border border-slate-200">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Quote Requests</h1>
        <p className="text-slate-600">Manage and review all incoming quote requests</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Search</label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by agent name, address, or city..."
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Filter by Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="reviewing">Reviewing</option>
              <option value="quote_sent">Quote Sent</option>
              <option value="booked">Booked</option>
              <option value="lost">Lost</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
        <p className="text-sm text-slate-600">{filteredQuotes.length} quotes found</p>
      </div>

      {/* Quotes Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        {filteredQuotes.length === 0 ? (
          <div className="text-center py-12 text-slate-600">
            <p>No quotes found matching your criteria.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b-2 border-slate-200">
                <tr>
                  <th className="text-left py-4 px-6 font-semibold text-slate-900">Date</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-900">Agent</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-900">Property</th>
                  <th className="text-left py-4 px-6 font-semibold text-slate-900">Status</th>
                  <th className="text-right py-4 px-6 font-semibold text-slate-900">Total</th>
                  <th className="text-right py-4 px-6 font-semibold text-slate-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredQuotes.map((quote, idx) => (
                  <tr
                    key={quote.id}
                    className={`border-b border-slate-100 hover:bg-slate-50 transition ${
                      idx === 0 ? '' : ''
                    }`}
                  >
                    <td className="py-4 px-6 text-slate-700 text-sm">{formatDate(quote.createdAt)}</td>
                    <td className="py-4 px-6 text-slate-900 font-semibold">{quote.agentInfo.name}</td>
                    <td className="py-4 px-6 text-slate-700">
                      <div>{quote.propertyInfo.address}</div>
                      <div className="text-sm text-slate-500">{quote.propertyInfo.city}</div>
                    </td>
                    <td className="py-4 px-6">
                      <StatusBadge status={quote.status} />
                    </td>
                    <td className="py-4 px-6 text-right font-semibold text-slate-900">
                      {quote.finalTotal ? formatCurrency(quote.finalTotal) : '—'}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/quotes/${quote.id}`}
                          className="text-yellow-600 hover:text-yellow-700 text-sm font-semibold px-3 py-1 rounded hover:bg-yellow-50"
                        >
                          View
                        </Link>
                        <button
                          onClick={() => handleDelete(quote.id)}
                          className="text-red-600 hover:text-red-700 text-sm font-semibold px-3 py-1 rounded hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const statusStyles: Record<string, { bg: string; text: string }> = {
    new: { bg: 'bg-green-100', text: 'text-green-700' },
    reviewing: { bg: 'bg-amber-100', text: 'text-amber-700' },
    quote_sent: { bg: 'bg-blue-100', text: 'text-blue-700' },
    booked: { bg: 'bg-indigo-100', text: 'text-indigo-700' },
    lost: { bg: 'bg-red-100', text: 'text-red-700' },
    archived: { bg: 'bg-slate-100', text: 'text-slate-700' },
  };

  const style = statusStyles[status] || statusStyles.new;
  const label = status.replace('_', ' ').replace(/^./, (c) => c.toUpperCase());

  return (
    <span className={`${style.bg} ${style.text} px-3 py-1 rounded-full text-xs font-semibold`}>
      {label}
    </span>
  );
}
