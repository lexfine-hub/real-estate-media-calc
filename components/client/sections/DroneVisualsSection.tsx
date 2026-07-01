import { QuoteRequest } from '@/lib/types';

interface Props {
  formData: QuoteRequest;
  setFormData: (data: QuoteRequest) => void;
}

const droneOptions = [
  { id: 'homeExterior', label: 'Home exterior' },
  { id: 'lotSize', label: 'Lot size' },
  { id: 'mountainViews', label: 'Mountain views' },
  { id: 'neighborhood', label: 'Neighborhood' },
  { id: 'nearbyAmenities', label: 'Nearby amenities' },
  { id: 'acreageOrLand', label: 'Acreage or land' },
  { id: 'poolOrOutdoorSpace', label: 'Pool or outdoor space' },
  { id: 'other', label: 'Other' },
];

export default function DroneVisualsSection({ formData, setFormData }: Props) {
  const toggleDroneOption = (optionId: string) => {
    const current = formData.droneVisuals || {};
    setFormData({
      ...formData,
      droneVisuals: {
        ...current,
        [optionId]: !current[optionId as keyof typeof current],
      },
    });
  };

  const updateDroneRestrictions = (restrictions: string) => {
    setFormData({
      ...formData,
      droneVisuals: {
        ...formData.droneVisuals,
        restrictions,
      },
    });
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-3">
        <div className="w-8 h-8 bg-yellow-400 text-white rounded-full flex items-center justify-center font-bold text-sm">
          5
        </div>
        Drone Visuals
      </h2>
      <p className="text-slate-600 mb-6 ml-11">Which drone shots are most important for your listing?</p>

      <div className="mb-8">
        <h3 className="font-semibold text-slate-900 mb-4">Focus Areas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {droneOptions.map((option) => (
            <label key={option.id} className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-slate-100 transition">
              <input
                type="checkbox"
                checked={Boolean(formData.droneVisuals?.[option.id as keyof typeof formData.droneVisuals])}
                onChange={() => toggleDroneOption(option.id)}
                className="w-5 h-5 text-yellow-400 rounded focus:ring-2 focus:ring-yellow-400 cursor-pointer"
              />
              <span className="text-slate-700 font-medium">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-900 mb-2">
          Are there any drone restrictions, HOA restrictions, or access concerns we should know about?
        </label>
        <textarea
          value={formData.droneVisuals?.restrictions || ''}
          onChange={(e) => updateDroneRestrictions(e.target.value)}
          placeholder="Let us know about any restrictions..."
          rows={3}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition"
        />
      </div>
    </div>
  );
}
