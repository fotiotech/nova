import connectDB from '@/lib/mongodb';
import Product from '@/lib/models/Product';
import ProductCard from '@/components/ProductCard';

export default async function ShopPage() {
  await connectDB();
  const products = await Product.find({}).sort({ createdAt: -1 }).lean();

  return (
    <div className="pt-24 pb-20 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-display text-3xl md:text-4xl font-semibold tracking-tight mb-8">Tous les Produits</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p: any) => (
            <ProductCard key={p._id.toString()} product={{ ...p, _id: p._id.toString() }} />
          ))}
        </div>
        {products.length === 0 && (
          <div className="text-center py-20 text-txt-muted">Aucun produit disponible</div>
        )}
      </div>
    </div>
  );
}
