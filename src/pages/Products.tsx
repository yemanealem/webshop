import React, { useEffect, useState } from "react";
import type { Column } from "../components/Table";
import Table from "../components/Table";
import type { Product } from "../types/Product";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { FaBoxOpen } from "react-icons/fa";



export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data: Product[]) => setProducts(data));
  }, []);

  const columns: Column<Product>[] = [
    { header: "ID", accessor: "id" },
    { header: "Title", accessor: "title" },
    { header: "Price", accessor: "price" },
    { header: "Category", accessor: "category" },
    { header: "Image", accessor: "image" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="flex items-center gap-3 text-2xl md:text-2xl font-extrabold mb-6 text-green-800">
        <FaBoxOpen className="text-emerald-600" />
        Products
      </h1>
      <Table<Product>
        data={products}
        columns={columns}
        headerActions={
          <button
              onClick={() => navigate("/dashboard/add-product")}
              className="flex items-center gap-2 bg-emerald-700 text-white px-5 py-2 rounded-full shadow hover:bg-emerald-600 hover:scale-105 transition-transform duration-200"
            >
              <FaPlus className="text-sm" /> Add Product
            </button>
        }
        actions={(product) => (
          <div className="flex gap-2">
            <button className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
              Edit
            </button>
            <button className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">
              Delete
            </button>
          </div>
        )}
      />
    </div>
  );
}
