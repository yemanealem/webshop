import React from 'react';

type Props = {
  name: string;
  price: number;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export default function ProductCard({ name, price, image, rating }: Props) {
  const stars = Math.round(rating.rate); 
  return (
    <div className="card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>${price.toFixed(2)}</p>
      <div className="rating">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className={i < stars ? 'star filled' : 'star'}>★</span>
        ))}
        <span className="count">({rating.count})</span>
      </div>
      <button className="btn">Buy</button>
    </div>
  );
}
