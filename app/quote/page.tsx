import ClientQuoteForm from '@/components/client/ClientQuoteForm';
import Navigation from '@/components/Navigation';

export const metadata = {
  title: 'Get a Quote - Real Estate Media Services',
  description: 'Request a custom quote for professional real estate media services',
};

export default function QuotePage() {
  return (
    <>
      <Navigation />
      <ClientQuoteForm />
    </>
  );
}
