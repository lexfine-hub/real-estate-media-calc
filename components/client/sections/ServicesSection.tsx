import { QuoteRequest } from '@/lib/types';

interface Props {
  formData: QuoteRequest;
  setFormData: (data: QuoteRequest) => void;
}

const services = [
  { id: 'photos', label: 'Professional photos' },
  { id: 'listingVideo', label: 'Listing video' },
  { id: 'verticalReel', label: 'Vertical social media reel' },
  { id: 'dronePhotos', label: 'Drone photos' },
  { id: 'droneVideo', label: 'Drone video clips' },
  { id: 'walkthrough3D', label: '3D walkthrough' },
  { id: 'floorPlan', label: 'Floor plan' },
  { id: 'twilightPhotos', label: 'Twilight exterior photos' },
  { id: 'virtualStaging', label: 'Virtual staging' },
  { id: 'aiEditing', label: 'AI editing add-ons' },
];

export default function ServicesSection({ formData, setFormData }: Props) {
  const toggleService = (serviceId: string) => {
    const updated = formData.selectedServices.includes(serviceId)
      ? formData.selectedServices.filter((s) => s !== serviceId)
      : [...formData.selectedServices, serviceId];

    setFormData({
      ...formData,
      selectedServices: updated,
    });
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-3">
        <div className="w-8 h-8 bg-yellow-400 text-white rounded-full flex items-center justify-center font-bold text-sm">
          4
        </div>
        Services Needed
      </h2>
      <p className="text-slate-600 mb-6 ml-11">Select the services you're interested in.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {services.map((service) => (
          <label key={service.id} className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-slate-100 transition">
            <input
              type="checkbox"
              checked={formData.selectedServices.includes(service.id)}
              onChange={() => toggleService(service.id)}
              className="w-5 h-5 text-yellow-400 rounded focus:ring-2 focus:ring-yellow-400 cursor-pointer"
            />
            <span className="text-slate-700 font-medium">{service.label}</span>
          </label>
        ))}
      </div>

      {formData.selectedServices.length > 0 && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="text-sm text-slate-700">
            <strong>Selected {formData.selectedServices.length} service{formData.selectedServices.length !== 1 ? 's' : ''}</strong>
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.selectedServices.map((serviceId) => {
              const service = services.find((s) => s.id === serviceId);
              return (
                <span key={serviceId} className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full">
                  {service?.label}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
