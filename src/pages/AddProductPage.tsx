import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ProductInput } from "../types/ProductInput";
import { FaArrowLeft, FaUpload } from "react-icons/fa";
import LoadingButton from "../components/LoadingButton";
import axios from "axios";
import { PRODUCTS_API } from "../constants";

export default function AddProductPage() {
  const navigate = useNavigate();
  const [newProduct, setNewProduct] = useState<ProductInput>({
    title: "",
    price: 0,
    category: "",
    description: "",
    image: "",
    rating: { rate: 3, count: 0 },
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const categories = ["Electronics", "Clothing", "Books", "Accessories", "Shoes"];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const clearForm = () => {
    setNewProduct({
      title: "",
      price: 0,
      category: "",
      description: "",
      image: "",
      rating: { rate: 0, count: 0 },
    });
    setImageFile(null);
    setPreview("");
  };

  const handleSubmit = async () => {
    if (!imageFile) {
      alert("Please select an image!");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("Title", newProduct.title);
      formData.append("Price", newProduct.price.toString());
      formData.append("Category", newProduct.category);
      formData.append("Description", newProduct.description);
      formData.append("Image", imageFile);

      const response = await axios.post(PRODUCTS_API, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Product created:", response.data);
      setSuccessMessage("Product added successfully!");
      clearForm();

      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error(err);
      alert("Failed to add product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
        >
          <FaArrowLeft /> Back
        </button>
        <h1 className="text-3xl md:text-2xl font-semibold text-emerald-700 ml-4">
          Add <span className="text-emerald-700">New Product</span>
        </h1>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded text-center">
          {successMessage}
        </div>
      )}

      {/* Form */}
      <div className="bg-white p-6 rounded shadow max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={newProduct.title}
            onChange={handleChange}
            className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">Price</label>
          <input
            type="number"
            name="price"
            value={newProduct.price}
            onChange={handleChange}
            className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">Category</label>
          <select
            name="category"
            value={newProduct.category}
            onChange={handleChange}
            className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-white"
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-semibold text-gray-700">Product Image</label>
          <label className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded h-32 cursor-pointer hover:border-emerald-400 transition">
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            {preview ? (
              <img src={preview} alt="Preview" className="h-full w-full object-cover rounded" />
            ) : (
              <span className="flex flex-col items-center text-gray-400">
                <FaUpload className="text-2xl mb-1" /> Browse Image
              </span>
            )}
          </label>
        </div>

        <div className="flex flex-col md:col-span-2">
          <label className="mb-1 font-semibold text-gray-700">Description</label>
          <textarea
            name="description"
            value={newProduct.description}
            onChange={handleChange}
            className="border px-3 py-2 rounded h-24 focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-center mt-6 max-w-3xl mx-auto">
        <LoadingButton
          loading={loading}
          onClick={handleSubmit}
          className="bg-emerald-700 hover:bg-emerald-600 w-full text-lg"
        >
          Save Product
        </LoadingButton>
      </div>
    </div>
  );
}
