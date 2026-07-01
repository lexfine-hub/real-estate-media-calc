import Link from 'next/link';
import Navigation from '@/components/Navigation';

export const metadata = {
  title: 'Real Estate Media Services - Ninja Film Studio',
  description: 'Professional real estate photography, videography, and media services for real estate agents',
};

export default function LandingPage() {
  const features = [
    {
      title: 'Professional Photography',
      description: 'High-quality interior and exterior photos with professional editing',
      icon: '📸',
    },
    {
      title: 'Drone Cinematography',
      description: 'Stunning aerial views of properties, neighborhoods, and amenities',
      icon: '🚁',
    },
    {
      title: '3D Walkthroughs',
      description: 'Immersive virtual tours for your listings',
      icon: '🎥',
    },
    {
      title: 'Video Marketing',
      description: 'Cinematic listing videos optimized for social media and MLS',
      icon: '🎬',
    },
    {
      title: 'AI Editing',
      description: 'Advanced enhancements: sky replacement, virtual staging, twilight effects',
      icon: '✨',
    },
    {
      title: 'Real-time Quotes',
      description: 'Get instant price estimates based on your property and services',
      icon: '⚡',
    },
  ];

  return (
    <>
      <Navigation />

      <main className="bg-white">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                Elevate Your Real Estate Listings
              </h1>
              <p className="text-xl text-slate-600 mb-8">
                Professional photography, videography, and media services designed to showcase properties and attract serious buyers.
              </p>
              <div className="flex gap-4">
                <Link
                  href="/quote"
                  className="px-8 py-4 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold rounded-lg transition text-lg"
                >
                  Get a Quote
                </Link>
                <Link
                  href="/client"
                  className="px-8 py-4 border-2 border-slate-900 text-slate-900 font-bold rounded-lg hover:bg-slate-50 transition text-lg"
                >
                  View Your Quotes
                </Link>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-slate-50 rounded-2xl p-12 border border-yellow-200">
              <div className="text-center space-y-4">
                <div className="text-6xl">🎥</div>
                <h3 className="text-2xl font-bold text-slate-900">Premium Media Services</h3>
                <p className="text-slate-600">Everything you need to make your listings stand out</p>
                <div className="pt-4 space-y-3 text-left">
                  <div className="flex items-center gap-3">
                    <span className="text-yellow-400 font-bold">✓</span>
                    <span className="text-slate-700">Professional Photography</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-yellow-400 font-bold">✓</span>
                    <span className="text-slate-700">Drone & Video</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-yellow-400 font-bold">✓</span>
                    <span className="text-slate-700">3D Walkthroughs</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-yellow-400 font-bold">✓</span>
                    <span className="text-slate-700">AI Editing & Effects</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="bg-slate-900 text-white py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Our Services</h2>
              <p className="text-xl text-slate-300">Comprehensive media solutions for real estate professionals</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, idx) => (
                <div key={idx} className="bg-slate-800 rounded-xl p-8 hover:bg-slate-700 transition">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-slate-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
            <p className="text-xl text-slate-600">Simple, streamlined process for getting quotes and managing your media</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Submit Your Request',
                description: 'Fill out our quick quote form with your property details and service needs',
              },
              {
                step: '2',
                title: 'Get Instant Quote',
                description: 'Receive a detailed price estimate with breakdown of services and pricing',
              },
              {
                step: '3',
                title: 'Schedule & Track',
                description: 'Once booked, track your project status and view scheduling updates',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-yellow-400 text-slate-900 font-bold text-2xl rounded-full flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-24">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Elevate Your Listings?</h2>
            <p className="text-xl text-slate-300 mb-8">Get a custom quote for your real estate media needs in minutes</p>
            <Link
              href="/quote"
              className="inline-block px-10 py-4 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold text-lg rounded-lg transition"
            >
              Request a Quote Today
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-100 border-t border-slate-200 py-12">
          <div className="max-w-7xl mx-auto px-6 text-center text-slate-600">
            <p>&copy; 2026 Ninja Film Studio. All rights reserved.</p>
          </div>
        </footer>
      </main>
    </>
  );
}
