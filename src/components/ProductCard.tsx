import React from 'react';
import type { Product } from '../types/Product';

type Props = {
  product: Product;
  addToCart: (p: Product) => void;
};

export default function ProductCard({ product, addToCart }: Props) {

  const renderStars = (rate: number, productId: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const fillPercent = Math.min(Math.max(rate - (i - 1), 0), 1);
      const gradId = `grad-${productId}-${i}`;
      stars.push(
        <svg key={i} className="w-4 h-4" viewBox="0 0 20 20">
          <defs>
            <linearGradient id={gradId}>
              <stop offset={`${fillPercent * 100}%`} stopColor="currentColor" />
              <stop offset={`${fillPercent * 100}%`} stopColor="lightgray" />
            </linearGradient>
          </defs>
          <path
            fill={`url(#${gradId})`}
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.357 2.44a1 1 0 00-.364 1.118l1.285 3.957c.3.921-.755 1.688-1.54 1.118l-3.356-2.44a1 1 0 00-1.175 0l-3.356 2.44c-.785.57-1.838-.197-1.539-1.118l1.285-3.957a1 1 0 00-.364-1.118L2.03 9.384c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.957z"
          />
        </svg>
      );
    }
    return stars;
  };

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

    
      <div className="flex items-center gap-1 mt-1 text-yellow-400">
        {renderStars(product.ratingRate || 0, product.id)}
        <span className="text-xs text-gray-500 ml-1">
          {Number(product.ratingRate).toFixed(1)} ({Number(product.ratingCount)})
        </span>
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
