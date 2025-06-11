import React from "react";

export default function ProductCard({ photo, name, price, description }) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 relative max-w-xs">
      {/* Label Promo (opsional, bisa dihapus jika tidak perlu) */}
      <span className="absolute top-3 left-3 bg-green-400 text-white text-xs font-semibold px-3 py-1 rounded">
        Best Seller
      </span>
      {/* Foto Makanan */}
      <img
        src={photo}
        alt={name}
        className="w-full h-48 object-cover"
      />
      {/* Konten */}
      <div className="p-5">
        <div className="mb-2">
          <h2 className="font-bold text-lg text-gray-800">{name}</h2>
          <p className="text-yellow-600 text-xl font-bold mt-1">
            Rp{price.toLocaleString("id-ID")}
          </p>
        </div>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
}
