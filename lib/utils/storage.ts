import { QuoteRequest, PricingConfig } from '@/lib/types';
import { defaultPricingConfig } from '@/lib/pricing/config';

const QUOTES_STORAGE_KEY = 'real_estate_quotes';
const PRICING_STORAGE_KEY = 'real_estate_pricing_config';

let supabaseClient: any = null;

async function getSupabaseClient() {
  if (!supabaseClient && typeof window !== 'undefined') {
    try {
      const { supabase } = await import('@/lib/supabase/client');
      if (supabase && process.env.NEXT_PUBLIC_SUPABASE_URL) {
        supabaseClient = supabase;
      }
    } catch (error) {
      console.debug('Supabase not available, using localStorage');
    }
  }
  return supabaseClient;
}

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

export async function getAllQuotesAsync(): Promise<QuoteRequest[]> {
  const supabase = await getSupabaseClient();

  if (supabase) {
    try {
      const { data, error } = await supabase.from('quotes').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching quotes from Supabase, falling back to localStorage:', error);
    }
  }

  return getAllQuotes();
}

export function getQuoteById(id: string): QuoteRequest | null {
  const quotes = getAllQuotes();
  return quotes.find((q) => q.id === id) || null;
}

export async function getQuoteByIdAsync(id: string): Promise<QuoteRequest | null> {
  const supabase = await getSupabaseClient();

  if (supabase) {
    try {
      const { data, error } = await supabase.from('quotes').select('*').eq('id', id).single();
      if (error && error.code !== 'PGRST116') throw error;
      return data || null;
    } catch (error) {
      console.error('Error fetching quote from Supabase, falling back to localStorage:', error);
    }
  }

  return getQuoteById(id);
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

  saveQuoteToSupabase(quote);
}

async function saveQuoteToSupabase(quote: QuoteRequest): Promise<void> {
  const supabase = await getSupabaseClient();

  if (!supabase) {
    console.debug('Supabase not available, skipping remote save');
    return;
  }

  try {
    console.log('Saving quote to Supabase:', quote.id);
    const { error: upsertError } = await supabase.from('quotes').upsert(
      {
        id: quote.id,
        agent_name: quote.agentInfo.name,
        agent_email: quote.agentInfo.email,
        agent_phone: quote.agentInfo.phone,
        property_address: quote.propertyInfo.address,
        property_city: quote.propertyInfo.city,
        status: quote.status,
        data: quote,
        created_at: quote.createdAt,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'id' }
    );

    if (upsertError) {
      console.error('Supabase upsert error:', upsertError);
      throw upsertError;
    }
    console.log('✅ Quote saved to Supabase successfully');
  } catch (error) {
    console.error('Error saving quote to Supabase:', error instanceof Error ? error.message : error);
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

  deleteQuoteFromSupabase(id);
}

async function deleteQuoteFromSupabase(id: string): Promise<void> {
  const supabase = await getSupabaseClient();

  if (!supabase) return;

  try {
    const { error } = await supabase.from('quotes').delete().eq('id', id);
    if (error) throw error;
  } catch (error) {
    console.error('Error deleting quote from Supabase:', error);
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
