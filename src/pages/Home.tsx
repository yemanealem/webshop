import React, { useEffect, useMemo, useState, useRef } from "react";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import Navbar from "../components/Navbar";
import RecommendationSection from "../components/RecommendationSection";
import type { Product } from "../types/Product";
import Hero from "../components/Hero";

export default function Home() {
  const CART_KEY = "cart_items";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<{ product: Product; qty: number }[]>([]);

  const [page, setPage] = useState(1);
  const pageSize = 8;
  const [totalPages, setTotalPages] = useState(1);

  const searchTimeout = useRef<number | null>(null);

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem(CART_KEY);
    if (storedCart) setCartItems(JSON.parse(storedCart));
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  // Fetch products from API
  const fetchProducts = async (currentPage: number, query = "", category: string | null = null) => {
    try {
      if (currentPage === 1) setLoading(true);
      else setLoadMoreLoading(true);

      setError(null);
      let url = `http://localhost:5062/api/products?page=${currentPage}&pageSize=${pageSize}`;
      if (query) url += `&search=${encodeURIComponent(query)}`;
      if (category) url += `&category=${encodeURIComponent(category)}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error("Check your internet connection");

      const data = await response.json();
      setProducts((prev) =>
        currentPage === 1 ? data.items || [] : [...prev, ...(data.items || [])]
      );
      setTotalPages(data.totalPages || 1);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("An unknown error occurred.");
    } finally {
      setTimeout(() => {
        setLoading(false);
        setLoadMoreLoading(false);
      }, 300);
    }
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

  // Debounced search
  useEffect(() => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = window.setTimeout(() => {
      setPage(1);
      fetchProducts(1, searchQuery, selectedCategory);
    }, 500);
    return () => {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
    };
  }, [searchQuery, selectedCategory]);

  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))),
    [products]
  );

  // Cart operations
  const addToCart = (product: Product, qty = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.product.id === product.id);
      if (existing) {
        return prev.map((ci) =>
          ci.product.id === product.id ? { ...ci, qty: ci.qty + qty } : ci
        );
      }
      return [...prev, { product, qty }];
    });
  };

  const updateCartQty = (productId: number, qty: number) => {
    setCartItems((prev) =>
      prev.map((ci) => (ci.product.id === productId ? { ...ci, qty } : ci))
    );
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prev) => prev.filter((ci) => ci.product.id !== productId));
  };

  const filteredProducts = useMemo(
    () =>
      products.filter((p) => {
        const q = searchQuery.trim().toLowerCase();
        const matchQuery =
          !q || p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
        const matchCategory = !selectedCategory || p.category === selectedCategory;
        return matchQuery && matchCategory;
      }),
    [products, searchQuery, selectedCategory]
  );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        categories={categories}
        onSearch={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setPage(1);
        }}
        cartItems={cartItems}
        onRemoveFromCart={removeFromCart}
        updateCartQty={updateCartQty}
      />

      <Hero />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <RecommendationSection products={products} onAdd={addToCart} loading={loading} />

        <h2 className="text-xl font-semibold mt-8 mb-4">All Products</h2>

        {loading && page === 1 ? (
          <Loading message="Fetching Products..." />
        ) : filteredProducts.length > 0 ? (
          <>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} addToCart={addToCart} />
              ))}
            </div>

            {page < totalPages && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => {
                    const nextPage = page + 1;
                    setPage(nextPage);
                    fetchProducts(nextPage, searchQuery, selectedCategory);
                  }}
                  className="flex items-center gap-2 bg-emerald-400 text-white px-6 py-2 rounded-full shadow-lg hover:bg-emerald-800 transition-all duration-200 transform hover:scale-105"
                  disabled={loadMoreLoading}
                >
                  {loadMoreLoading ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="mt-8 text-center text-gray-600">
            No products match your search/filters.
          </div>
        )}
      </main>
    </div>
  );
}
