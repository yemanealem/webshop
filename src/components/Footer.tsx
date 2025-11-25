import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-emerald-700 via-emerald-800 to-emerald-900 text-white py-12 mt-12">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
    
    <div>
      <h3 className="text-lg font-medium mb-4">About Us</h3>
      <p className="text-gray-200 text-sm">Lab web shop built with React + TypeScript + Tailwind.</p>
    </div>

    <div>
      <h3 className="text-lg font-medium mb-4">Quick Links</h3>
      <ul className="space-y-2 text-gray-200 text-sm">
        <li><a href="/" className="hover:text-emerald-300">Home</a></li>
        <li><a href="/about" className="hover:text-emerald-300">About</a></li>
      </ul>
    </div>

    <div>
      <h3 className="text-lg font-medium mb-4">Categories</h3>
      <ul className="space-y-2 text-gray-200 text-sm">
        <li><span className="hover:text-emerald-300 cursor-default">Electronics</span></li>
        <li><span className="hover:text-emerald-300 cursor-default">Clothing</span></li>
        <li><span className="hover:text-emerald-300 cursor-default">Books</span></li>
        <li><span className="hover:text-emerald-300 cursor-default">Sports</span></li>
      </ul>
    </div>

    <div>
      <h3 className="text-lg font-medium mb-4">Contact</h3>
      <p className="text-gray-200 text-sm mb-4">support@webshop.com</p>
      <div className="flex space-x-4 text-gray-200">
        <FaFacebookF className="hover:text-emerald-300 transition-colors"/>
        <FaTwitter className="hover:text-emerald-300 transition-colors"/>
        <FaInstagram className="hover:text-emerald-300 transition-colors"/>
        <FaLinkedinIn className="hover:text-emerald-300 transition-colors"/>
      </div>
    </div>
  </div>

  <div className="border-t border-emerald-600 mt-8 pt-4 text-center text-gray-300 text-sm">
    &copy; {new Date().getFullYear()} Yemane Alem. All rights reserved .
  </div>
</footer>

  );
}
