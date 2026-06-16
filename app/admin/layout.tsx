'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/account');
    if (status === 'authenticated' && (session?.user as any)?.role !== 'admin') router.push('/');
  }, [session, status, router]);

  if (status === 'loading') return <div className="pt-24 text-center text-txt-muted">Chargement...</div>;
  if (!session || (session.user as any)?.role !== 'admin') return null;

  return (
    <div className="pt-16 flex min-h-screen">
      <aside className="hidden md:flex flex-col w-56 border-r border-white/5 bg-panel p-4 pt-20 gap-1 flex-shrink-0">
        <div className="text-[9px] uppercase tracking-widest text-txt-muted px-4 mb-2">Administration</div>
        <a href="/admin" className="admin-sidebar-item active"><iconify-icon icon="lucide:layout-dashboard" width="17"></iconify-icon> Tableau de bord</a>
        <a href="/admin/products" className="admin-sidebar-item"><iconify-icon icon="lucide:package" width="17"></iconify-icon> Produits</a>
        <a href="/admin/orders" className="admin-sidebar-item"><iconify-icon icon="lucide:receipt" width="17"></iconify-icon> Commandes</a>
        <a href="/admin/clients" className="admin-sidebar-item"><iconify-icon icon="lucide:users" width="17"></iconify-icon> Clients</a>
        <div className="text-[9px] uppercase tracking-widest text-txt-muted px-4 mt-4 mb-2">Intégrations</div>
        <a href="/admin/connections" className="admin-sidebar-item"><iconify-icon icon="lucide:plug" width="17"></iconify-icon> Connexions</a>
        <a href="/admin/settings" className="admin-sidebar-item"><iconify-icon icon="lucide:settings-2" width="17"></iconify-icon> Paramètres</a>
        <div className="mt-auto pt-4 border-t border-white/5">
          <a href="/" className="admin-sidebar-item"><iconify-icon icon="lucide:external-link" width="17"></iconify-icon> Voir la Boutique</a>
        </div>
      </aside>
      <main className="flex-1 p-4 md:p-10 md:pt-20 pb-10 overflow-y-auto">{children}</main>
    </div>
  );
}
