-- Create quotes table for Supabase
CREATE TABLE IF NOT EXISTS quotes (
  id TEXT PRIMARY KEY,
  agent_name TEXT NOT NULL,
  agent_email TEXT,
  agent_phone TEXT,
  property_address TEXT NOT NULL,
  property_city TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  data JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS quotes_status_idx ON quotes(status);
CREATE INDEX IF NOT EXISTS quotes_created_at_idx ON quotes(created_at DESC);
CREATE INDEX IF NOT EXISTS quotes_agent_name_idx ON quotes(agent_name);
CREATE INDEX IF NOT EXISTS quotes_property_city_idx ON quotes(property_city);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow all access (remove this in production and create proper auth policies)
CREATE POLICY "Allow all access" ON quotes
  FOR ALL
  USING (true)
  WITH CHECK (true);
