// layouts/Header.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-between px-8 py-4 bg-white shadow-sm">
      {/* Logo */}
      <div className="h-12">
        {" "}
        {/* 3rem = 48px */}
        <img
          src="/img/J.png"
          alt="KulinerKita Logo"
          className="h-full object-contain"
        />
      </div>

      {/* Navigation */}
      <nav className="flex space-x-6 text-sm font-medium text-black font-poppins">
        <Link className="hover:text-green-600" to="/">
          Home
        </Link>
        <Link className="hover:text-green-600" to="/PageAboutUs">
          About Us
        </Link>
        <Link className="hover:text-green-600" to="/ErrorPage400">
          Portfolio
        </Link>
        <Link className="hover:text-green-600" to="/CustomerReviewsPage">
          Testimoni
        </Link>
        <Link className="hover:text-green-600" to="/CareerPage">
          Career
        </Link>
        <Link className="hover:text-green-600" to="/FAQPage">
          FAQ
        </Link>
      </nav>

      {/* Contact Button */}
      <Link
        to="/ContactUsPage"
        className="border border-green-600 text-green-600 text-sm px-4 py-2 rounded hover:bg-green-600 hover:text-white transition"
      >
        Contact Us
      </Link>
    </header>
  );
}
