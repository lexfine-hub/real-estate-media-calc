'use client';

import { useSession, signIn } from 'next-auth/react';
import ClientLogin from '@/components/client/ClientLogin';
import ClientDashboard from '@/components/client/ClientDashboard';

export default function ClientPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
          <p className="mt-4 text-slate-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return <ClientLogin onLogin={() => signIn('google', { callbackUrl: '/client' })} />;
  }

  return <ClientDashboard email={session?.user?.email || ''} onLogout={() => {}} />;
}
