import React, { useState, useEffect } from 'react';
import axios from 'axios';
import type { Product } from '../types/Product';

type Shipping = { name: string; address: string; city: string; postal: string; country: string };
type Payment = { cardName: string; cardNumber: string; expiry: string; cvc: string };

export default function Checkout() {
  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState<Shipping>({ name: '', address: '', city: '', postal: '', country: '' });
  const [payment, setPayment] = useState<Payment>({ cardName: '', cardNumber: '', expiry: '', cvc: '' });
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<{ product: Product; qty: number }[]>([]);

  const CART_KEY = "cart_items";

  // Load cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem(CART_KEY);
    if (storedCart) setCartItems(JSON.parse(storedCart));
  }, []);

  const next = () => setStep(s => Math.min(3, s + 1));
  const back = () => setStep(s => Math.max(1, s - 1));

  const showError = (msg: string) => {
    setError(msg);
    setTimeout(() => setError(null), 4000);
  };

  const showSuccess = (msg: string) => {
    setSuccess(msg);
    setTimeout(() => setSuccess(null), 4000);
  };

  const placeOrder = async () => {
    if (cartItems.length === 0) {
      showError("Your cart is empty!");
      return;
    }

    setLoading(true);
    try {
      // ✅ Payload matching backend DTO exactly
      const orderData = {
        customerName,
        customerEmail,
        customerPhone,
        shipping: {
          name: shipping.name,
          address: shipping.address,
          city: shipping.city,
          postal: shipping.postal,
          country: shipping.country
        },
        payment: {
          cardName: payment.cardName,
          cardNumber: payment.cardNumber,
          expiry: payment.expiry,
          cvc: payment.cvc
        },
        items: cartItems.map(ci => ({
          productId: ci.product.id,
          quantity: ci.qty
        }))
      };

      await axios.post('http://localhost:5062/api/order', orderData);

      showSuccess("Order placed successfully!");

      // ✅ Clear cart ONLY after successful order
      localStorage.removeItem(CART_KEY);
      setCartItems([]);

      // Reset forms
      setStep(1);
      setShipping({ name: '', address: '', city: '', postal: '', country: '' });
      setPayment({ cardName: '', cardNumber: '', expiry: '', cvc: '' });
      setCustomerName('');
      setCustomerEmail('');
      setCustomerPhone('');

    } catch (err) {
      console.error(err);
      showError("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-3xl mx-auto mb-6">
        <button onClick={() => window.history.back()} className="px-4 py-2 text-gray-700 border rounded hover:bg-gray-200 transition-colors">
          &larr; Back
        </button>
      </div>

      <header className="max-w-3xl mx-auto text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
        <p className="mt-2 text-gray-600">
          Complete your order by providing shipping & payment info. Review before placing the order.
        </p>
      </header>

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg relative">
        {error && <div className="absolute top-0 left-0 right-0 bg-red-500 text-white px-4 py-2 rounded-t text-center font-semibold">{error}</div>}
        {success && <div className="absolute top-0 left-0 right-0 bg-emerald-500 text-white px-4 py-2 rounded-t text-center font-semibold">{success}</div>}

        <div className="flex items-center justify-between mb-8">
          {[1,2,3].map((s) => (
            <div key={s} className="flex-1 flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= s ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-500'} font-semibold`}>
                {s}
              </div>
              <span className="mt-2 text-xs text-gray-600">{s === 1 ? 'Shipping' : s === 2 ? 'Payment' : 'Review'}</span>
            </div>
          ))}
        </div>

        {/* Step 1: Customer + Shipping */}
        {step === 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Customer & Shipping Information</h2>
            <div className="grid grid-cols-1 gap-4">
              <input value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder="Full Name" className="border px-4 py-2 rounded" />
              <input value={customerEmail} onChange={e => setCustomerEmail(e.target.value)} placeholder="Email" className="border px-4 py-2 rounded" />
              <input value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} placeholder="Phone" className="border px-4 py-2 rounded" />
              <input value={shipping.name} onChange={e => setShipping(s => ({ ...s, name: e.target.value }))} placeholder="Recipient Name" className="border px-4 py-2 rounded" />
              <input value={shipping.address} onChange={e => setShipping(s => ({ ...s, address: e.target.value }))} placeholder="Address" className="border px-4 py-2 rounded" />
              <div className="grid grid-cols-2 gap-4">
                <input value={shipping.city} onChange={e => setShipping(s => ({ ...s, city: e.target.value }))} placeholder="City" className="border px-4 py-2 rounded" />
                <input value={shipping.postal} onChange={e => setShipping(s => ({ ...s, postal: e.target.value }))} placeholder="Postal Code" className="border px-4 py-2 rounded" />
              </div>
              <input value={shipping.country} onChange={e => setShipping(s => ({ ...s, country: e.target.value }))} placeholder="Country" className="border px-4 py-2 rounded" />
            </div>
            <div className="mt-6 flex justify-end">
              <button onClick={next} className="bg-emerald-600 text-white px-6 py-2 rounded-lg">Continue to Payment</button>
            </div>
          </div>
        )}

        {/* Step 2: Payment */}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Payment Information</h2>
            <div className="grid grid-cols-1 gap-4">
              <input value={payment.cardName} onChange={e => setPayment(p => ({ ...p, cardName: e.target.value }))} placeholder="Name on card" className="border px-4 py-2 rounded" />
              <input value={payment.cardNumber} onChange={e => setPayment(p => ({ ...p, cardNumber: e.target.value }))} placeholder="Card number" className="border px-4 py-2 rounded" />
              <div className="grid grid-cols-2 gap-4">
                <input value={payment.expiry} onChange={e => setPayment(p => ({ ...p, expiry: e.target.value }))} placeholder="MM/YY" className="border px-4 py-2 rounded" />
                <input value={payment.cvc} onChange={e => setPayment(p => ({ ...p, cvc: e.target.value }))} placeholder="CVC" className="border px-4 py-2 rounded" />
              </div>
            </div>
            <div className="mt-6 flex justify-between">
              <button onClick={back} className="px-6 py-2 border rounded-lg">Back</button>
              <button onClick={next} className="bg-blue-600 text-white px-6 py-2 rounded-lg">Review Order</button>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Review & Place Order</h2>
            <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
              {cartItems.map(ci => (
                <div key={ci.product.id} className="flex justify-between">
                  <span>{ci.product.title} x {ci.qty}</span>
                  <span>${ci.product.price * ci.qty}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-between items-center">
              <button onClick={back} className="px-6 py-2 border rounded-lg">Back</button>
              <button onClick={placeOrder} className="bg-green-600 text-white px-6 py-2 rounded-lg" disabled={loading}>
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
