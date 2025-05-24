import React from "react";
import { Link } from "react-router-dom";

export default function FooterComponent({ brand = "KulinerKita", links = {} }) {
  return (
    <footer className="bg-[#006633] text-white py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 text-sm">
        <div>
          <h4 className="text-lg font-bold mb-3">{brand}</h4>
          <p className="text-gray-300">
            Makanan viral & langka dari TikTok dan Instagram. War makanan tanpa ribet!
          </p>
        </div>

        {links.products && (
          <div>
            <h5 className="font-semibold mb-2">Produk</h5>
            {links.products.map((item, i) => (
              <Link to={item.href} key={i} className="block text-gray-300 hover:text-white mb-1">
                {item.label}
              </Link>
            ))}
          </div>
        )}

        {links.resources && (
          <div>
            <h5 className="font-semibold mb-2">Panduan</h5>
            {links.resources.map((item, i) => (
              <Link to={item.href} key={i} className="block text-gray-300 hover:text-white mb-1">
                {item.label}
              </Link>
            ))}
          </div>
        )}

        {links.support && (
          <div>
            <h5 className="font-semibold mb-2">Bantuan</h5>
            {links.support.map((item, i) => (
              <Link to={item.href} key={i} className="block text-gray-300 hover:text-white mb-1">
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="mt-10 border-t border-green-700 pt-6 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} {brand}. Semua hak dilindungi.
      </div>
    </footer>
  );
}
