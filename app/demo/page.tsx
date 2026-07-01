'use client';

import { useEffect } from 'react';

export default function DemoPage() {
  useEffect(() => {
    // Create demo quote
    const demoQuote = {
      id: 'quote_demo_luxury_1',
      createdAt: '2026-06-30T22:45:00.000Z',
      updatedAt: '2026-06-30T22:45:00.000Z',
      status: 'new',
      agentInfo: {
        name: 'Sarah Mitchell',
        brokerage: 'Luxury Estates Denver',
        email: 'sarah.mitchell@luxuryestates.com',
        phone: '(303) 555-0142',
        preferredContact: 'email',
      },
      propertyInfo: {
        address: '2847 Cherry Creek Drive',
        city: 'Denver',
        propertyType: 'single-family',
        squareFootage: 5200,
        bedrooms: 5,
        bathrooms: 4.5,
        occupancyStatus: 'occupied',
        listingPrice: 1250000,
        preferredShootDate: '2026-07-15',
        preferredShootTime: 'afternoon',
        targetListingLiveDate: '2026-08-01',
      },
      packageInterest: 'fullMedia',
      selectedPackageId: 'fullMedia',
      selectedServices: ['photos', 'listingVideo', 'dronePhotos', 'droneVideo', 'walkthrough3D', 'verticalReel'],
      selectedAIEditingAddons: {
        virtualTwilightSet: 1,
        virtualStaging: 3,
      },
      droneVisuals: {
        homeExterior: true,
        lotSize: true,
        mountainViews: true,
        neighborhood: true,
        poolOrOutdoorSpace: true,
        restrictions: 'Property is gated - will need access code',
      },
      videoDetails: {
        preferredFormat: 'both',
        usageLocations: ['mls', 'instagram', 'facebook', 'website'],
        musicIncluded: true,
        agentBrandingIncluded: true,
        introOutroCard: true,
      },
      walkthrough3DDetails: {
        measurementsIncluded: true,
        brandingOption: 'branded',
      },
      specialInstructions:
        'Property has recently renovated kitchen and master bath - these should be highlighted. Please capture the mountain views from the south-facing deck.',
      recommendedPackageId: 'fullMedia',
      recommendationReason:
        'Luxury property ($1.25M+) with video, drone, 3D, and social media needs align perfectly with Full Media Package',
      estimateMin: 1275,
      estimateMax: 1530,
    };

    try {
      // Save to localStorage
      const existingQuotes = localStorage.getItem('real_estate_quotes');
      let quotes = existingQuotes ? JSON.parse(existingQuotes) : [];
      const quoteExists = quotes.some((q: any) => q.id === demoQuote.id);
      if (!quoteExists) {
        quotes.push(demoQuote);
        localStorage.setItem('real_estate_quotes', JSON.stringify(quotes));
      }

      // Set admin authentication
      localStorage.setItem('admin_authenticated', 'true');

      // Redirect to admin quotes
      setTimeout(() => {
        window.location.href = '/admin/quotes';
      }, 1500);
    } catch (error) {
      console.error('Error setting up demo:', error);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white flex items-center justify-center">
      <div className="text-center">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400 text-white rounded-full mb-4">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 012-2 1 1 0 000 2H3a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V6a1 1 0 00-1-1h3a1 1 0 000-2h-2a2 2 0 00-2 2v1H4V5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Loading Demo...</h1>
          <p className="text-xl text-slate-600">Setting up sample quote and admin session</p>
        </div>

        <div className="space-y-4 mt-8">
          <div className="flex items-center gap-3 justify-center text-slate-700">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <span>Creating demo luxury property quote...</span>
          </div>
          <div className="flex items-center gap-3 justify-center text-slate-700">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <span>Authenticating admin session...</span>
          </div>
          <div className="flex items-center gap-3 justify-center text-slate-700">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <span>Redirecting to admin quotes panel...</span>
          </div>
        </div>

        <div className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200 max-w-md">
          <p className="text-sm text-slate-700">
            <strong>Demo Info:</strong> A luxury property quote from Sarah Mitchell ($1.25M listing with full media services)
            will appear in the admin panel.
          </p>
        </div>
      </div>
    </div>
  );
}
