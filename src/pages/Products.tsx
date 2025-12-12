import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PRODUCTS_API } from "../constants";
import { FaPlus, FaBoxOpen, FaTrash, FaEdit } from "react-icons/fa";
import Table from "../components/Table";
import type { Column } from "../components/Table";
import type { Product } from "../types/Product";
import Modal from "../components/Modal";
import Toast from "../components/Toast";

export default function ProductsPage() {
  const navigate = useNavigate();

  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  // Load products
  const loadProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(PRODUCTS_API, {
        params: { page, pageSize, search },
      });
      setProducts(res.data.items || []);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [page, pageSize, search]);

  // Delete handlers
  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;
    try {
      await axios.delete(`${PRODUCTS_API}/${productToDelete.id}`);
      setDeleteModalOpen(false);
      setProductToDelete(null);
      loadProducts();
      setToastMessage("Deleted successfully!");
      setShowToast(true); // trigger toast
    } catch (err) {
      console.error(err);
    }
  };

  // Auto-hide toast after 3 seconds
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const columns: Column<Product>[] = [
    { header: "ID", accessor: "id" },
    { header: "Image", accessor: "image" },
    { header: "Product Name", accessor: "title" },
    { header: "Price", accessor: "price" },
    { header: "Category", accessor: "category" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen relative">
      <h1 className="flex items-center gap-3 text-2xl font-extrabold mb-6 text-green-800">
        <FaBoxOpen className="text-emerald-600" />
        Products
      </h1>

      <Table<Product>
        data={products}
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
        actions={(item) => (
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/dashboard/edit-product/${item.id}`)}
              className="text-blue-600 hover:underline flex items-center gap-1"
            >
              <FaEdit /> Edit
            </button>

            <button
              onClick={() => handleDeleteClick(item)}
              className="text-red-600 hover:underline flex items-center gap-1"
            >
              <FaTrash /> Delete
            </button>
          </div>
        )}
        headerActions={
          <button
            onClick={() => navigate("/dashboard/add-product")}
            className="flex items-center gap-2 bg-emerald-700 text-white px-5 py-2 rounded-full shadow hover:bg-emerald-600 hover:scale-105 transition-transform duration-200"
          >
            <FaPlus /> Add Product
          </button>
        }
      />

  
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Product"
        message={`Are you sure you want to delete "${productToDelete?.title}"?`}
      />

   
      <Toast message={toastMessage} show={showToast} />
    </div>
  );
}
