import { PricingConfig } from '@/lib/types';

export const defaultPricingConfig: PricingConfig = {
  packages: {
    essential: {
      id: 'essential',
      name: 'Essential Photo Package',
      basePrice: 175,
      description: 'Professional interior and exterior photos',
      includes: [
        'Professional interior and exterior photos',
        'MLS-ready editing',
        'Online gallery delivery',
        '24 to 48 hour turnaround',
      ],
    },
    photoFloorPlan: {
      id: 'photoFloorPlan',
      name: 'Photo + Floor Plan Package',
      basePrice: 250,
      description: 'Photos with floor plan',
      includes: [
        'Professional interior and exterior photos',
        'Floor plan',
        'MLS-ready editing',
        'Online gallery delivery',
        '24 to 48 hour turnaround',
      ],
    },
    premium: {
      id: 'premium',
      name: 'Premium Listing Package',
      basePrice: 450,
      description: 'Photos, floor plan, drone, and 3D walkthrough',
      includes: [
        'Professional interior and exterior photos',
        'Floor plan',
        'Drone photos',
        '3D walkthrough',
        'Short vertical social media reel',
        'MLS-ready editing',
        'Online gallery delivery',
      ],
    },
    fullMedia: {
      id: 'fullMedia',
      name: 'Full Media Package',
      basePrice: 850,
      description: 'Complete media solution with video',
      includes: [
        'Professional interior and exterior photos',
        'Cinematic listing video',
        '3D walkthrough',
        'Floor plan',
        'Drone photos',
        'Drone video clips',
        'Vertical social media reel',
        'MLS-ready editing',
        'AI editing add-ons',
        'Online gallery delivery',
      ],
    },
  },

  sqftAdjustments: [
    { min: 0, max: 1499, adjustment: 0 },
    { min: 1500, max: 2499, adjustment: 50 },
    { min: 2500, max: 3499, adjustment: 100 },
    { min: 3500, max: 4499, adjustment: 175 },
    { min: 4500, max: 5999, adjustment: 250 },
    { min: 6000, max: Infinity, adjustment: 350 },
  ],

  alaCarte: {
    photos: { id: 'photos', name: 'Professional photos only', price: 175 },
    floorPlan: { id: 'floorPlan', name: 'Floor plan', price: 100 },
    dronePhotos: { id: 'dronePhotos', name: 'Drone photos', price: 150 },
    droneVideo: { id: 'droneVideo', name: 'Drone video clips', price: 200 },
    listingVideo: { id: 'listingVideo', name: 'Listing video', price: 300 },
    walkthrough3D: { id: 'walkthrough3D', name: '3D walkthrough', price: 200 },
    verticalReel: { id: 'verticalReel', name: 'Vertical social media reel', price: 150 },
  },

  aiEditing: {
    twilightExterior: {
      id: 'twilightExterior',
      name: 'Twilight exterior edit',
      pricePerUnit: 40,
      unit: 'per image',
    },
    virtualTwilightSet: {
      id: 'virtualTwilightSet',
      name: 'Virtual twilight set',
      flatFee: 125,
    },
    skyReplacement: {
      id: 'skyReplacement',
      name: 'Sky replacement',
      pricePerUnit: 15,
      unit: 'per image',
    },
    grassEnhancement: {
      id: 'grassEnhancement',
      name: 'Grass enhancement',
      pricePerUnit: 15,
      unit: 'per image',
    },
    windowViewEnhancement: {
      id: 'windowViewEnhancement',
      name: 'Window view enhancement',
      pricePerUnit: 15,
      unit: 'per image',
    },
    fireplaceFireAddon: {
      id: 'fireplaceFireAddon',
      name: 'Fireplace fire add-on',
      pricePerUnit: 10,
      unit: 'per image',
    },
    tvScreenReplacement: {
      id: 'tvScreenReplacement',
      name: 'TV screen replacement',
      pricePerUnit: 10,
      unit: 'per image',
    },
    objectRemoval: {
      id: 'objectRemoval',
      name: 'Object removal',
      pricePerUnit: 15,
      unit: 'per image',
    },
    vehicleRemoval: {
      id: 'vehicleRemoval',
      name: 'Vehicle removal',
      pricePerUnit: 20,
      unit: 'per image',
    },
    signRemoval: {
      id: 'signRemoval',
      name: 'Sign removal',
      pricePerUnit: 15,
      unit: 'per image',
    },
    cordCleanup: {
      id: 'cordCleanup',
      name: 'Cord or reflection cleanup',
      pricePerUnit: 15,
      unit: 'per image',
    },
    decluttering: {
      id: 'decluttering',
      name: 'Decluttering',
      pricePerUnit: 25,
      unit: 'per image',
    },
    virtualStaging: {
      id: 'virtualStaging',
      name: 'Virtual staging',
      pricePerUnit: 40,
      unit: 'per image',
    },
    virtualDecluttering: {
      id: 'virtualDecluttering',
      name: 'Virtual decluttering',
      pricePerUnit: 25,
      unit: 'per image',
    },
    emptyRoomEnhancement: {
      id: 'emptyRoomEnhancement',
      name: 'Empty room enhancement',
      pricePerUnit: 20,
      unit: 'per image',
    },
    seasonalExteriorEdit: {
      id: 'seasonalExteriorEdit',
      name: 'Seasonal exterior edit',
      pricePerUnit: 25,
      unit: 'per image',
    },
  },

  rushDeliveryFee: 75,
  travelFeeDefault: 0,
  taxRate: 0,

  defaultQuoteDisclaimer:
    'This is a starting estimate. Final pricing may vary based on property size, condition, travel distance, complexity, and final scope.',

  defaultClientNotes: '',
};
