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
        <nav className="hidden md:flex items-center space-x-4 text-sm font-medium text-gray-800">
          <Link className="hover:text-green-600 transition" to="/">
            Home
          </Link>

          {/* Dropdown About */}
          <div className="dropdown dropdown-hover">
            <div
              tabIndex={0}
              role="button"
              className="hover:text-green-600 transition"
            >
              About KulinerKita ▾
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-white rounded-box w-52 p-2 shadow-md z-10"
            >
              <li>
                <Link
                  to="/PageAboutUs"
                  className="hover:bg-gray-100 rounded"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/ContactUsPage"
                  className="hover:bg-gray-100 rounded"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/ArtikelList"
                  className="hover:bg-gray-100 rounded"
                >
                  Artikel
                </Link>
              </li>
              <li>
                <Link
                  to="/OurTeamPage"
                  className="hover:bg-gray-100 rounded"
                >
                  Our Team
                </Link>
              </li>
            </ul>
          </div>

          <Link className="hover:text-green-600 transition" to="/TestimoniPage">
            Testimoni
          </Link>

          {/* Dropdown Lainnya */}
          <div className="dropdown dropdown-hover">
            <div
              tabIndex={0}
              role="button"
              className="hover:text-green-600 transition"
            >
              Lainnya ▾
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-white rounded-box w-52 p-2 shadow-md z-10"
            >
              <li>
                <Link
                  to="/CareerPage"
                  className="hover:bg-gray-100 rounded"
                >
                  Career
                </Link>
              </li>
              <li>
                <Link
                  to="/SimulasiWar"
                  className="hover:bg-gray-100 rounded"
                >
                  Simulasi War
                </Link>
              </li>
            </ul>
          </div>

          <Link className="hover:text-green-600 transition" to="/FAQPage">
            FAQ
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
