import React from "react";
import type { Product } from "../types/Product";
import ProductSkeletonGrid from "./ProductSkeletonGrid";

type Props = {
  products: Product[];
  onAdd: (p: Product) => void;
  loading?: boolean; // new prop
};

export default function RecommendationSection({ products, onAdd, loading = false }: Props) {
  if (loading) return <ProductSkeletonGrid count={4} />;

  const topRated = [...products]
    .sort((a, b) => (b.ratingRate || 0) - (a.ratingRate || 0)) // handle undefined
    .slice(0, 4);

  return (
    <section className="bg-white rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-semibold mb-3">Top Rated Products</h3>
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
    </section>
  );
}
