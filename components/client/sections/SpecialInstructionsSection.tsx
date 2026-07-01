import { QuoteRequest } from '@/lib/types';

interface Props {
  formData: QuoteRequest;
  setFormData: (data: QuoteRequest) => void;
}

export default function SpecialInstructionsSection({ formData, setFormData }: Props) {
  const updateInstructions = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-3">
        <div className="w-8 h-8 bg-yellow-400 text-white rounded-full flex items-center justify-center font-bold text-sm">
          9
        </div>
        Special Instructions
      </h2>
      <p className="text-slate-600 mb-6 ml-11">Tell us anything else we should know about this listing.</p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            Rooms or features that must be highlighted
          </label>
          <textarea
            value={formData.specialInstructions || ''}
            onChange={(e) => updateInstructions('specialInstructions', e.target.value)}
            placeholder="e.g., Kitchen renovation, new flooring, updated HVAC..."
            rows={3}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            Access instructions
          </label>
          <textarea
            value={formData.specialInstructions || ''}
            onChange={(e) => updateInstructions('specialInstructions', e.target.value)}
            placeholder="e.g., Gate code, key location, pets to be aware of..."
            rows={3}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            Anything else we should know?
          </label>
          <textarea
            value={formData.specialInstructions || ''}
            onChange={(e) => updateInstructions('specialInstructions', e.target.value)}
            placeholder="Any other special requests or important details..."
            rows={3}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition"
          />
        </div>
      </div>
    </div>
  );
}
