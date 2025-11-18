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

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching products:', err);
        setLoading(false);
      });
  }, []);

if (loading) return <Loading message="Fetching Products..." />;

  return (
    <div className="container">
      {/* <h1>Web Shop</h1> */}
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
