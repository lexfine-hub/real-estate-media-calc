import { QuoteRequest } from '@/lib/types';
import { defaultPricingConfig } from '@/lib/pricing/config';

interface Props {
  formData: QuoteRequest;
  setFormData: (data: QuoteRequest) => void;
}

export default function AIEditingSection({ formData, setFormData }: Props) {
  const toggleAddon = (addonId: string) => {
    const current = formData.selectedAIEditingAddons || {};
    const isSelected = current[addonId];

    setFormData({
      ...formData,
      selectedAIEditingAddons: {
        ...current,
        [addonId]: isSelected ? 0 : 1,
      },
    });
  };

  const updateQuantity = (addonId: string, quantity: number) => {
    setFormData({
      ...formData,
      selectedAIEditingAddons: {
        ...formData.selectedAIEditingAddons,
        [addonId]: Math.max(0, quantity),
      },
    });
  };

  const aiEditingAddons = Object.entries(defaultPricingConfig.aiEditing);

  return (
    <div className="bg-gradient-to-br from-slate-50 to-white rounded-2xl p-8 border border-slate-200">
      <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-3">
        <div className="w-8 h-8 bg-yellow-400 text-white rounded-full flex items-center justify-center font-bold text-sm">
          8
        </div>
        AI Editing Add-ons
      </h2>
      <p className="text-slate-600 mb-6 ml-11">
        Enhance your photos with professional AI editing services.
      </p>

      <div className="space-y-4">
        {aiEditingAddons.map(([addonId, addon]) => {
          const isSelected = (formData.selectedAIEditingAddons?.[addonId] || 0) > 0;
          const quantity = formData.selectedAIEditingAddons?.[addonId] || 0;

          return (
            <div key={addonId} className="p-4 rounded-lg border-2 border-slate-200 hover:border-yellow-300 transition">
              <div className="flex items-start gap-4">
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleAddon(addonId)}
                  className="w-5 h-5 text-yellow-400 rounded focus:ring-2 focus:ring-yellow-400 cursor-pointer mt-1"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">{addon.name}</h3>
                  <p className="text-sm text-slate-600 mt-1">
                    {addon.flatFee ? (
                      <span>${addon.flatFee} flat fee</span>
                    ) : (
                      <span>${addon.pricePerUnit} {addon.unit}</span>
                    )}
                  </p>
                </div>

                {isSelected && !addon.flatFee && (
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-semibold text-slate-700">Qty:</label>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => updateQuantity(addonId, parseInt(e.target.value) || 0)}
                      className="w-16 px-3 py-1 border border-slate-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-transparent outline-none transition text-center"
                    />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {Object.values(formData.selectedAIEditingAddons || {}).some((qty) => qty > 0) && (
        <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <p className="text-sm text-slate-700">
            <strong>AI Editing Selected:</strong> These add-ons enhance your photos with professional
            editing services. Pricing will be calculated based on quantities selected above.
          </p>
        </div>
      )}
    </div>
  );
}
