import { QuoteRequest } from '@/lib/types';
import { defaultPricingConfig } from '@/lib/pricing/config';

interface Props {
  formData: QuoteRequest;
  setFormData: (data: QuoteRequest) => void;
}

const packageOrder = ['essential', 'photoFloorPlan', 'premium', 'fullMedia'];

export default function PackageSelectionSection({ formData, setFormData }: Props) {
  const handlePackageSelect = (packageId: string) => {
    setFormData({
      ...formData,
      packageInterest: packageId,
      selectedPackageId: packageId,
    });
  };

  const packages = packageOrder
    .map((id) => ({ id, ...defaultPricingConfig.packages[id] }))
    .filter((pkg) => pkg.name);

  return (
    <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-3">
        <div className="w-8 h-8 bg-yellow-400 text-white rounded-full flex items-center justify-center font-bold text-sm">
          3
        </div>
        Package Interest
      </h2>
      <p className="text-slate-600 mb-6 ml-11">
        Select a package that best fits your needs, or customize services below.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            onClick={() => handlePackageSelect(pkg.id)}
            className={`rounded-xl p-6 cursor-pointer transition-all border-2 ${
              formData.packageInterest === pkg.id
                ? 'border-yellow-400 bg-yellow-50 shadow-lg'
                : 'border-slate-200 bg-white hover:border-yellow-300 hover:shadow-md'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">{pkg.name}</h3>
                <p className="text-sm text-slate-600 mt-1">Starting at</p>
              </div>
              {formData.packageInterest === pkg.id && (
                <div className="w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>

            <div className="mb-4">
              <p className="text-3xl font-bold text-slate-900">${pkg.basePrice}</p>
            </div>

            <ul className="space-y-2">
              {pkg.includes.slice(0, 4).map((item, idx) => (
                <li key={idx} className="text-sm text-slate-700 flex items-start gap-2">
                  <span className="text-yellow-400 mt-1">✓</span>
                  <span>{item}</span>
                </li>
              ))}
              {pkg.includes.length > 4 && (
                <li className="text-sm text-slate-600 italic">
                  + {pkg.includes.length - 4} more {pkg.includes.length - 4 === 1 ? 'feature' : 'features'}
                </li>
              )}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-slate-700">
          <strong>Not sure?</strong> Let us recommend a package based on your service selections
          below. We'll suggest the best option when you submit.
        </p>
      </div>
    </div>
  );
}
