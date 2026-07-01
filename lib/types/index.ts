export type QuoteStatus = 'new' | 'reviewing' | 'quote_sent' | 'booked' | 'lost' | 'archived';

export type PreferredContactMethod = 'email' | 'phone' | 'text';
export type PropertyType = 'single-family' | 'condo' | 'townhome' | 'multi-family' | 'land' | 'commercial' | 'other';
export type OccupancyStatus = 'occupied' | 'vacant';
export type PreferredShootTime = 'morning' | 'afternoon' | 'twilight' | 'flexible';
export type VideoFormat = 'horizontal' | 'vertical' | 'both';
export type BrandingOption = 'branded' | 'unbranded' | 'both';

export interface AgentInfo {
  name: string;
  brokerage: string;
  email: string;
  phone: string;
  preferredContact: PreferredContactMethod;
}

export interface PropertyInfo {
  address: string;
  city: string;
  propertyType: PropertyType;
  squareFootage: number;
  bedrooms: number;
  bathrooms: number;
  occupancyStatus: OccupancyStatus;
  listingPrice: number;
  preferredShootDate: string;
  preferredShootTime: PreferredShootTime;
  targetListingLiveDate: string;
}

export interface Package {
  id: string;
  name: string;
  basePrice: number;
  description: string;
  includes: string[];
}

export interface Service {
  id: string;
  name: string;
  price: number;
}

export interface AIEditingAddon {
  id: string;
  name: string;
  pricePerUnit: number;
  flatFee?: number;
  unit?: string;
}

export interface DroneVisuals {
  homeExterior?: boolean;
  lotSize?: boolean;
  mountainViews?: boolean;
  neighborhood?: boolean;
  nearbyAmenities?: boolean;
  acreageOrLand?: boolean;
  poolOrOutdoorSpace?: boolean;
  other?: boolean;
  restrictions?: string;
}

export interface VideoDetails {
  preferredFormat?: VideoFormat;
  usageLocations?: string[];
  musicIncluded?: boolean;
  agentBrandingIncluded?: boolean;
  introOutroCard?: boolean;
}

export interface Walkthrough3DDetails {
  measurementsIncluded?: boolean;
  brandingOption?: BrandingOption;
}

export interface QuoteRequest {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: QuoteStatus;
  agentInfo: AgentInfo;
  propertyInfo: PropertyInfo;
  packageInterest?: string;
  selectedPackageId?: string;
  selectedServices: string[];
  droneVisuals?: DroneVisuals;
  videoDetails?: VideoDetails;
  walkthrough3DDetails?: Walkthrough3DDetails;
  selectedAIEditingAddons: Record<string, number>;
  specialInstructions?: string;
  internalNotes?: string;
  clientNotes?: string;
  estimateMin?: number;
  estimateMax?: number;
  finalTotal?: number;
  sqftAdjustment?: number;
  rushDelivery?: boolean;
  travelFee?: number;
  customLineItems?: LineItem[];
  discountAmount?: number;
  discountPercentage?: number;
  applySalesTax?: boolean;
  recommendedPackageId?: string;
  recommendationReason?: string;
}

export interface LineItem {
  id: string;
  description: string;
  amount: number;
}

export interface PricingConfig {
  packages: Record<string, Package>;
  sqftAdjustments: {
    min: number;
    max: number;
    adjustment: number;
  }[];
  alaCarte: Record<string, Service>;
  aiEditing: Record<string, AIEditingAddon>;
  rushDeliveryFee: number;
  travelFeeDefault: number;
  taxRate: number;
  defaultQuoteDisclaimer: string;
  defaultClientNotes: string;
}

export interface QuoteSummary {
  basePackagePrice: number;
  sqftAdjustment: number;
  selectedServices: Array<{ name: string; price: number }>;
  aiEditingAddons: Array<{ name: string; quantity: number; totalPrice: number }>;
  rushDelivery: number;
  travelFee: number;
  customLineItems: LineItem[];
  subtotal: number;
  discount: number;
  taxAmount: number;
  finalTotal: number;
}
