import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo & Brand */}
        <div className="flex items-center space-x-2">
          <img
            src="/img/J.png"
            alt="KulinerKita Logo"
            className="h-8 w-auto object-contain"
          />
          <span className="font-bold text-lg text-green-700">KulinerKita</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-800">
          <Link className="hover:text-green-600 transition" to="/">
            Home
          </Link>
          {/* Dropdown Label - Not Clickable */}
          <div className="relative group">
            <div className="cursor-pointer hover:text-green-600 transition">
              About KulinerKita ▾
            </div>

            {/* Dropdown Box */}
            <div className="absolute left-0 mt-2 w-44 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible invisible transition-all duration-300 z-10 pointer-events-auto">
              <Link
                to="/PageAboutUs"
                className="block px-4 py-2 text-sm hover:bg-gray-100 text-gray-800"
              >
                About Us
              </Link>
              <Link
                to="/ContactUsPage"
                className="block px-4 py-2 text-sm hover:bg-gray-100 text-gray-800"
              >
                Contact Us
              </Link>
              <Link
                to="/ArtikelPage"
                className="block px-4 py-2 text-sm hover:bg-gray-100 text-gray-800"
              >
                Artikel
              </Link>
              <Link
                to="/OurTeamPage"
                className="block px-4 py-2 text-sm hover:bg-gray-100 text-gray-800"
              >
                Our Team
              </Link>
            </div>
          </div>
          <Link className="hover:text-green-600 transition" to="/ErrorPage400">
            Portfolio
          </Link>
          <Link className="hover:text-green-600 transition" to="/TestimoniPage">
            Testimoni
          </Link>
          <Link className="hover:text-green-600 transition" to="/CareerPage">
            Career
          </Link>
          <Link className="hover:text-green-600 transition" to="/FAQPage">
            FAQ
          </Link>
          <Link
            className="hover:text-green-600 transition"
            to="/QuotesPelanggan"
          >
            Quotes
          </Link>
          <Link
            to="/ContactUsPage"
            className="bg-green-600 text-white font-semibold px-5 py-1.5 rounded-full shadow hover:bg-green-700 transition"
          >
            Contact Us
          </Link>
        </nav>

        {/* Login/Register */}
        <div className="ml-4 hidden md:block">
          <Link
            to="/Login"
            className="text-sm text-green-700 font-medium hover:underline"
          >
            Masuk / Daftar
          </Link>
        </div>
      </div>
    </header>
  );
}
