import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import Table from "../components/Table";
import type { Column } from "../components/Table";
import Toast from "../components/Toast";
import Modal from "../components/Modal";
import type { Customer } from "../types/Customer";
import { API_BASE_URL } from "../constants"; // your base URL

export default function CustomersPage() {
  const navigate = useNavigate();
  const CUSTOMERS_API = `${API_BASE_URL}/customers`;

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(null);

  const loadCustomers = async () => {
    try {
      setLoading(true);
      const res = await axios.get<Customer[]>(CUSTOMERS_API);
      setCustomers(res.data);
            await new Promise((resolve) => setTimeout(resolve, 1000));

    } catch (err) {
      console.error(err);
      setToastMessage("Failed to load customers!");
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const handleDeleteClick = (customer: Customer) => {
    setCustomerToDelete(customer);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!customerToDelete) return;
    try {
      await axios.delete(`${CUSTOMERS_API}/${customerToDelete.id}`);
      setDeleteModalOpen(false);
      setCustomerToDelete(null);
      loadCustomers();
      setToastMessage("Deleted successfully!");
      setShowToast(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const columns: Column<Customer>[] = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Phone", accessor: "phone" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen relative">
      <h1 className="text-2xl font-bold mb-6 text-green-800">Customers</h1>

      <Table<Customer>
        data={customers}
        columns={columns}
        loading={loading}
        actions={(customer) => (
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/dashboard/edit-customer/${customer.id}`)}
              className="text-blue-600 hover:underline flex items-center gap-1"
            >
              <FaEdit /> Edit
            </button>
            <button
              onClick={() => handleDeleteClick(customer)}
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
        title="Delete Customer"
        message={`Are you sure you want to delete "${customerToDelete?.name}"?`}
      />

      <Toast message={toastMessage} show={showToast} />
    </div>
  );
}
