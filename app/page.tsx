import Link from 'next/link';

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden" style={{backgroundImage:'linear-gradient(rgba(255,255,255,.015) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.015) 1px,transparent 1px)',backgroundSize:'60px 60px'}}>
        <div className="absolute inset-0" style={{background:'radial-gradient(ellipse at 30% 50%,rgba(37,99,235,.08) 0%,transparent 50%),radial-gradient(ellipse at 70% 50%,rgba(249,115,22,.06) 0%,transparent 50%),radial-gradient(ellipse at 50% 80%,rgba(22,163,74,.05) 0%,transparent 50%)'}}></div>
        <div className="absolute inset-0">
          <img src="https://picsum.photos/seed/cameroon-douala/1920/1080.jpg" alt="" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-t from-base via-base/70 to-transparent"></div>
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-nova-blue/20 mb-8 text-[11px] tracking-widest uppercase text-txt-secondary bg-nova-blue/5">
            <span className="w-1.5 h-1.5 rounded-full bg-nova-green animate-pulse"></span>
            Marketplace du Cameroun
          </div>
          <h1 className="font-display text-5xl md:text-8xl font-semibold tracking-tighter leading-[0.9] mb-6">
            Achetez<br />
            <span className="bg-gradient-to-r from-nova-blue via-nova-orange to-nova-green bg-clip-text text-transparent">Local</span>
          </h1>
          <p className="text-txt-secondary text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            La marketplace moderne du Cameroun. Payez avec Campay ou à la livraison. De Douala à Yaoundé, achetez en toute confiance.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/shop" className="bg-nova-blue text-white font-semibold text-xs uppercase tracking-widest px-6 py-3 rounded-lg hover:bg-nova-blue-light transition-all flex items-center gap-2">
              <iconify-icon icon="lucide:shopping-bag" width="14"></iconify-icon> Voir la Boutique
            </Link>
            <Link href="/account" className="border border-white/12 text-txt-primary font-medium text-xs uppercase tracking-widest px-6 py-3 rounded-lg hover:border-white/25 transition-all">
              Mon Compte
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div><div className="font-display text-3xl font-semibold text-nova-blue">2 500+</div><div className="text-txt-muted text-[10px] uppercase tracking-widest mt-1">Produits</div></div>
          <div><div className="font-display text-3xl font-semibold text-nova-orange">10</div><div className="text-txt-muted text-[10px] uppercase tracking-widest mt-1">Régions</div></div>
          <div><div className="font-display text-3xl font-semibold text-nova-green">XAF</div><div className="text-txt-muted text-[10px] uppercase tracking-widest mt-1">Devise</div></div>
          <div><div className="font-display text-3xl font-semibold">Campay</div><div className="text-txt-muted text-[10px] uppercase tracking-widest mt-1">Paiement</div></div>
        </div>
      </section>

      {/* Paiements */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-display text-2xl md:text-3xl font-semibold tracking-tight mb-4">Paiements Flexibles</h2>
          <p className="text-txt-secondary text-sm mb-12 max-w-lg mx-auto">Payez comme ça vous arrange — Mobile Money avec Campay ou espèces à la livraison.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-surface border border-white/5 rounded-xl p-6 text-center">
              <div className="w-14 h-14 rounded-xl bg-nova-green/10 flex items-center justify-center mx-auto mb-4"><iconify-icon icon="lucide:smartphone" width="24" class="text-nova-green"></iconify-icon></div>
              <h3 className="font-display font-semibold text-lg mb-2">Campay</h3>
              <p className="text-txt-secondary text-sm">MTN MoMo, Orange Money, Visa/Mastercard via Campay.</p>
            </div>
            <div className="bg-surface border border-white/5 rounded-xl p-6 text-center">
              <div className="w-14 h-14 rounded-xl bg-nova-orange/10 flex items-center justify-center mx-auto mb-4"><iconify-icon icon="lucide:truck" width="24" class="text-nova-orange"></iconify-icon></div>
              <h3 className="font-display font-semibold text-lg mb-2">Paiement à la Livraison</h3>
              <p className="text-txt-secondary text-sm">Commandez maintenant, payez à la réception. Zéro risque.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
              }
