import ClientQuoteForm from '@/components/client/ClientQuoteForm';

export const metadata = {
  title: 'Real Estate Media Quote Request',
  description: 'Request a custom quote for professional real estate media services',
};

export default function Home() {
  return <ClientQuoteForm />;
}
