import React from "react";
import type { Product } from "../types/Product";
import ProductSkeletonGrid from "./ProductSkeletonGrid";

type Props = {
  products: Product[];
  onAdd: (p: Product) => void;
  loading?: boolean;
};

export default function RecommendationSection({ products, onAdd, loading = false }: Props) {
  if (loading) return <ProductSkeletonGrid count={4} />;

  const topRated = [...products]
    .filter(p => Number(p.ratingCount) > 0 && (p.ratingRate || 0) > 0)
    .sort((a, b) => (b.ratingRate || 0) - (a.ratingRate || 0))
    .slice(0, 4);

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
    <section className="bg-white rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-semibold mb-3">Top Rated Products</h3>
      {topRated.length === 0 ? (
        <p className="text-gray-500 text-sm">No top rated products yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {topRated.map((p) => (
            <div
              key={p.id}
              className="
                bg-white rounded-lg overflow-hidden border border-gray-200
                flex flex-col items-center p-3 transition-transform transform
                hover:-translate-y-2 hover:scale-105 hover:shadow-xl duration-300
              "
            >
              <img src={p.image || "/placeholder.png"} alt={p.title} className="h-28 object-contain mb-2" />
              <div className="text-sm font-medium line-clamp-1 text-gray-800">{p.title}</div>

              <div className="flex items-center gap-1 mt-1 text-yellow-400">
                {renderStars(p.ratingRate || 0, p.id)}
                <span className="text-xs text-gray-500 ml-1">({p.ratingCount})</span>
              </div>

              <div className="font-semibold mt-1 text-gray-800">${p.price.toFixed(2)}</div>
              <button
                onClick={() => onAdd(p)}
                className="mt-3 bg-emerald-700 text-white text-sm px-4 py-1 rounded-md hover:bg-emerald-800 transition-colors duration-200"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
