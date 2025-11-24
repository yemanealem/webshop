import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import Loading from "../components/Loading";

type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: { rate: number; count: number };
};

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('https://fakestoreapi.com/products');

        if (!response.ok) {
          throw new Error("Check your internet connection and try again");
        }

        const data = await response.json();
        console.log(data)
        setProducts(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <Loading message="Fetching Products..." />;

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Products</h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            name={p.title}
            price={p.price}
            image={p.image}
            rating={p.rating}
          />
        ))}
      </div>
    </div>
  );
}
