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
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
      <img 
        src={image} 
        alt={name} 
        className="h-48 w-full object-contain p-4 bg-gray-50"
      />
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-lg font-semibold mb-2 text-gray-800 line-clamp-2">{name}</h3>
        <p className="text-gray-900 font-bold mb-2">${price.toFixed(2)}</p>
        <div className="flex items-center mb-4">
          {Array.from({ length: 5 }, (_, i) => (
            <span key={i} className={i < stars ? 'text-yellow-400' : 'text-gray-300'}>
              ★
            </span>
          ))}
          <span className="text-gray-500 text-sm ml-2">({rating.count})</span>
        </div>
        <button className="mt-auto bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors">
          Buy
        </button>
      </div>
    </div>
  );
}
