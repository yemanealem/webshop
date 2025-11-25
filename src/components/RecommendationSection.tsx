import React from 'react';
import type { Product } from '../types/Product';

type Props = {
  products: Product[];
  onAdd: (p: Product) => void;
};

export default function RecommendationSection({ products, onAdd }: Props) {
  const topRated = [...products]
    .sort((a, b) => b.rating.rate - a.rating.rate)
    .slice(0, 4);

  return (
    <section className="bg-white rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-semibold mb-3">Top Rated Products</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {topRated.map(p => (
          <div
            key={p.id}
            className="
              bg-white rounded-lg overflow-hidden border border-gray-200
              flex flex-col items-center p-3 transition-transform transform
              hover:-translate-y-2 hover:scale-105 hover:shadow-xl duration-300
            "
          >
            <img src={p.image} alt={p.title} className="h-28 object-contain mb-2" />

            <div className="text-sm font-medium line-clamp-1 text-gray-800">{p.title}</div>

            {/* Rating */}
            <div className="flex items-center gap-1 mt-1">
              <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.357 2.44a1 1 0 00-.364 1.118l1.285 3.957c.3.921-.755 1.688-1.54 1.118l-3.356-2.44a1 1 0 00-1.175 0l-3.356 2.44c-.785.57-1.838-.197-1.539-1.118l1.285-3.957a1 1 0 00-.364-1.118L2.03 9.384c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.957z" />
              </svg>
              <span className="text-xs text-gray-500">{p.rating.rate.toFixed(1)} ({p.rating.count})</span>
            </div>

            <div className="font-semibold mt-1 text-gray-800">${p.price.toFixed(2)}</div>

            <button
              onClick={() => onAdd(p)}
              className="
                mt-3 bg-emerald-700 text-white text-sm px-4 py-1 rounded-md
                hover:bg-emerald-800 transition-colors duration-200
              "
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
