import React, { useState, useEffect } from 'react';
import axios from 'axios';
import type { Product } from '../types/Product';
import Toast from "../components/Toast"; 
import { useNavigate } from "react-router-dom";


type Shipping = { name: string; address: string; city: string; postal: string; country: string };
type Payment = { cardName: string; cardNumber: string; expiry: string; cvc: string };

export default function Checkout() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [shipping, setShipping] = useState<Shipping>({ name: '', address: '', city: '', postal: '', country: '' });
  const [payment, setPayment] = useState<Payment>({ cardName: '', cardNumber: '', expiry: '', cvc: '' });

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState<{ product: Product; qty: number }[]>([]);

  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const CART_KEY = "cart_items";

  useEffect(() => {
    const storedCart = localStorage.getItem(CART_KEY);
    if (storedCart) setCartItems(JSON.parse(storedCart));
  }, []);

  const next = () => setStep(s => Math.min(3, s + 1));
  const back = () => setStep(s => Math.max(1, s - 1));

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);

    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const placeOrder = async () => {
    if (cartItems.length === 0) {
      triggerToast("Your cart is empty!");
      return;
    }

    setLoading(true);

    try {
      const orderData = {
        customerName,
        customerEmail,
        customerPhone,
        shipping,
        payment,
        items: cartItems.map(ci => ({
          productId: ci.product.id,
          quantity: ci.qty
        }))
      };

      await axios.post('http://localhost:5062/api/order', orderData);

      triggerToast("Order placed successfully!");

      localStorage.removeItem(CART_KEY);
      setCartItems([]);
      setStep(1);
      setShipping({ name: '', address: '', city: '', postal: '', country: '' });
      setPayment({ cardName: '', cardNumber: '', expiry: '', cvc: '' });
      setCustomerName('');
      setCustomerEmail('');
      setCustomerPhone('');

      setTimeout(() => {
      navigate("/dashboard/orders");
    }, 4000); 

    } catch (err) {
      console.error(err);
      triggerToast("Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 relative">

      <Toast message={toastMessage} show={showToast} />

      
<div className="max-w-3xl mx-auto relative mb-10">

  <button
    onClick={() => window.history.back()}
    className="absolute left-0 top-1 px-4 py-2 text-gray-700 border rounded 
               hover:bg-gray-200 transition-colors"
  >
    &larr; Back
  </button>

  <header className="text-center">
    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
      Secure Checkout
    </h1>

    <p className="mt-3 text-gray-600 text-base leading-relaxed max-w-xl mx-auto">
      You're just a few steps away from completing your purchase.  
      Provide your shipping and payment details, then review your items before placing your order.
    </p>

    <div className="mt-6 flex justify-center gap-10 text-sm text-gray-500">
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
        Fast & Secure
      </div>
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-blue-500"></span>
        Encrypted Payments
      </div>
      <div className="flex items-center gap-2">
        <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
        24/7 Support
      </div>
    </div>
  </header>

</div>

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg relative">

        <div className="flex items-center justify-between mb-8">
          {[1,2,3].map((s) => (
            <div key={s} className="flex-1 flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center 
                ${step >= s ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-500'} 
                font-semibold`}
              >
                {s}
              </div>
              <span className="mt-2 text-xs text-gray-600">
                {s === 1 ? 'Shipping' : s === 2 ? 'Payment' : 'Review'}
              </span>
            </div>
          ))}
        </div>

        {step === 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Customer & Shipping</h2>

            <div className="grid grid-cols-1 gap-4">
              <input value={customerName} onChange={e => setCustomerName(e.target.value)} placeholder="Full Name" className="border px-4 py-2 rounded" />
              <input value={customerEmail} onChange={e => setCustomerEmail(e.target.value)} placeholder="Email" className="border px-4 py-2 rounded" />
              <input value={customerPhone} onChange={e => setCustomerPhone(e.target.value)} placeholder="Phone" className="border px-4 py-2 rounded" />

              <input value={shipping.address} onChange={e => setShipping(s => ({ ...s, address: e.target.value }))} placeholder="Address" className="border px-4 py-2 rounded" />

              <div className="grid grid-cols-2 gap-4">
                <input value={shipping.city} onChange={e => setShipping(s => ({ ...s, city: e.target.value }))} placeholder="City" className="border px-4 py-2 rounded" />
                <input value={shipping.postal} onChange={e => setShipping(s => ({ ...s, postal: e.target.value }))} placeholder="Postal Code" className="border px-4 py-2 rounded" />
              </div>

              <input value={shipping.country} onChange={e => setShipping(s => ({ ...s, country: e.target.value }))} placeholder="Country" className="border px-4 py-2 rounded" />
            </div>

            <div className="mt-6 flex justify-end">
              <button onClick={next} className="bg-emerald-600 text-white px-6 py-2 rounded-lg">
                Continue to Payment
              </button>
            </div>
          </div>
        )}

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
              <button onClick={next} className="bg-emerald-600 text-white px-6 py-2 rounded-lg">Review Order</button>
            </div>
          </div>
        )}

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
              <button onClick={placeOrder} className="bg-emerald-600 text-white px-6 py-2 rounded-lg" disabled={loading}>
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
