'use client';

import { useState } from 'react';
import ClientLogin from '@/components/client/ClientLogin';
import ClientDashboard from '@/components/client/ClientDashboard';

export default function ClientPage() {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  if (!userEmail) {
    return <ClientLogin onLogin={setUserEmail} />;
  }

  return <ClientDashboard email={userEmail} onLogout={() => setUserEmail(null)} />;
}
