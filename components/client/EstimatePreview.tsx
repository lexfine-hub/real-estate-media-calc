import { QuoteRequest } from '@/lib/types';
import { formatCurrency } from '@/lib/utils/format';
import { defaultPricingConfig } from '@/lib/pricing/config';
import { getRecommendedPackage } from '@/lib/utils/calculations';

interface Props {
  formData: QuoteRequest;
  estimateRange: { min: number; max: number };
}

export default function EstimatePreview({ formData, estimateRange }: Props) {
  const recommendation = getRecommendedPackage(formData);
  const recommendedPackage = defaultPricingConfig.packages[recommendation.packageId];

  return (
    <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-8 border-2 border-yellow-400">
      <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
        <svg className="w-6 h-6 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M8.433 7.418c.155-.103.346-.196.567-.267.221-.071.460-.12.712-.12.252 0 .491.049.712.12.221.071.412.164.567.267m0 0a6.492 6.492 0 014.166 5.478m0 0a6.745 6.745 0 01-3.666 5.061m0 0a6.764 6.764 0 01-4.166-5.478m4.166 5.478v3.041m0 0h.953v-1.07m-3.61 1.07h.953v-1.07M9 19.5v-7.042m0 0a6.745 6.745 0 013.666-5.061m0 0a6.492 6.492 0 014.166 5.478" />
        </svg>
        Estimated Cost
      </h2>

      <div className="mb-6">
        {estimateRange.min > 0 && (
          <div>
            <p className="text-slate-700 mb-2">Estimated Starting Range:</p>
            <p className="text-4xl font-bold text-slate-900">
              {formatCurrency(estimateRange.min)} - {formatCurrency(estimateRange.max)}
            </p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg p-4 mb-6 border border-yellow-200">
        <p className="text-slate-700 text-sm mb-3">
          <strong>Based on your selections,</strong> this project may start around{' '}
          <span className="font-bold text-slate-900">
            {formatCurrency(estimateRange.min)} - {formatCurrency(estimateRange.max)}
          </span>
          . Final pricing will be confirmed after review.
        </p>

        <div className="bg-blue-50 rounded p-3 border border-blue-200 mt-3">
          <p className="text-xs text-slate-700">
            <strong>Recommended Package:</strong> {recommendedPackage?.name}
          </p>
          <p className="text-xs text-slate-600 mt-1">{recommendation.reason}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 border border-yellow-200">
        <p className="text-xs text-slate-700">
          <strong>⚠️ Disclaimer:</strong> This is a starting estimate. Final pricing may vary based
          on property size, condition, travel distance, complexity, and final scope.
        </p>
      </div>
    </div>
  );
}
