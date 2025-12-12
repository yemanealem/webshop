import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../constants"; // create this constant for "http://localhost:5062/api/order"
import { FaBoxOpen, FaTrash, FaEye } from "react-icons/fa";
import Table from "../components/Table";
import type { Column } from "../components/Table";
import type { OrderSummary } from "../types/OrderSummary";
import Modal from "../components/Modal";
import Toast from "../components/Toast";

type OrderWithItems = OrderSummary & { totalItems: number; id: number };

export default function OrdersPage() {
  const navigate = useNavigate();
    const ORDERS_API = `${API_BASE_URL}/order`;


  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<OrderWithItems | null>(null);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get<OrderSummary[]>(ORDERS_API, {
        params: { page, pageSize, search },
      });

      const mappedOrders: OrderWithItems[] = res.data.map(order => ({
        ...order,
        id: order.orderId,
        totalItems: order.items?.reduce((sum, i) => sum + i.quantity, 0) || 0,
      }));

      setOrders(mappedOrders);
      setTotalPages(Math.ceil(mappedOrders.length / pageSize)); // or fetch from API if available
    } catch (err) {
      console.error(err);
      setToastMessage("Failed to load orders!");
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, [page, pageSize, search]);

  const handleDeleteClick = (order: OrderWithItems) => {
    setOrderToDelete(order);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!orderToDelete) return;
    try {
      await axios.delete(`${ORDERS_API}/${orderToDelete.orderId}`);
      setDeleteModalOpen(false);
      setOrderToDelete(null);
      loadOrders();
      setToastMessage("Order deleted successfully!");
      setShowToast(true);
    } catch (err) {
      console.error(err);
      setToastMessage("Failed to delete order!");
      setShowToast(true);
    }
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const columns: Column<OrderWithItems>[] = [
    { header: "Order ID", accessor: "orderId" },
    { header: "Customer Name", accessor: "customerName" },
    { header: "Email", accessor: "customerEmail" },
    { header: "Phone", accessor: "customerPhone" },
    { header: "Shipping City", accessor: "shippingCity" },
    { header: "Shipping Country", accessor: "shippingCountry" },
    { header: "Total Items", accessor: "totalItems" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen relative">
      <h1 className="flex items-center gap-3 text-2xl font-extrabold mb-6 text-green-800">
        <FaBoxOpen className="text-emerald-600" />
        Orders
      </h1>

      <Table<OrderWithItems>
        data={orders}
        columns={columns}
        loading={loading}
        totalPages={totalPages}
        currentPage={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setPage(1);
        }}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        actions={(order) => (
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/dashboard/order-detail/${order.orderId}`)}
              className="text-blue-600 hover:underline flex items-center gap-1"
            >
              <FaEye /> Detail
            </button>

            <button
              onClick={() => handleDeleteClick(order)}
              className="text-red-600 hover:underline flex items-center gap-1"
            >
              <FaTrash /> Delete
            </button>
          </div>
        )}
      />

      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Order"
        message={`Are you sure you want to delete order #${orderToDelete?.orderId}?`}
      />

      <Toast message={toastMessage} show={showToast} />
    </div>
  );
}
