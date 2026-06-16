import connectDB from '@/lib/mongodb';
import Order from '@/lib/models/Order';
import Product from '@/lib/models/Product';
import User from '@/lib/models/User';

export default async function AdminDashboard() {
  await connectDB();
  const [orders, products, clients] = await Promise.all([
    Order.find({}).sort({ createdAt: -1 }).limit(5).lean(),
    Product.countDocuments(),
    User.countDocuments({ role: 'client' }),
  ]);

  const revenue = orders.reduce((s: number, o: any) => s + o.total, 0);
  const pending = orders.filter((o: any) => o.status === 'en_attente').length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold tracking-tight mb-1">Tableau de Bord</h1>
        <p className="text-txt-muted text-sm">Vue d'ensemble de votre boutique</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface border border-white/5 rounded-xl p-5"><div className="text-txt-muted text-[10px] uppercase tracking-widest mb-3">Chiffre d'affaires</div><div className="font-display text-2xl font-semibold">{revenue.toLocaleString('fr-FR')} FCFA</div></div>
        <div className="bg-surface border border-white/5 rounded-xl p-5"><div className="text-txt-muted text-[10px] uppercase tracking-widest mb-3">Commandes</div><div className="font-display text-2xl font-semibold">{orders.length}</div></div>
        <div className="bg-surface border border-white/5 rounded-xl p-5"><div className="text-txt-muted text-[10px] uppercase tracking-widest mb-3">Produits</div><div className="font-display text-2xl font-semibold">{products}</div></div>
        <div className="bg-surface border border-white/5 rounded-xl p-5"><div className="text-txt-muted text-[10px] uppercase tracking-widest mb-3">Clients</div><div className="font-display text-2xl font-semibold">{clients}</div></div>
      </div>
      <div className="bg-surface border border-white/5 rounded-xl p-5">
        <h3 className="font-display font-semibold mb-4">Dernières Commandes</h3>
        {orders.length === 0 ? <p className="text-txt-muted text-sm">Aucune commande</p> : (
          <div className="space-y-3">
            {orders.map((o: any) => (
              <div key={o._id.toString()} className="flex items-center justify-between py-2 border-b border-white/5">
                <div className="flex items-center gap-3"><span className="font-mono text-sm">#{o._id.toString().slice(-6)}</span><span className="text-txt-secondary text-sm">{o.customer.name}</span></div>
                <span className="font-display font-semibold text-sm">{o.total.toLocaleString('fr-FR')} FCFA</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
    }
