import { QuoteRequest, VideoFormat } from '@/lib/types';

interface Props {
  formData: QuoteRequest;
  setFormData: (data: QuoteRequest) => void;
}

const videoFormats: VideoFormat[] = ['horizontal', 'vertical', 'both'];

const usageLocations = [
  { id: 'mls', label: 'MLS' },
  { id: 'instagram', label: 'Instagram' },
  { id: 'facebook', label: 'Facebook' },
  { id: 'youtube', label: 'YouTube' },
  { id: 'website', label: 'Website' },
  { id: 'paidAds', label: 'Paid ads' },
  { id: 'other', label: 'Other' },
];

export default function VideoDetailsSection({ formData, setFormData }: Props) {
  const updateVideoDetails = (field: string, value: any) => {
    setFormData({
      ...formData,
      videoDetails: {
        ...formData.videoDetails,
        [field]: value,
      },
    });
  };

  const toggleUsageLocation = (locationId: string) => {
    const current = formData.videoDetails?.usageLocations || [];
    const updated = current.includes(locationId)
      ? current.filter((l) => l !== locationId)
      : [...current, locationId];

    updateVideoDetails('usageLocations', updated);
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-3">
        <div className="w-8 h-8 bg-yellow-400 text-white rounded-full flex items-center justify-center font-bold text-sm">
          6
        </div>
        Video Details
      </h2>
      <p className="text-slate-600 mb-6 ml-11">Tell us about your video preferences.</p>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-3">
            Preferred Video Format
          </label>
          <select
            value={formData.videoDetails?.preferredFormat || 'horizontal'}
            onChange={(e) => updateVideoDetails('preferredFormat', e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition"
          >
            {videoFormats.map((format) => (
              <option key={format} value={format}>
                {format.charAt(0).toUpperCase() + format.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-3">
            Where will the video be used?
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {usageLocations.map((location) => (
              <label key={location.id} className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-slate-100 transition">
                <input
                  type="checkbox"
                  checked={formData.videoDetails?.usageLocations?.includes(location.id) || false}
                  onChange={() => toggleUsageLocation(location.id)}
                  className="w-5 h-5 text-yellow-400 rounded focus:ring-2 focus:ring-yellow-400 cursor-pointer"
                />
                <span className="text-slate-700 font-medium">{location.label}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-slate-100 transition">
            <input
              type="checkbox"
              checked={formData.videoDetails?.musicIncluded || false}
              onChange={(e) => updateVideoDetails('musicIncluded', e.target.checked)}
              className="w-5 h-5 text-yellow-400 rounded focus:ring-2 focus:ring-yellow-400 cursor-pointer"
            />
            <span className="text-slate-700 font-medium">Do you want music included?</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-slate-100 transition">
            <input
              type="checkbox"
              checked={formData.videoDetails?.agentBrandingIncluded || false}
              onChange={(e) => updateVideoDetails('agentBrandingIncluded', e.target.checked)}
              className="w-5 h-5 text-yellow-400 rounded focus:ring-2 focus:ring-yellow-400 cursor-pointer"
            />
            <span className="text-slate-700 font-medium">Do you want agent branding included?</span>
          </label>

          <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-slate-100 transition">
            <input
              type="checkbox"
              checked={formData.videoDetails?.introOutroCard || false}
              onChange={(e) => updateVideoDetails('introOutroCard', e.target.checked)}
              className="w-5 h-5 text-yellow-400 rounded focus:ring-2 focus:ring-yellow-400 cursor-pointer"
            />
            <span className="text-slate-700 font-medium">Do you want an intro or outro card?</span>
          </label>
        </div>
      </div>
    </div>
  );
}
