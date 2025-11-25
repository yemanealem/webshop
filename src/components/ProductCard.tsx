import React from 'react';
import type { Product } from '../types/Product';

type Props = {
  product: Product;
  addToCart: (p: Product) => void;
};

export default function ProductCard({ product, addToCart }: Props) {
  return (
    <div
      className="
        bg-white rounded-lg overflow-hidden 
        border border-gray-200
        flex flex-col items-center p-4
        transition-transform transform hover:-translate-y-2 hover:shadow-xl duration-300
      "
    >
      <img src={product.image} alt={product.title} className="h-32 object-contain mb-2" />
      
      <h2 className="text-sm font-medium line-clamp-1">{product.title}</h2>

      {/* Rating */}
      <div className="flex items-center gap-1 mt-1">
        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.357 2.44a1 1 0 00-.364 1.118l1.285 3.957c.3.921-.755 1.688-1.54 1.118l-3.356-2.44a1 1 0 00-1.175 0l-3.356 2.44c-.785.57-1.838-.197-1.539-1.118l1.285-3.957a1 1 0 00-.364-1.118L2.03 9.384c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.957z" />
        </svg>
        <span className="text-xs text-gray-500">{product.rating.rate.toFixed(1)} ({product.rating.count})</span>
      </div>

      <p className="font-semibold mt-1 text-gray-800">${product.price.toFixed(2)}</p>

      <button
        onClick={() => addToCart(product)}
        className="
          mt-3 bg-emerald-700 text-white text-sm px-4 py-1 rounded-md
          hover:bg-emerald-800 transition-colors duration-200
        "
      >
        Add to Cart
      </button>
    </div>
  );
}
