import React, { useState } from 'react';
import { ShoppingCartIcon, ChevronDownIcon } from '@heroicons/react/outline';
import type { Product } from '../types/Product'; 

type CartItem = { product: Product; qty: number };

type Props = {
  categories: string[];
  onSearch: (q: string) => void;
  selectedCategory: string | null;
  onSelectCategory: (c: string | null) => void;
  cartItems: CartItem[];
  onRemoveFromCart: (id: number) => void;
};

export default function Navbar({
  categories,
  onSearch,
  selectedCategory,
  onSelectCategory,
  cartItems,
  onRemoveFromCart
}: Props) {
  const [search, setSearch] = useState('');
  const [openCart, setOpenCart] = useState(false);
  const [openCat, setOpenCat] = useState(false);

  const total = cartItems.reduce((s, c) => s + c.product.price * c.qty, 0);

  return (
    <header className="bg-white shadow sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <div className="text-xl font-bold text-gray-800">MyWebShop</div>

            {/* Categories dropdown */}
            <div className="relative">
              <button
                onClick={() => setOpenCat(v => !v)}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 flex items-center gap-1"
              >
                Categories <ChevronDownIcon className="w-4 h-4 text-gray-600" />
              </button>

              {openCat && (
                <div className="absolute mt-2 w-56 bg-white border rounded shadow p-2">
                  <button
                    onClick={() => { onSelectCategory(null); setOpenCat(false); }}
                    className={`block w-full text-left px-3 py-1 rounded ${!selectedCategory ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                  >
                    All categories
                  </button>
                  {categories.map((c) => (
                    <button
                      key={c}
                      onClick={() => { onSelectCategory(c); setOpenCat(false); }}
                      className={`block w-full text-left px-3 py-1 rounded ${selectedCategory === c ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Search */}
          <div className="flex-1 px-4">
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                onSearch(e.target.value);
              }}
              placeholder="Search products..."
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          {/* Cart */}
          <div className="relative">
            <button
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100"
              onClick={() => setOpenCart(v => !v)}
            >
              <ShoppingCartIcon className="w-6 h-6 text-gray-700" />
              <span className="hidden sm:inline text-gray-700">Cart</span>
              {cartItems.length > 0 && (
                <span className="ml-1 inline-block bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </button>

            {openCart && (
              <div className="absolute right-0 mt-2 w-80 bg-white border rounded shadow p-4">
                <h4 className="font-semibold mb-2">Cart</h4>
                <div className="max-h-48 overflow-auto">
                  {cartItems.length === 0 && <div className="text-gray-600">Your cart is empty.</div>}
                  {cartItems.map(ci => (
                    <div key={ci.product.id} className="flex items-center justify-between gap-2 py-2 border-b last:border-b-0">
                      <div className="flex items-center gap-3">
                        <img src={ci.product.image} alt={ci.product.title} className="w-12 h-12 object-contain bg-gray-50 p-1 rounded" />
                        <div className="text-sm">
                          <div className="font-medium line-clamp-1">{ci.product.title}</div>
                          <div className="text-gray-500 text-xs">${(ci.product.price * ci.qty).toFixed(2)} · {ci.qty}×</div>
                        </div>
                      </div>
                      <div>
                        <button
                          onClick={() => onRemoveFromCart(ci.product.id)}
                          className="text-sm text-red-500 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {cartItems.length > 0 && (
                  <div className="mt-3">
                    <div className="flex justify-between font-semibold pb-2">Total <span>${total.toFixed(2)}</span></div>
                    <div className="flex gap-2">
                      <a href="/checkout" className="flex-1 text-center bg-emerald-700 text-white px-3 py-2 rounded hover:bg-emerald-700">Checkout</a>
                      <button onClick={() => window.location.href = '/cart'} className="flex-1 border rounded px-3 py-2">View Cart</button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
