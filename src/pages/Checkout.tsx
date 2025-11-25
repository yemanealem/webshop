import React, { useState } from 'react';
type Shipping = { name: string; address: string; city: string; postal: string; country: string };
type Payment = { cardName: string; cardNumber: string; expiry: string; cvc: string };

export default function Checkout() {
  const [step, setStep] = useState(1);
  const [shipping, setShipping] = useState<Shipping>({ name: '', address: '', city: '', postal: '', country: '' });
  const [payment, setPayment] = useState<Payment>({ cardName: '', cardNumber: '', expiry: '', cvc: '' });

  const next = () => setStep(s => Math.min(3, s + 1));
  const back = () => setStep(s => Math.max(1, s - 1));

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <div className="flex items-center gap-4 mb-6">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-emerald-700 text-white' : 'bg-gray-200'}`}>1</div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-emerald-700 text-white' : 'bg-gray-200'}`}>2</div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-emerald-700 text-white' : 'bg-gray-200'}`}>3</div>
        </div>

        {step === 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
            <div className="grid grid-cols-1 gap-3">
              <input value={shipping.name} onChange={(e) => setShipping(s => ({ ...s, name: e.target.value }))} placeholder="Full name" className="border px-3 py-2 rounded" />
              <input value={shipping.address} onChange={(e) => setShipping(s => ({ ...s, address: e.target.value }))} placeholder="Address" className="border px-3 py-2 rounded" />
              <div className="grid grid-cols-2 gap-3">
                <input value={shipping.city} onChange={(e) => setShipping(s => ({ ...s, city: e.target.value }))} placeholder="City" className="border px-3 py-2 rounded" />
                <input value={shipping.postal} onChange={(e) => setShipping(s => ({ ...s, postal: e.target.value }))} placeholder="Postal code" className="border px-3 py-2 rounded" />
              </div>
              <input value={shipping.country} onChange={(e) => setShipping(s => ({ ...s, country: e.target.value }))} placeholder="Country" className="border px-3 py-2 rounded" />
            </div>
            <div className="mt-6 flex justify-between">
              <button onClick={next} className="bg-emerald-700 text-white px-4 py-2 rounded">Continue to payment</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Payment</h2>
            <div className="grid grid-cols-1 gap-3">
              <input value={payment.cardName} onChange={(e) => setPayment(p => ({ ...p, cardName: e.target.value }))} placeholder="Name on card" className="border px-3 py-2 rounded" />
              <input value={payment.cardNumber} onChange={(e) => setPayment(p => ({ ...p, cardNumber: e.target.value }))} placeholder="Card number" className="border px-3 py-2 rounded" />
              <div className="grid grid-cols-2 gap-3">
                <input value={payment.expiry} onChange={(e) => setPayment(p => ({ ...p, expiry: e.target.value }))} placeholder="MM/YY" className="border px-3 py-2 rounded" />
                <input value={payment.cvc} onChange={(e) => setPayment(p => ({ ...p, cvc: e.target.value }))} placeholder="CVC" className="border px-3 py-2 rounded" />
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <button onClick={back} className="px-4 py-2 border rounded">Back</button>
              <button onClick={next} className="bg-blue-600 text-white px-4 py-2 rounded">Review order</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Review & Place Order</h2>
            <div className="space-y-3">
              <div>
                <h4 className="font-medium">Shipping</h4>
                <p className="text-sm text-gray-600">{shipping.name} · {shipping.address} · {shipping.city} · {shipping.country}</p>
              </div>
              <div>
                <h4 className="font-medium">Payment</h4>
                <p className="text-sm text-gray-600">Card ending •••• {payment.cardNumber.slice(-4)}</p>
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <button onClick={back} className="px-4 py-2 border rounded">Back</button>
              <button onClick={() => alert('Order placed! (demo)')} className="bg-green-600 text-white px-4 py-2 rounded">Place order</button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
