# Supabase Setup Guide

This guide walks you through setting up Supabase for persistent quote storage across all devices.

## What is Supabase?

Supabase is a PostgreSQL database with a simple, open-source backend. It's **free for small projects** and allows quotes to sync across all devices (phone, computer, etc.).

## Step 1: Create a Supabase Project

1. Go to **https://supabase.com**
2. Click **"Start your project"** or **"Sign Up"**
3. Sign in with GitHub, Google, or email
4. Click **"New Project"**
5. Fill in:
   - **Project Name**: `real-estate-media-calc`
   - **Password**: Create a strong password (save this!)
   - **Region**: Choose closest to you (e.g., us-east-1)
6. Click **"Create new project"** and wait 2-3 minutes for it to initialize

## Step 2: Create the Database Schema

Once your project is ready:

1. Go to **"SQL Editor"** in the left sidebar
2. Click **"New Query"**
3. Paste the contents of `supabase-schema.sql` from this project
4. Click **"Run"**
5. You should see: "Success. No rows returned."

## Step 3: Get Your API Keys

1. Go to **"Settings"** → **"API"** in the left sidebar
2. Copy these values:
   - **Project URL** (looks like `https://xxxxx.supabase.co`)
   - **anon public** key (under "Project API keys")

## Step 4: Add to Your .env.local

Open `.env.local` in your project and add:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

Replace:
- `your-project-url` with your Project URL
- `your-anon-key-here` with the anon public key

## Step 5: Add to Vercel (for production)

1. Go to your **Vercel project settings**
2. Click **"Environment Variables"**
3. Add both variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Click **"Save"**
5. Vercel will automatically redeploy

## Step 6: Test It Out

1. Clear localStorage on your devices (browser DevTools → Application → Clear Storage)
2. Go to `realestate.ninjafilmstudio.com`
3. Submit a quote from your phone
4. Check the admin dashboard from a **different device** - the quote should appear!

## That's It! 🎉

Your quotes now sync across all devices. When a client submits a quote:

- ✅ Saved to Supabase (cloud database)
- ✅ Appears on admin dashboard from any device
- ✅ Persists forever (not lost on browser clear)
- ✅ Syncs in real-time

## Troubleshooting

### Quotes not appearing?
- Check if Supabase credentials are in `.env.local`
- Verify you ran the SQL schema
- Check browser console for errors (F12 → Console)

### Getting "Missing environment variables" error?
- Make sure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are in `.env.local`
- Restart your dev server: `npm run dev`

### Still using localStorage?
- That's fine! The app works with or without Supabase
- To fully switch to Supabase, restart dev server after adding env vars

## Next Steps

- **RLS (Row Level Security)**: For production, create proper auth policies so users can only see their own quotes
- **Backup**: Supabase includes automated daily backups (free tier)
- **Scale**: Free tier supports millions of quotes - more than enough for your needs

---

Need help? Create an issue or check Supabase docs at https://supabase.com/docs
