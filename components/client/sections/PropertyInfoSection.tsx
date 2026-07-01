import { QuoteRequest, PropertyType, PreferredShootTime, OccupancyStatus } from '@/lib/types';

interface Props {
  formData: QuoteRequest;
  setFormData: (data: QuoteRequest) => void;
}

const propertyTypes: PropertyType[] = [
  'single-family',
  'condo',
  'townhome',
  'multi-family',
  'land',
  'commercial',
  'other',
];

const shootTimes: PreferredShootTime[] = ['morning', 'afternoon', 'twilight', 'flexible'];

export default function PropertyInfoSection({ formData, setFormData }: Props) {
  const updatePropertyInfo = (field: string, value: any) => {
    setFormData({
      ...formData,
      propertyInfo: {
        ...formData.propertyInfo,
        [field]: value,
      },
    });
  };

  return (
    <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-yellow-400 text-white rounded-full flex items-center justify-center font-bold text-sm">
          2
        </div>
        Property Information
      </h2>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Property Address <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.propertyInfo.address}
              onChange={(e) => updatePropertyInfo('address', e.target.value)}
              placeholder="123 Main Street"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              City <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.propertyInfo.city}
              onChange={(e) => updatePropertyInfo('city', e.target.value)}
              placeholder="Denver"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-3">
            Property Type <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.propertyInfo.propertyType}
            onChange={(e) => updatePropertyInfo('propertyType', e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition"
          >
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {type.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Square Footage <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              required
              value={formData.propertyInfo.squareFootage || ''}
              onChange={(e) => updatePropertyInfo('squareFootage', parseInt(e.target.value) || 0)}
              placeholder="2500"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Bedrooms</label>
            <input
              type="number"
              value={formData.propertyInfo.bedrooms || ''}
              onChange={(e) => updatePropertyInfo('bedrooms', parseInt(e.target.value) || 0)}
              placeholder="3"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Bathrooms</label>
            <input
              type="number"
              step="0.5"
              value={formData.propertyInfo.bathrooms || ''}
              onChange={(e) => updatePropertyInfo('bathrooms', parseFloat(e.target.value) || 0)}
              placeholder="2.5"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-3">
              Occupancy Status <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.propertyInfo.occupancyStatus}
              onChange={(e) => updatePropertyInfo('occupancyStatus', e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition"
            >
              <option value="occupied">Occupied</option>
              <option value="vacant">Vacant</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Listing Price <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-2 text-slate-500 font-semibold">$</span>
              <input
                type="number"
                value={formData.propertyInfo.listingPrice || ''}
                onChange={(e) => updatePropertyInfo('listingPrice', parseFloat(e.target.value) || 0)}
                placeholder="500000"
                className="w-full pl-8 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">
              Preferred Shoot Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              required
              value={formData.propertyInfo.preferredShootDate}
              onChange={(e) => updatePropertyInfo('preferredShootDate', e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-3">
              Preferred Shoot Time <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.propertyInfo.preferredShootTime}
              onChange={(e) => updatePropertyInfo('preferredShootTime', e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition"
            >
              {shootTimes.map((time) => (
                <option key={time} value={time}>
                  {time.charAt(0).toUpperCase() + time.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-900 mb-2">
            Target Listing Live Date
          </label>
          <input
            type="date"
            value={formData.propertyInfo.targetListingLiveDate}
            onChange={(e) => updatePropertyInfo('targetListingLiveDate', e.target.value)}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition"
          />
        </div>
      </div>
    </div>
  );
}
