import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft } from "react-icons/fa";
import Toast from "../components/Toast";

import type { OrderResponseDTO, OrderItemResponseDTO } from "../types/OrderItemDetail";

const ORDERS_API = "http://localhost:5062/api/order";

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [order, setOrder] = useState<OrderResponseDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const loadOrder = async () => {
    try {
      setLoading(true);
      const res = await axios.get<OrderResponseDTO>(`${ORDERS_API}/${id}`);
      setOrder(res.data);
    } catch (err) {
      console.error(err);
      setToastMessage("Failed to load order details!");
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrder();
  }, [id]);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!order) return <p className="p-6">No order found</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-4 text-blue-600 hover:underline"
      >
        <FaArrowLeft /> Back to Orders
      </button>

      <h1 className="text-2xl font-bold mb-4">Order Details - #{order.orderId}</h1>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-2">Customer Info</h2>
        <p><strong>Name:</strong> {order.customerName}</p>
        <p><strong>Email:</strong> {order.customerEmail}</p>
        <p><strong>Phone:</strong> {order.customerPhone}</p>
      </div>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-2">Shipping Info</h2>
        <p><strong>Name:</strong> {order.shippingName}</p>
        <p><strong>Address:</strong> {order.shippingAddress}</p>
        <p><strong>City:</strong> {order.shippingCity}</p>
        <p><strong>Postal:</strong> {order.shippingPostal}</p>
        <p><strong>Country:</strong> {order.shippingCountry}</p>
      </div>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-2">Payment Info</h2>
        <p><strong>Card Name:</strong> {order.cardName}</p>
        <p><strong>Card Number:</strong> {order.cardNumber}</p>
        <p><strong>Expiry:</strong> {order.cardExpiry}</p>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Ordered Items</h2>
        {order.items.length === 0 ? (
          <p>No items found</p>
        ) : (
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2 text-left">Product</th>
                <th className="border p-2 text-left">Quantity</th>
                <th className="border p-2 text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item: OrderItemResponseDTO) => (
                <tr key={item.productId}>
                  <td className="border p-2">{item.productName}</td>
                  <td className="border p-2">{item.quantity}</td>
                  <td className="border p-2">${item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Toast */}
      <Toast message={toastMessage} show={showToast} />
    </div>
  );
}
