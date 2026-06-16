'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-base/90 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto h-full px-4 md:px-6 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-display font-bold text-lg tracking-tight flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-nova-blue via-nova-orange to-nova-green flex items-center justify-center">
              <span className="text-white text-xs font-bold">N</span>
            </div>
            <span className="bg-gradient-to-r from-nova-blue via-nova-orange to-nova-green bg-clip-text text-transparent">NovaOrizon</span>
          </Link>
          <div className="hidden md:flex items-center gap-5">
            <Link href="/" className="text-[11px] uppercase tracking-widest text-txt-secondary hover:text-white transition-colors">Accueil</Link>
            <Link href="/shop" className="text-[11px] uppercase tracking-widest text-txt-secondary hover:text-white transition-colors">Boutique</Link>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/shop" className="p-2 text-txt-secondary hover:text-white transition-colors">
            <iconify-icon icon="lucide:search" width="17"></iconify-icon>
          </Link>
          <Link href="/cart" className="p-2 text-txt-secondary hover:text-white transition-colors relative">
            <iconify-icon icon="lucide:shopping-bag" width="17"></iconify-icon>
          </Link>
          {session ? (
            <div className="flex items-center gap-2">
              <Link href="/account" className="p-2 text-txt-secondary hover:text-white transition-colors">
                <iconify-icon icon="lucide:user" width="17"></iconify-icon>
              </Link>
              {session.user && (session.user as any).role === 'admin' && (
                <Link href="/admin" className="p-2 text-txt-secondary hover:text-white transition-colors">
                  <iconify-icon icon="lucide:settings" width="17"></iconify-icon>
                </Link>
              )}
            </div>
          ) : (
            <Link href="/account" className="p-2 text-txt-secondary hover:text-white transition-colors">
              <iconify-icon icon="lucide:user" width="17"></iconify-icon>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
