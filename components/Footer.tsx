export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="font-display font-bold text-lg bg-gradient-to-r from-nova-blue via-nova-orange to-nova-green bg-clip-text text-transparent mb-3">NovaOrizon</div>
          <p className="text-txt-muted text-sm">La marketplace du Cameroun.</p>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-widest text-txt-muted mb-3">Boutique</div>
          <div className="flex flex-col gap-2">
            <a href="/shop" className="text-sm text-txt-secondary hover:text-white transition-colors">Produits</a>
            <a href="/shop" className="text-sm text-txt-secondary hover:text-white transition-colors">Catégories</a>
          </div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-widest text-txt-muted mb-3">Support</div>
          <div className="flex flex-col gap-2">
            <a href="#" className="text-sm text-txt-secondary hover:text-white transition-colors">Contact</a>
            <a href="#" className="text-sm text-txt-secondary hover:text-white transition-colors">Livraison</a>
          </div>
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-widest text-txt-muted mb-3">Suivez-nous</div>
          <div className="flex items-center gap-3">
            <a href="#" className="text-txt-secondary hover:text-white transition-colors"><iconify-icon icon="lucide:facebook" width="18"></iconify-icon></a>
            <a href="#" className="text-txt-secondary hover:text-white transition-colors"><iconify-icon icon="lucide:instagram" width="18"></iconify-icon></a>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/5 text-center text-txt-muted text-xs">
        © 2025 NovaOrizon. Tous droits réservés. Fait avec ❤️ au Cameroun.
      </div>
    </footer>
  );
}
