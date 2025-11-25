import React from 'react';

export default function Hero() {
  return (
    <header className="relative w-full bg-gradient-to-r from-emerald-500 via-emerald-600 to-emerald-700 text-white py-20 px-6 md:px-16 overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full -mt-32 -mr-32"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-white opacity-10 rounded-full -mb-36 -ml-36"></div>

      <div className="max-w-7xl mx-auto text-center md:text-left">
        <h1 className="text-3xl md:text-6xl font-medium mb-4 drop-shadow-lg">
          Explore Our Products
        </h1>
        <p className="text-lg md:text-2xl mb-6 drop-shadow-sm">
          Browse popular items - use the search and filters to find exactly what you need.
        </p>

        <a
          href="#products"
          className="inline-block bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-500 text-white font-medium px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transition-shadow duration-300"
        >
          Shop Now
        </a>
      </div>
    </header>
  );
}
