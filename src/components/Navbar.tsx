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
  updateCartQty: (id: number, qty: number) => void;
};

export default function Navbar({
  categories,
  onSearch,
  selectedCategory,
  onSelectCategory,
  cartItems,
  onRemoveFromCart,
  updateCartQty
}: Props) {
  const [search, setSearch] = useState('');
  const [openCart, setOpenCart] = useState(false);
  const [openCat, setOpenCat] = useState(false);

  const total = cartItems.reduce((s, c) => s + c.product.price * c.qty, 0);

  const handleQtyChange = (id: number, delta: number) => {
    const item = cartItems.find(ci => ci.product.id === id);
    if (!item) return;
    const newQty = Math.max(1, item.qty + delta);
    updateCartQty(id, newQty);
  };

  return (
    <header className="bg-white shadow sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <div className="text-xl font-bold text-gray-800">MyWebShop</div>

        
            <div className="relative">
              <button
                onClick={() => setOpenCat(v => !v)}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-100 flex items-center gap-1 transition"
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
              className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 transition"
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
              <div className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg p-4 z-50">
                <h4 className="font-semibold mb-3 text-gray-800 text-lg">Shopping Cart</h4>

                <div className="max-h-64 overflow-auto divide-y divide-gray-200">
                  {cartItems.length === 0 && (
                    <div className="text-gray-500 text-center py-4">Your cart is empty.</div>
                  )}

                  {cartItems.map(ci => (
                    <div key={ci.product.id} className="flex items-center justify-between py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={ci.product.image}
                          alt={ci.product.title}
                          className="w-14 h-14 object-contain rounded-md bg-gray-50 p-1"
                        />
                        <div className="flex flex-col gap-1 min-w-[120px]">
                          <span className="font-medium line-clamp-1">{ci.product.title}</span>
                          <span className="text-gray-500 text-sm">${(ci.product.price * ci.qty).toFixed(2)}</span>

                          <div className="flex items-center gap-2 mt-1">
                            <button
                              onClick={() => handleQtyChange(ci.product.id, -1)}
                              className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 active:bg-gray-400 transition"
                            >
                              −
                            </button>
                            <span className="px-3 font-medium">{ci.qty}</span>
                            <button
                              onClick={() => handleQtyChange(ci.product.id, 1)}
                              className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full hover:bg-gray-300 active:bg-gray-400 transition"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveFromCart(ci.product.id)}
                        className="text-sm text-red-500 hover:underline transition"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                {cartItems.length > 0 && (
                  <div className="mt-4">
                    <div className="flex justify-between font-semibold text-gray-800 mb-3">
                      <span>Total:</span>
                      <span>${total.toFixed(2)}</span>
                    </div>

                    <div className="flex gap-2">
                      <a
                        href="/checkout"
                        className="flex-1 text-center bg-emerald-700 text-white py-2 rounded-lg hover:bg-emerald-800 transition"
                      >
                        Checkout
                      </a>
                      <button
                        onClick={() => (window.location.href = "/cart")}
                        className="flex-1 border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition"
                      >
                        View Cart
                      </button>
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
