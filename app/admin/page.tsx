'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { QuoteRequest } from '@/lib/types';
import { getAllQuotes } from '@/lib/utils/storage';
import { formatCurrency, formatDate } from '@/lib/utils/format';

export default function AdminDashboard() {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadedQuotes = getAllQuotes();
    setQuotes(loadedQuotes);
    setIsLoading(false);
  }, []);

  const stats = {
    totalQuotes: quotes.length,
    newQuotes: quotes.filter((q) => q.status === 'new').length,
    reviewing: quotes.filter((q) => q.status === 'reviewing').length,
    quoteSent: quotes.filter((q) => q.status === 'quote_sent').length,
    booked: quotes.filter((q) => q.status === 'booked').length,
    totalRevenue: quotes.reduce((sum, q) => sum + (q.finalTotal || 0), 0),
  };

  const recentQuotes = quotes.slice(0, 5);

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white rounded-2xl p-8 border border-slate-200">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Dashboard</h1>
        <p className="text-slate-600">Welcome to the Real Estate Media admin panel</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Quotes"
          value={stats.totalQuotes}
          icon="📋"
          bgColor="bg-blue-50"
          textColor="text-blue-600"
          borderColor="border-blue-200"
        />
        <StatCard
          title="New Requests"
          value={stats.newQuotes}
          icon="✨"
          bgColor="bg-green-50"
          textColor="text-green-600"
          borderColor="border-green-200"
        />
        <StatCard
          title="Under Review"
          value={stats.reviewing}
          icon="👀"
          bgColor="bg-amber-50"
          textColor="text-amber-600"
          borderColor="border-amber-200"
        />
        <StatCard
          title="Quotes Sent"
          value={stats.quoteSent}
          icon="📧"
          bgColor="bg-purple-50"
          textColor="text-purple-600"
          borderColor="border-purple-200"
        />
        <StatCard
          title="Booked"
          value={stats.booked}
          icon="✅"
          bgColor="bg-indigo-50"
          textColor="text-indigo-600"
          borderColor="border-indigo-200"
        />
        <StatCard
          title="Est. Revenue"
          value={formatCurrency(stats.totalRevenue)}
          icon="💰"
          bgColor="bg-yellow-50"
          textColor="text-yellow-600"
          borderColor="border-yellow-200"
        />
      </div>

      {/* Recent Quotes */}
      <div className="bg-white rounded-2xl p-8 border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Recent Quotes</h2>
          <Link
            href="/admin/quotes"
            className="text-yellow-600 hover:text-yellow-700 font-semibold"
          >
            View All →
          </Link>
        </div>

        {recentQuotes.length === 0 ? (
          <div className="text-center py-12 text-slate-600">
            <p>No quotes yet. Once clients submit requests, they'll appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Date</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Agent</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Property</th>
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">Status</th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-700">Total</th>
                  <th className="text-right py-3 px-4 font-semibold text-slate-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentQuotes.map((quote) => (
                  <tr key={quote.id} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 text-slate-700">{formatDate(quote.createdAt)}</td>
                    <td className="py-3 px-4 text-slate-700">{quote.agentInfo.name}</td>
                    <td className="py-3 px-4 text-slate-700">
                      {quote.propertyInfo.address.substring(0, 30)}...
                    </td>
                    <td className="py-3 px-4">
                      <StatusBadge status={quote.status} />
                    </td>
                    <td className="py-3 px-4 text-right text-slate-700 font-semibold">
                      {quote.finalTotal
                        ? formatCurrency(quote.finalTotal)
                        : '—'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        href={`/admin/quotes/${quote.id}`}
                        className="text-yellow-600 hover:text-yellow-700 font-semibold"
                      >
                        Review →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/admin/quotes"
          className="bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-yellow-400 hover:shadow-lg transition-all"
        >
          <h3 className="text-xl font-bold text-slate-900 mb-2">📋 Manage Quotes</h3>
          <p className="text-slate-600">Review, edit, and process all quote requests</p>
        </Link>

        <Link
          href="/admin/pricing"
          className="bg-white rounded-2xl p-6 border-2 border-slate-200 hover:border-yellow-400 hover:shadow-lg transition-all"
        >
          <h3 className="text-xl font-bold text-slate-900 mb-2">💰 Pricing Settings</h3>
          <p className="text-slate-600">Update packages, services, and add-on pricing</p>
        </Link>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
  bgColor,
  textColor,
  borderColor,
}: {
  title: string;
  value: string | number;
  icon: string;
  bgColor: string;
  textColor: string;
  borderColor: string;
}) {
  return (
    <div className={`${bgColor} rounded-2xl p-6 border-2 ${borderColor}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-slate-600 text-sm font-semibold">{title}</p>
          <p className={`text-3xl font-bold ${textColor} mt-2`}>{value}</p>
        </div>
        <span className="text-4xl">{icon}</span>
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
    <span className={`${style.bg} ${style.text} px-3 py-1 rounded-full text-sm font-semibold`}>
      {label}
    </span>
  );
}
