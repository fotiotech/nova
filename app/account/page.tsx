'use client';

import { useState, useEffect } from 'react';
import { useSession, signIn, signUp } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  if (status === 'loading') {
    return <div className="pt-24 text-center text-txt-muted">Chargement...</div>;
  }

  if (session) {
    return (
      <div className="pt-24 pb-20 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl font-semibold tracking-tight mb-1">Mon Compte</h1>
              <p className="text-txt-muted text-sm">Bienvenue, {session.user?.name}</p>
            </div>
            <button onClick={() => signOut()} className="border border-white/12 text-txt-primary font-medium text-[10px] uppercase tracking-widest px-4 py-2 rounded-lg hover:border-white/25 transition-all flex items-center gap-1">
              <iconify-icon icon="lucide:log-out" width="12"></iconify-icon> Déconnexion
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-surface border border-white/5 rounded-xl p-5"><div className="text-txt-muted text-xs uppercase tracking-widest mb-2">Nom</div><div className="font-semibold">{session.user?.name}</div></div>
            <div className="bg-surface border border-white/5 rounded-xl p-5"><div className="text-txt-muted text-xs uppercase tracking-widest mb-2">Email</div><div className="font-semibold">{session.user?.email}</div></div>
            <div className="bg-surface border border-white/5 rounded-xl p-5"><div className="text-txt-muted text-xs uppercase tracking-widest mb-2">Rôle</div><div className="font-semibold text-nova-blue">{(session.user as any)?.role === 'admin' ? 'Administrateur' : 'Client'}</div></div>
          </div>
          {(session.user as any)?.role === 'admin' && (
            <button onClick={() => router.push('/admin')} className="bg-nova-blue text-white font-semibold text-xs uppercase tracking-widest px-6 py-3 rounded-lg hover:bg-nova-blue-light transition-all">
              Accéder au Tableau de Bord
            </button>
          )}
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isRegister) {
      // Inscription — créer le compte via API
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, phone }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || 'Erreur'); return; }
      // Connecter automatiquement
      await signIn('credentials', { email, password, callbackUrl: '/account' });
    } else {
      const result = await signIn('credentials', {
        email,
        password,
        callbackUrl: '/account',
      });
      if (result?.error) setError('Email ou mot de passe incorrect');
    }
  };

  return (
    <div className="pt-24 pb-20 px-4 md:px-6">
      <div className="max-w-md mx-auto">
        <h1 className="font-display text-3xl font-semibold tracking-tight mb-8 text-center">
          {isRegister ? 'Créer un Compte' : 'Connexion'}
        </h1>
        <form onSubmit={handleSubmit} className="bg-surface border border-white/5 rounded-xl p-6 space-y-4">
          {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg p-3">{error}</div>}
          {isRegister && (
            <div><label className="text-xs text-txt-muted mb-1 block">Nom complet *</label><input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full bg-surface border border-white/8 rounded-lg p-3 text-sm text-txt-primary focus:border-nova-blue focus:outline-none" placeholder="Jean Dupont" /></div>
          )}
          <div><label className="text-xs text-txt-muted mb-1 block">Email *</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full bg-surface border border-white/8 rounded-lg p-3 text-sm text-txt-primary focus:border-nova-blue focus:outline-none" placeholder="jean@email.com" /></div>
          <div><label className="text-xs text-txt-muted mb-1 block">Mot de passe *</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full bg-surface border border-white/8 rounded-lg p-3 text-sm text-txt-primary focus:border-nova-blue focus:outline-none" placeholder="••••••••" /></div>
          {isRegister && (
            <div><label className="text-xs text-txt-muted mb-1 block">Téléphone</label><input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="w-full bg-surface border border-white/8 rounded-lg p-3 text-sm text-txt-primary focus:border-nova-blue focus:outline-none" placeholder="+237 6XX XXX XXX" /></div>
          )}
          <button type="submit" className="w-full bg-nova-blue text-white font-semibold text-xs uppercase tracking-widest py-3 rounded-lg hover:bg-nova-blue-light transition-all">
            {isRegister ? 'Créer le Compte' : 'Se Connecter'}
          </button>
          <p className="text-center text-sm text-txt-muted">
            {isRegister ? 'Déjà un compte ?' : 'Pas encore de compte ?'}
            <button type="button" onClick={() => { setIsRegister(!isRegister); setError(''); }} className="text-nova-blue hover:text-nova-blue-light ml-1 transition-colors">
              {isRegister ? 'Se connecter' : "S'inscrire"}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
    }
