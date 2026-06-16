import connectDB from '@/lib/mongodb';
import Product from '@/lib/models/Product';
import Link from 'next/link';

export default async function ProductPage({ params }: { params: { id: string } }) {
  await connectDB();
  const product = await Product.findById(params.id).lean();

  if (!product) {
    return <div className="pt-24 text-center text-txt-muted">Produit introuvable</div>;
  }

  const related = await Product.find({ category: product.category, _id: { $ne: product._id } }).limit(4).lean();

  return (
    <div className="pt-24 pb-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <Link href="/shop" className="flex items-center gap-2 text-txt-secondary text-sm mb-8 hover:text-white transition-colors">
          <iconify-icon icon="lucide:arrow-left" width="16"></iconify-icon> Retour
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="rounded-xl overflow-hidden border border-white/5">
            <img src={product.image} alt={product.name} className="w-full aspect-square object-cover" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-nova-blue mb-3">{product.category}</div>
            <h1 className="font-display text-2xl md:text-3xl font-semibold tracking-tight mb-4">{product.name}</h1>
            <div className="font-display text-2xl font-semibold bg-gradient-to-r from-nova-blue via-nova-orange to-nova-green bg-clip-text text-transparent mb-6">
              {product.price.toLocaleString('fr-FR')} FCFA
            </div>
            <p className="text-txt-secondary text-sm leading-relaxed mb-6">{product.description}</p>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs text-txt-muted">Stock:</span>
              <span className={`text-sm ${product.stock < 10 ? 'text-red-400' : 'text-nova-green'}`}>
                {product.stock > 0 ? `${product.stock} disponibles` : 'Rupture de stock'}
              </span>
            </div>
            <div className="mt-8 pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-txt-secondary text-xs"><iconify-icon icon="lucide:truck" width="16" class="text-nova-green"></iconify-icon> Livraison disponible</div>
              <div className="flex items-center gap-3 text-txt-secondary text-xs"><iconify-icon icon="lucide:shield-check" width="16" class="text-nova-blue"></iconify-icon> Paiement sécurisé</div>
              <div className="flex items-center gap-3 text-txt-secondary text-xs"><iconify-icon icon="lucide:rotate-ccw" width="16" class="text-nova-orange"></iconify-icon> Retour 7 jours</div>
              <div className="flex items-center gap-3 text-txt-secondary text-xs"><iconify-icon icon="lucide:banknote" width="16" class="text-nova-green"></iconify-icon> Paiement à la livraison</div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-display text-xl font-semibold tracking-tight mb-6">Produits Similaires</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p: any) => (
                <ProductCard key={p._id.toString()} product={{ ...p, _id: p._id.toString() }} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
              }
