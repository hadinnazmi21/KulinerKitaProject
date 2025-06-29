import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

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

        {/* Hamburger Menu Icon (Mobile) */}
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="text-gray-800 focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Navigation */}
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

        {/* Login/Register for Desktop */}
        <div className="ml-4 hidden md:block">
          <Link
            to="/Login"
            className="text-sm text-green-700 font-medium hover:underline"
          >
            Masuk / Daftar
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg py-4">
          <nav className="flex flex-col items-start px-6 space-y-3 text-sm font-medium text-gray-800">
            <Link className="hover:text-green-600 transition w-full py-1" to="/" onClick={toggleMobileMenu}>
              Home
            </Link>

            {/* Mobile Dropdown About */}
            <div className="w-full">
              <details className="dropdown-details">
                <summary className="hover:text-green-600 transition cursor-pointer py-1">
                  About KulinerKita ▾
                </summary>
                <ul className="pl-4 pt-2 space-y-2">
                  <li>
                    <Link
                      to="/PageAboutUs"
                      className="hover:bg-gray-100 rounded block py-1"
                      onClick={toggleMobileMenu}
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/ContactUsPage"
                      className="hover:bg-gray-100 rounded block py-1"
                      onClick={toggleMobileMenu}
                    >
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/ArtikelList"
                      className="hover:bg-gray-100 rounded block py-1"
                      onClick={toggleMobileMenu}
                    >
                      Artikel
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/OurTeamPage"
                      className="hover:bg-gray-100 rounded block py-1"
                      onClick={toggleMobileMenu}
                    >
                      Our Team
                    </Link>
                  </li>
                </ul>
              </details>
            </div>

            <Link className="hover:text-green-600 transition w-full py-1" to="/TestimoniPage" onClick={toggleMobileMenu}>
              Testimoni
            </Link>

            {/* Mobile Dropdown Lainnya */}
            <div className="w-full">
              <details className="dropdown-details">
                <summary className="hover:text-green-600 transition cursor-pointer py-1">
                  Lainnya ▾
                </summary>
                <ul className="pl-4 pt-2 space-y-2">
                  <li>
                    <Link
                      to="/CareerPage"
                      className="hover:bg-gray-100 rounded block py-1"
                      onClick={toggleMobileMenu}
                    >
                      Career
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/SimulasiWar"
                      className="hover:bg-gray-100 rounded block py-1"
                      onClick={toggleMobileMenu}
                    >
                      Simulasi War
                    </Link>
                  </li>
                </ul>
              </details>
            </div>

            <Link className="hover:text-green-600 transition w-full py-1" to="/FAQPage" onClick={toggleMobileMenu}>
              FAQ
            </Link>

            <Link
              to="/ContactUsPage"
              className="bg-green-600 text-white font-semibold px-5 py-1.5 rounded-full shadow hover:bg-green-700 transition self-center mt-4"
              onClick={toggleMobileMenu}
            >
              Contact Us
            </Link>

            {/* Login/Register for Mobile */}
            <Link
              to="/Login"
              className="text-sm text-green-700 font-medium hover:underline w-full text-center mt-4"
              onClick={toggleMobileMenu}
            >
              Masuk / Daftar
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}