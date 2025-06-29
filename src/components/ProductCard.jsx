// src/components/ProductCard.jsx
import React from "react";
// Jika `name` akan selalu berupa komponen Link dari parent,
// maka import Link di sini mungkin tidak mutlak diperlukan untuk komponen ini sendiri,
// tapi saya biarkan untuk kejelasan.
// Asumsi: prop `name` sudah merupakan JSX (misal: <Link>Nama Produk</Link>)
// Jika `name` hanya string, Anda mungkin ingin membungkusnya dengan <Link> di sini.

export default function ProductCard({ photo, name, price, description }) {
  return (
    // Kontainer kartu: Menghilangkan max-w-xs karena grid parent sudah mengatur lebar.
    // Menambahkan hover effect untuk interaktivitas.
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 relative hover:shadow-lg transition-shadow duration-300">
      {/* Best Seller Badge */}
      {/* Posisi dan ukuran sudah baik untuk responsivitas, menambahkan z-index agar di atas gambar */}
      <span className="absolute top-3 left-3 bg-green-400 text-white text-xs font-semibold px-3 py-1 rounded z-10">
        Best Seller
      </span>
      {/* Gambar Produk: Tinggi responsif dan memastikan object-cover */}
      <img
        src={photo}
        alt={typeof name === 'string' ? name : 'Product Image'} // Alt text yang lebih baik jika `name` adalah JSX
        className="w-full h-40 sm:h-48 md:h-56 object-cover" // h-40 di mobile, h-48 di breakpoint sm, h-56 di breakpoint md
      />
      {/* Area Konten: Padding responsif */}
      <div className="p-4 sm:p-5"> {/* p-4 di mobile, p-5 di breakpoint sm ke atas */}
        <div className="mb-2">
          {/* Nama Produk: Ukuran font responsif dan leading-tight untuk baris */}
          <h2 className="font-bold text-base sm:text-lg md:text-xl text-gray-800 leading-tight">
            {name} {/* `name` diasumsikan sudah JSX Link dari parent */}
          </h2>
          {/* Harga: Ukuran font responsif */}
          <p className="text-yellow-600 text-lg sm:text-xl md:text-2xl font-bold mt-1">
            Rp{price.toLocaleString("id-ID")}
          </p>
        </div>
        {/* Deskripsi: Ukuran font responsif dan line-clamp untuk membatasi baris */}
        <p className="text-gray-600 text-xs sm:text-sm leading-snug line-clamp-2"> {/* text-xs di mobile, text-sm di breakpoint sm */}
          {description}
        </p>
      </div>
    </div>
  );
}

// CATATAN PENTING:
// Untuk menggunakan `line-clamp-2` pada paragraf deskripsi, Anda perlu menginstal
// plugin Tailwind CSS `@tailwindcss/line-clamp` dan menambahkannya ke file `tailwind.config.js` Anda.
//
// Langkah-langkahnya:
// 1. Instal plugin:
//    npm install -D @tailwindcss/line-clamp
//    ATAU
//    yarn add -D @tailwindcss/line-clamp
//
// 2. Tambahkan ke `tailwind.config.js`:
//    // tailwind.config.js
//    module.exports = {
//      // ...
//      plugins: [
//        require('@tailwindcss/line-clamp'),
//      ],
//    };