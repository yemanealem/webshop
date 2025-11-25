import React, { useEffect, useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard';
import Loading from "../components/Loading";
import Navbar from '../components/Navbar';
import RecommendationSection from '../components/RecommendationSection';
import type { Product } from '../types/Product';
import Hero from '../components/Hero';


export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<{ product: Product; qty: number }[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) throw new Error("Check your internet connection");
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("An unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const categories = useMemo(() => Array.from(new Set(products.map(p => p.category))), [products]);

  const addToCart = (product: Product, qty = 1) => {
    setCartItems(prev => {
      const existing = prev.find(ci => ci.product.id === product.id);
      if (existing) {
        return prev.map(ci => ci.product.id === product.id ? { ...ci, qty: ci.qty + qty } : ci);
      }
      return [...prev, { product, qty }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems(prev => prev.filter(ci => ci.product.id !== productId));
  };

  const filtered = useMemo(() => products.filter(p => {
    const q = searchQuery.trim().toLowerCase();
    const matchQuery = !q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
    const matchCategory = !selectedCategory || p.category === selectedCategory;
    return matchQuery && matchCategory;
  }), [products, searchQuery, selectedCategory]);

  if (loading) return <Loading message="Fetching Products..." />;
  if (error) return <div className="flex justify-center items-center h-screen"><p className="text-red-500 text-lg">{error}</p></div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        categories={categories}
        onSearch={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        cartItems={cartItems}
        onRemoveFromCart={removeFromCart}
      />

        <Hero />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        <RecommendationSection products={products} onAdd={addToCart} />

        <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} addToCart={addToCart} />
          ))}
        </div>

        {filtered.length === 0 && <div className="mt-8 text-center text-gray-600">No products match your search/filters.</div>}
      </main>
    </div>
  );
}
