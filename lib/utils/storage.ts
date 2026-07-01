import { QuoteRequest, PricingConfig } from '@/lib/types';
import { defaultPricingConfig } from '@/lib/pricing/config';

const QUOTES_STORAGE_KEY = 'real_estate_quotes';
const PRICING_STORAGE_KEY = 'real_estate_pricing_config';

export function getAllQuotes(): QuoteRequest[] {
  if (typeof window === 'undefined') return [];

  try {
    const data = localStorage.getItem(QUOTES_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading quotes from storage:', error);
    return [];
  }
}

export function getQuoteById(id: string): QuoteRequest | null {
  const quotes = getAllQuotes();
  return quotes.find((q) => q.id === id) || null;
}

export function saveQuote(quote: QuoteRequest): void {
  if (typeof window === 'undefined') return;

  try {
    const quotes = getAllQuotes();
    const index = quotes.findIndex((q) => q.id === quote.id);

    if (index >= 0) {
      quotes[index] = { ...quote, updatedAt: new Date().toISOString() };
    } else {
      quotes.push({
        ...quote,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }

    localStorage.setItem(QUOTES_STORAGE_KEY, JSON.stringify(quotes));
  } catch (error) {
    console.error('Error saving quote to storage:', error);
  }
}

export function deleteQuote(id: string): void {
  if (typeof window === 'undefined') return;

  try {
    const quotes = getAllQuotes();
    const filtered = quotes.filter((q) => q.id !== id);
    localStorage.setItem(QUOTES_STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Error deleting quote from storage:', error);
  }
}

export function getPricingConfig(): PricingConfig {
  if (typeof window === 'undefined') return defaultPricingConfig;

  try {
    const data = localStorage.getItem(PRICING_STORAGE_KEY);
    return data ? JSON.parse(data) : defaultPricingConfig;
  } catch (error) {
    console.error('Error reading pricing config from storage:', error);
    return defaultPricingConfig;
  }
}

export function savePricingConfig(config: PricingConfig): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(PRICING_STORAGE_KEY, JSON.stringify(config));
  } catch (error) {
    console.error('Error saving pricing config to storage:', error);
  }
}

export function resetPricingConfig(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(PRICING_STORAGE_KEY);
  } catch (error) {
    console.error('Error resetting pricing config:', error);
  }
}

export function generateQuoteId(): string {
  return `quote_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
