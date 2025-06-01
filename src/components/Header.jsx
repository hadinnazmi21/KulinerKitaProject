import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full flex justify-center bg-transparent py-4">
      <div className="flex items-center justify-between w-full max-w-5xl bg-white rounded-full shadow-md px-8 py-2">
        {/* Logo & Brand */}
        <div className="flex items-center h-10">
          <img
            src="/img/J.png"
            alt="KulinerKita Logo"
            className="h-8 w-auto object-contain"
          />
          <span className="ml-2 font-bold text-lg text-green-700">KulinerKita</span>
        </div>

        {/* Navigation */}
        <nav className="flex space-x-8 text-base font-medium text-black">
          <Link className="hover:text-green-600 transition" to="/">
            Home
          </Link>
          <Link className="hover:text-green-600 transition" to="/PageAboutUs">
            About Us
          </Link>
          <Link className="hover:text-green-600 transition" to="/ErrorPage400">
            Portfolio
          </Link>
          <Link className="hover:text-green-600 transition" to="/CustomerReviewsPage">
            Testimoni
          </Link>
          <Link className="hover:text-green-600 transition" to="/CareerPage">
            Career
          </Link>
          <Link className="hover:text-green-600 transition" to="/FAQPage">
            FAQ
          </Link>
        </nav>

        {/* Contact Button */}
        <Link
          to="/ContactUsPage"
          className="ml-4 bg-green-600 text-white font-semibold px-7 py-2 rounded-full shadow transition-all duration-200 uppercase tracking-wide hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Contact Us
        </Link>
      </div>
    </header>
  );
}
