'use client';

import { useState } from 'react';
import { QuoteRequest, AgentInfo, PropertyInfo } from '@/lib/types';
import { generateQuoteId, saveQuote } from '@/lib/utils/storage';
import { calculateEstimateRange, getRecommendedPackage } from '@/lib/utils/calculations';
import { defaultPricingConfig } from '@/lib/pricing/config';
import { formatCurrency } from '@/lib/utils/format';
import AgentInfoSection from './sections/AgentInfoSection';
import PropertyInfoSection from './sections/PropertyInfoSection';
import PackageSelectionSection from './sections/PackageSelectionSection';
import ServicesSection from './sections/ServicesSection';
import DroneVisualsSection from './sections/DroneVisualsSection';
import VideoDetailsSection from './sections/VideoDetailsSection';
import WalkthroughDetailsSection from './sections/WalkthroughDetailsSection';
import AIEditingSection from './sections/AIEditingSection';
import SpecialInstructionsSection from './sections/SpecialInstructionsSection';
import EstimatePreview from './EstimatePreview';

export default function ClientQuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<QuoteRequest>({
    id: generateQuoteId(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    status: 'new',
    agentInfo: {
      name: '',
      brokerage: '',
      email: '',
      phone: '',
      preferredContact: 'email',
    },
    propertyInfo: {
      address: '',
      city: '',
      propertyType: 'single-family',
      squareFootage: 0,
      bedrooms: 0,
      bathrooms: 0,
      occupancyStatus: 'occupied',
      listingPrice: 0,
      preferredShootDate: '',
      preferredShootTime: 'flexible',
      targetListingLiveDate: '',
    },
    selectedServices: [],
    selectedAIEditingAddons: {},
  });

  const estimateRange = calculateEstimateRange(formData, defaultPricingConfig);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (
      !formData.agentInfo.name ||
      (!formData.agentInfo.email && !formData.agentInfo.phone) ||
      !formData.propertyInfo.address ||
      !formData.propertyInfo.city ||
      !formData.propertyInfo.squareFootage ||
      !formData.propertyInfo.preferredShootDate ||
      (formData.selectedServices.length === 0 && !formData.packageInterest)
    ) {
      alert(
        'Please fill in all required fields: Agent name, contact info, property details, and service selections.'
      );
      return;
    }

    // Get recommendation
    const recommendation = getRecommendedPackage(formData);
    formData.recommendedPackageId = recommendation.packageId;
    formData.recommendationReason = recommendation.reason;

    // Save the quote
    saveQuote(formData);
    setSubmitted(true);

    // Scroll to confirmation
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="max-w-2xl w-full">
          <div className="bg-gradient-to-br from-yellow-50 to-white rounded-2xl border-2 border-yellow-400 p-8 text-center">
            <div className="mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400 rounded-full mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Thank You!</h2>
              <p className="text-lg text-slate-700">
                Your quote request has been submitted successfully.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 mb-6 border border-slate-200">
              <p className="text-slate-700 mb-2">
                <strong>Agent Name:</strong> {formData.agentInfo.name}
              </p>
              <p className="text-slate-700 mb-2">
                <strong>Property:</strong> {formData.propertyInfo.address}, {formData.propertyInfo.city}
              </p>
              <p className="text-slate-700">
                <strong>Preferred Contact:</strong> {formData.agentInfo.preferredContact}
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-200">
              <p className="text-slate-700 text-sm">
                We'll review the details of your listing and follow up with a custom quote within
                24 hours. You'll hear from us at your preferred contact method.
              </p>
            </div>

            <button
              onClick={() => {
                setSubmitted(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Submit Another Request
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Real Estate Media Quote Request
          </h1>
          <p className="text-xl text-slate-600">
            Tell us about your listing and the media services you need. We'll review your request and
            send back a custom quote.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-8">
            {/* Agent Information */}
            <AgentInfoSection formData={formData} setFormData={setFormData} />

            {/* Property Information */}
            <PropertyInfoSection formData={formData} setFormData={setFormData} />

            {/* Package Interest */}
            <PackageSelectionSection formData={formData} setFormData={setFormData} />

            {/* Services */}
            <ServicesSection formData={formData} setFormData={setFormData} />

            {/* Conditional Sections */}
            {(formData.selectedServices.includes('dronePhotos') ||
              formData.selectedServices.includes('droneVideo')) && (
              <DroneVisualsSection formData={formData} setFormData={setFormData} />
            )}

            {(formData.selectedServices.includes('listingVideo') ||
              formData.selectedServices.includes('droneVideo') ||
              formData.selectedServices.includes('verticalReel')) && (
              <VideoDetailsSection formData={formData} setFormData={setFormData} />
            )}

            {(formData.selectedServices.includes('walkthrough3D') ||
              formData.selectedServices.includes('floorPlan')) && (
              <WalkthroughDetailsSection formData={formData} setFormData={setFormData} />
            )}

            {/* AI Editing Addons */}
            <AIEditingSection formData={formData} setFormData={setFormData} />

            {/* Special Instructions */}
            <SpecialInstructionsSection formData={formData} setFormData={setFormData} />

            {/* Estimate Preview */}
            <EstimatePreview formData={formData} estimateRange={estimateRange} />

            {/* Submit Button */}
            <div className="flex justify-center pt-8">
              <button
                type="submit"
                className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg"
              >
                Submit Quote Request
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
