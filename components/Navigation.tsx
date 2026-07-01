'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

export default function Navigation() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-slate-900">
          Ninja Film Studio
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/#features" className="text-slate-700 hover:text-slate-900 font-semibold">
            Features
          </Link>
          <Link href="/quote" className="text-slate-700 hover:text-slate-900 font-semibold">
            Get Quote
          </Link>

          {!session ? (
            <>
              <Link
                href="/client"
                className="px-4 py-2 bg-white border border-yellow-400 text-slate-900 font-semibold rounded-lg hover:bg-yellow-50 transition"
              >
                Client Login
              </Link>
              <Link
                href="/admin"
                className="px-4 py-2 bg-slate-900 text-white font-semibold rounded-lg hover:bg-slate-800 transition"
              >
                Admin
              </Link>
            </>
          ) : (
            <>
              <span className="text-sm text-slate-600">{session.user?.email}</span>
              <button
                onClick={() => signOut()}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition"
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
