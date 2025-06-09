import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const brand = "KulinerKita";

  const links = {
    resources: [
      { label: "Cara Pemesanan", href: "/panduan/cara-pemesanan" },
      { label: "Pengiriman", href: "/panduan/pengiriman" },
      { label: "Pembayaran", href: "/panduan/pembayaran" },
    ],
    support: [
      { label: "Hubungi Kami", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "Kebijakan Privasi", href: "/privacy-policy" },
    ],
  };

  return (
    <footer className="bg-[#006633] text-white py-10 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 gap-8 text-sm">
        {/* Brand Info */}
        <div>
          <h4 className="text-lg font-bold mb-3">{brand}</h4>
          <p className="text-gray-300">
            Makanan viral & langka dari TikTok dan Instagram. War makanan tanpa ribet!
          </p>
        </div>

        {/* Panduan */}
        <div>
          <h5 className="font-semibold mb-2">Panduans</h5>
          {links.resources.map((item, i) => (
            <Link
              to={item.href}
              key={i}
              className="block text-gray-300 hover:text-white mb-1 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Bantuan */}
        <div>
          <h5 className="font-semibold mb-2">Bantuan</h5>
          {links.support.map((item, i) => (
            <Link
              to={item.href}
              key={i}
              className="block text-gray-300 hover:text-white mb-1 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-10 border-t border-green-700 pt-6 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} {brand}. Semua hak dilindungi.
      </div>
    </footer>
  );
}
