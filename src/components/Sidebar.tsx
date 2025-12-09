import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaBoxOpen, FaUsers, FaShoppingCart } from 'react-icons/fa';

export default function Sidebar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-2 px-4 py-2 rounded hover:bg-emerald-600 ${isActive ? 'bg-emerald-600' : ''}`;

  return (
    <aside className="w-64 bg-emerald-700 text-white flex flex-col p-6">
      <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
      <nav className="flex flex-col gap-4">
        <NavLink to="/dashboard" end className={linkClass}>
          <FaBoxOpen /> Products
        </NavLink>
        <NavLink to="/dashboard/customers" className={linkClass}>
          <FaUsers /> Customers
        </NavLink>
        <NavLink to="/dashboard/orders" className={linkClass}>
          <FaShoppingCart /> Orders
        </NavLink>
      </nav>
    </aside>
  );
}
