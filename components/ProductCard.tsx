'use client';
import Link from 'next/link';

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  featured: boolean;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/product/${product._id}`}>
      <div className="border border-white/5 rounded-xl overflow-hidden bg-surface cursor-pointer group hover:translate-y-[-4px] hover:border-nova-blue/25 hover:shadow-[0_8px_30px_rgba(37,99,235,0.08)] transition-all duration-300">
        <div className="relative aspect-square overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
          {product.stock < 10 && (
            <div className="absolute top-3 left-3 text-[9px] uppercase tracking-widest bg-red-500/80 text-white px-2 py-1 rounded-md font-semibold">Stock limité</div>
          )}
        </div>
        <div className="p-4">
          <div className="text-[10px] uppercase tracking-widest text-nova-blue mb-1">{product.category}</div>
          <h3 className="font-medium text-sm mb-2 line-clamp-2">{product.name}</h3>
          <div className="flex items-center justify-between">
            <span className="font-display font-semibold text-sm">{product.price.toLocaleString('fr-FR')} FCFA</span>
            <div className="w-8 h-8 rounded-lg bg-white/5 group-hover:bg-nova-blue/20 flex items-center justify-center transition-colors">
              <iconify-icon icon="lucide:plus" width="14" class="text-txt-secondary group-hover:text-nova-blue-light"></iconify-icon>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
