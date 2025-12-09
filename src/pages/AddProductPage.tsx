import React, { useState } from "react";
import type { Product } from "../types/Product";
import { useNavigate } from "react-router-dom";

export default function AddProductPage() {
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState<Product>({
    title: "",
    price: 0,
    category: "",
    description: "",
    image: "",
    rating: { rate: 0, count: 0 },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "rate")
      setNewProduct(prev => ({ ...prev, rating: { ...prev.rating, rate: parseFloat(value) } }));
    else if (name === "count")
      setNewProduct(prev => ({ ...prev, rating: { ...prev.rating, count: parseInt(value) } }));
    else setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log("New Product:", newProduct);
    // Here you would call your API to save the product
    navigate("/admin/products");
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
        <input type="text" name="title" placeholder="Title" value={newProduct.title} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
        <input type="number" name="price" placeholder="Price" value={newProduct.price} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
        <input type="text" name="category" placeholder="Category" value={newProduct.category} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
        <input type="text" name="image" placeholder="Image URL" value={newProduct.image} onChange={handleChange} className="border px-3 py-2 rounded w-full" />
        <textarea name="description" placeholder="Description" value={newProduct.description} onChange={handleChange} className="border px-3 py-2 rounded w-full md:col-span-2" />
        <input type="number" name="rate" placeholder="Rating" value={newProduct.rating.rate} onChange={handleChange} className="border px-3 py-2 rounded" />
        <input type="number" name="count" placeholder="Rating Count" value={newProduct.rating.count} onChange={handleChange} className="border px-3 py-2 rounded" />
      </div>

      <div className="flex gap-2 mt-4">
        <button onClick={() => navigate("/admin/products")} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
        <button onClick={handleSubmit} className="px-4 py-2 bg-emerald-700 text-white rounded hover:bg-emerald-600">Save Product</button>
      </div>
    </div>
  );
}
