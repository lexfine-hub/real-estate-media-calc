import { QuoteRequest, BrandingOption } from '@/lib/types';

interface Props {
  formData: QuoteRequest;
  setFormData: (data: QuoteRequest) => void;
}

const brandingOptions: BrandingOption[] = ['branded', 'unbranded', 'both'];

export default function WalkthroughDetailsSection({ formData, setFormData }: Props) {
  const updateWalkthroughDetails = (field: string, value: any) => {
    setFormData({
      ...formData,
      walkthrough3DDetails: {
        ...formData.walkthrough3DDetails,
        [field]: value,
      },
    });
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-3">
        <div className="w-8 h-8 bg-yellow-400 text-white rounded-full flex items-center justify-center font-bold text-sm">
          7
        </div>
        3D Walkthrough & Floor Plan
      </h2>
      <p className="text-slate-600 mb-6 ml-11">Customize your 3D walkthrough and floor plan details.</p>

      <div className="space-y-6">
        <div>
          <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-slate-100 transition">
            <input
              type="checkbox"
              checked={formData.walkthrough3DDetails?.measurementsIncluded || false}
              onChange={(e) => updateWalkthroughDetails('measurementsIncluded', e.target.checked)}
              className="w-5 h-5 text-yellow-400 rounded focus:ring-2 focus:ring-yellow-400 cursor-pointer"
            />
            <span className="text-slate-700 font-medium">Do you need measurements included?</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-3">
            Branding Preference
          </label>
          <select
            value={formData.walkthrough3DDetails?.brandingOption || 'unbranded'}
            onChange={(e) => updateWalkthroughDetails('brandingOption', e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition"
          >
            {brandingOptions.map((option) => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
                {option === 'both' ? ' (provide both versions)' : ''}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
