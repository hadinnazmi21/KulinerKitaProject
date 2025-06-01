import React from "react";
import { Link } from "react-router-dom";

export default function FooterComponent({ brand = "KulinerKita", links = {} }) {
  return (
    <footer className="bg-[#006633] text-white py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between text-sm space-y-6 sm:space-y-0">
        {/* Brand dan Deskripsi */}
        <div className="sm:w-1/3">
          <h4 className="text-lg font-bold mb-2">{brand}</h4>
          <p className="text-gray-300">
            Makanan viral & langka dari TikTok dan Instagram. War makanan tanpa ribet!
          </p>
        </div>

        {/* Produk */}
        {links.products && (
          <div className="sm:w-1/5">
            <h5 className="font-semibold mb-2">Produk</h5>
            <nav className="flex flex-col space-y-1">
              {links.products.map((item, i) => (
                <Link
                  to={item.href}
                  key={i}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}

        {/* Panduan */}
        {links.resources && (
          <div className="sm:w-1/5">
            <h5 className="font-semibold mb-2">Panduan</h5>
            <nav className="flex flex-col space-y-1">
              {links.resources.map((item, i) => (
                <Link
                  to={item.href}
                  key={i}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}

        {/* Bantuan */}
        {links.support && (
          <div className="sm:w-1/5">
            <h5 className="font-semibold mb-2">Bantuan</h5>
            <nav className="flex flex-col space-y-1">
              {links.support.map((item, i) => (
                <Link
                  to={item.href}
                  key={i}
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* Copyright */}
      <div className="mt-10 text-center text-gray-400 text-xs sm:text-sm">
        © {new Date().getFullYear()} {brand}. Semua hak dilindungi.
      </div>
    </footer>
  );
}
