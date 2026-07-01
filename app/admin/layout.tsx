import AdminAuthGate from '@/components/admin/AdminAuthGate';
import AdminNavigation from '@/components/admin/AdminNavigation';

export const metadata = {
  title: 'Admin Dashboard - Real Estate Media',
  description: 'Admin dashboard for managing quotes and pricing',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthGate>
      <div className="min-h-screen bg-slate-100">
        <AdminNavigation />
        <div className="max-w-7xl mx-auto px-4 py-8">{children}</div>
      </div>
    </AdminAuthGate>
  );
}
