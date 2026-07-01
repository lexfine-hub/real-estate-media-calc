import { PricingConfig, QuoteRequest, QuoteSummary } from '@/lib/types';

export function getSquareFootageAdjustment(
  sqft: number,
  pricingConfig: PricingConfig
): number {
  const adjustment = pricingConfig.sqftAdjustments.find(
    (adj) => sqft >= adj.min && sqft <= adj.max
  );
  return adjustment?.adjustment || 0;
}

export function calculateQuoteSummary(
  quote: QuoteRequest,
  pricingConfig: PricingConfig
): QuoteSummary {
  let basePackagePrice = 0;

  if (quote.selectedPackageId) {
    const pkg = pricingConfig.packages[quote.selectedPackageId];
    if (pkg) {
      basePackagePrice = pkg.basePrice;
    }
  }

  const sqftAdjustment = quote.propertyInfo.squareFootage
    ? getSquareFootageAdjustment(quote.propertyInfo.squareFootage, pricingConfig)
    : 0;

  const selectedServices: Array<{ name: string; price: number }> = [];
  quote.selectedServices.forEach((serviceId) => {
    const service = pricingConfig.alaCarte[serviceId];
    if (service) {
      selectedServices.push({ name: service.name, price: service.price });
    }
  });

  const aiEditingAddons: Array<{ name: string; quantity: number; totalPrice: number }> = [];
  let aiEditingTotal = 0;

  Object.entries(quote.selectedAIEditingAddons).forEach(([addonId, quantity]) => {
    const addon = pricingConfig.aiEditing[addonId];
    if (addon && quantity > 0) {
      const totalPrice = addon.flatFee || addon.pricePerUnit * quantity;
      aiEditingAddons.push({ name: addon.name, quantity, totalPrice });
      aiEditingTotal += totalPrice;
    }
  });

  const rushDelivery = quote.rushDelivery ? pricingConfig.rushDeliveryFee : 0;
  const travelFee = quote.travelFee || 0;

  let customLineItemsTotal = 0;
  const customLineItems = quote.customLineItems || [];
  customLineItems.forEach((item) => {
    customLineItemsTotal += item.amount;
  });

  const servicesTotal = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const subtotal =
    basePackagePrice +
    sqftAdjustment +
    servicesTotal +
    aiEditingTotal +
    rushDelivery +
    travelFee +
    customLineItemsTotal;

  const discountAmount =
    (quote.discountAmount || 0) + (subtotal * (quote.discountPercentage || 0)) / 100;
  const subtotalAfterDiscount = Math.max(0, subtotal - discountAmount);

  const taxAmount = quote.applySalesTax ? (subtotalAfterDiscount * pricingConfig.taxRate) / 100 : 0;
  const finalTotal = subtotalAfterDiscount + taxAmount;

  return {
    basePackagePrice,
    sqftAdjustment,
    selectedServices,
    aiEditingAddons,
    rushDelivery,
    travelFee,
    customLineItems,
    subtotal,
    discount: discountAmount,
    taxAmount,
    finalTotal,
  };
}

export function getRecommendedPackage(quote: QuoteRequest): {
  packageId: string;
  reason: string;
} {
  const services = new Set(quote.selectedServices);
  const listingPrice = quote.propertyInfo.listingPrice || 0;
  const sqft = quote.propertyInfo.squareFootage || 0;

  // High-end luxury property
  if (listingPrice >= 1000000) {
    return {
      packageId: 'fullMedia',
      reason:
        'Luxury property ($1M+) benefits from complete multimedia presentation across all channels',
    };
  }

  // High-value property
  if (listingPrice >= 750000) {
    return {
      packageId: 'premium',
      reason:
        'High-value property ($750K+) deserves premium visual presentation with drone and 3D features',
    };
  }

  // Video or complex media requested
  if (services.has('listingVideo') || services.has('droneVideo') || services.has('walkthrough3D')) {
    if (
      services.has('floorPlan') ||
      services.has('dronePhotos') ||
      services.has('verticalReel')
    ) {
      return {
        packageId: 'fullMedia',
        reason: 'Your video, drone, and 3D selections are comprehensively covered in Full Media Package',
      };
    }
    return {
      packageId: 'premium',
      reason: 'Video and 3D elements you requested are included in Premium Package',
    };
  }

  // Drone or 3D walkthrough requested
  if (services.has('dronePhotos') || services.has('walkthrough3D')) {
    if (services.has('verticalReel')) {
      return {
        packageId: 'premium',
        reason:
          'Your drone, 3D walkthrough, and social media needs align perfectly with Premium Package',
      };
    }
    return {
      packageId: 'premium',
      reason: 'Drone photos and 3D walkthrough features are included in Premium Package',
    };
  }

  // Floor plan + photos
  if (services.has('floorPlan') && services.has('photos')) {
    return {
      packageId: 'photoFloorPlan',
      reason: 'Photo + Floor Plan Package includes both services you need',
    };
  }

  // Just floor plan
  if (services.has('floorPlan')) {
    return {
      packageId: 'photoFloorPlan',
      reason: 'Floor plan is included in Photo + Floor Plan Package',
    };
  }

  // Default: Essential package
  return {
    packageId: 'essential',
    reason: 'Essential Photo Package provides professional photos with fast turnaround',
  };
}

export function calculateEstimateRange(
  quote: QuoteRequest,
  pricingConfig: PricingConfig
): { min: number; max: number } {
  const recommended = getRecommendedPackage(quote);
  const pkg = pricingConfig.packages[recommended.packageId];
  const basePrice = pkg?.basePrice || 175;

  // Create a temporary quote with the recommended package
  const tempQuote: QuoteRequest = {
    ...quote,
    selectedPackageId: recommended.packageId,
  };

  const summary = calculateQuoteSummary(tempQuote, pricingConfig);
  const min = Math.round(summary.finalTotal);
  const max = Math.round(summary.finalTotal * 1.2); // 20% buffer for uncertainties

  return { min, max };
}
