// File: src/pages/PageShop.jsx

import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard"; // Pastikan path ini benar
import { Link } from "react-router-dom";
import Header from "../components/Header"; // Pastikan path ini benar
import Footer from "../components/Footer"; // Menambahkan import Footer
import { produkAPI } from "../services/produkAPI";

export default function PageShop() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const heroImages = [
    "/img/hero/hero-1.png",
    "/img/hero/hero-2.png",
    "/img/hero/hero-1.png", // Anda bisa mengubah ini menjadi gambar hero yang berbeda
    "/img/hero/hero-2.png", // Anda bisa mengubah ini menjadi gambar hero yang berbeda
  ];

  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) =>
        prev === heroImages.length - 1 ? 0 : prev + 1
      );
    }, 5000); // Ganti gambar setiap 5 detik
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const prevImage = () => {
    setCurrentHeroIndex((prev) =>
      prev === 0 ? heroImages.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentHeroIndex((prev) =>
      prev === heroImages.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    produkAPI
      .fetchNotes()
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((err) => {
        setError("Gagal mengambil data produk. Silakan coba lagi nanti.");
        console.error("Error fetching products:", err);
      });
  }, []);

  useEffect(() => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) =>
          product.nama.toLowerCase().includes(keyword)
        )
      );
    }
  }, [search, products]);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />

      {/* Hero Section - Full width dan tinggi responsif */}
      <section className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
        <img
          src={heroImages[currentHeroIndex]}
          alt="Hero Banner Produk"
          className="w-full h-full object-cover object-center" // object-cover memastikan gambar mengisi penuh tanpa distorsi horizontal
        />
        {/* Tombol navigasi hero */}
        <button
          onClick={prevImage}
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full p-2 sm:p-3 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white"
        >
          &#8249; {/* Left arrow */}
        </button>
        <button
          onClick={nextImage}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full p-2 sm:p-3 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white"
        >
          &#8250; {/* Right arrow */}
        </button>
      </section>

      {/* Konten Utama (Search Bar & Daftar Produk) */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"> {/* Padding responsif */}
        {/* Judul Bagian Produk */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-700 mb-8 text-center">
          Semua Produk Kuliner
        </h2>

        {/* Search Bar */}
        <div className="flex justify-center mb-10"> {/* Menambah mb untuk jarak */}
          <input
            type="text"
            placeholder="Cari produk berdasarkan nama..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2.5 sm:py-3 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-800 placeholder-gray-500 transition-all duration-200" /* Padding & focus responsif */
          />
        </div>

        {/* Kondisi Tampilan Produk */}
        {error ? (
          <p className="text-red-500 text-center text-lg">{error}</p>
        ) : filteredProducts.length === 0 && search !== "" ? (
          <p className="text-center text-gray-500 text-lg">Produk "{search}" tidak ditemukan.</p>
        ) : filteredProducts.length === 0 && search === "" ? (
          <p className="text-center text-gray-500 text-lg">Tidak ada produk yang tersedia saat ini.</p>
        ) : (
          /* Grid Produk - DIUBAH: grid-cols-1 untuk mobile */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"> {/* DIUBAH DI SINI */}
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                photo={product.foto}
                name={
                  <Link
                    to={`/products/${product.id}`}
                    className="text-green-800 hover:text-green-600 transition-colors"
                  >
                    {product.nama}
                  </Link>
                }
                price={product.harga}
                description={product.deskripsi}
                productId={product.id}
              />
            ))}
          </div>
        )}
      </main>

      <Footer /> {/* Pastikan Footer di-import */}
    </div>
  );
}