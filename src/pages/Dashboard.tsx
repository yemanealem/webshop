import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { FaBell } from 'react-icons/fa';

export default function Dashboard() {
  const [newOrders, setNewOrders] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomNewOrders = Math.floor(Math.random() * 5);
      setNewOrders(randomNewOrders);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1">
        <div className="bg-emerald-700 p-4 md:p-6 ml-0.5 flex justify-end items-center shadow-md">
          <button className="relative p-2 rounded-full bg-white hover:bg-gray-100 transition">
            <FaBell className="text-gray-700 text-xl" />
            {newOrders > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse">
                {newOrders}
              </span>
            )}
          </button>
        </div>

      
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
