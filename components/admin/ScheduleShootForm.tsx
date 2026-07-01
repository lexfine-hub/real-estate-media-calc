'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { QuoteRequest } from '@/lib/types';
import { saveQuote } from '@/lib/utils/storage';

interface Props {
  quote: QuoteRequest;
  onClose: () => void;
  onSave: (quote: QuoteRequest) => void;
}

export default function ScheduleShootForm({ quote, onClose, onSave }: Props) {
  const { data: session } = useSession();
  const [date, setDate] = useState(quote.scheduledShootDate || '');
  const [time, setTime] = useState(quote.scheduledShootTime || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!date || !time) {
      alert('Please select both date and time');
      return;
    }

    setIsSaving(true);

    const updatedQuote: QuoteRequest = {
      ...quote,
      scheduledShootDate: date,
      scheduledShootTime: time,
      shootScheduledBy: session?.user?.email || 'admin',
      shootScheduledAt: new Date().toISOString(),
    };

    saveQuote(updatedQuote);
    onSave(updatedQuote);
    setIsSaving(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Schedule Shoot Date</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Shoot Date *
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Shoot Time *
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 outline-none"
              required
            />
          </div>

          {quote.scheduledShootDate && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-slate-700">
                <strong>Currently scheduled:</strong> {quote.scheduledShootDate} at {quote.scheduledShootTime}
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-slate-900 font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold rounded-lg disabled:opacity-50"
            >
              {isSaving ? 'Scheduling...' : 'Schedule'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
