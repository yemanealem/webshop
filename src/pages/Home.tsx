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
          throw new Error("Check your internet is working and try again");
        }

        const data = await response.json();
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
      <div className="error-container">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="grid">
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
