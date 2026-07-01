export async function checkSupabaseConnection(): Promise<{
  configured: boolean;
  connected: boolean;
  error?: string;
  message: string;
}> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return {
      configured: false,
      connected: false,
      message: 'Supabase credentials not configured. Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in environment variables.',
    };
  }

  try {
    const response = await fetch(`${url}/rest/v1/`, {
      method: 'GET',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
      },
    });

    if (response.ok) {
      return {
        configured: true,
        connected: true,
        message: 'Successfully connected to Supabase! ✅',
      };
    }

    return {
      configured: true,
      connected: false,
      error: `HTTP ${response.status}: ${response.statusText}`,
      message: 'Supabase credentials provided but connection failed.',
    };
  } catch (error) {
    return {
      configured: true,
      connected: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      message: 'Failed to connect to Supabase. Check your credentials and network.',
    };
  }
}
