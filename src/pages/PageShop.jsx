import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function PageShop() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Array gambar hero
  const heroImages = [
    "/img/hero/hero-1.png",
    "/img/hero/hero-1.png",
    "/img/hero/hero-1.png",
    "/img/hero/hero-1.png",
  ];

  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  // Ganti gambar otomatis setiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) =>
        prev === heroImages.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Fungsi pindah gambar manual
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
    fetch("/data/products.json")
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil data produk.");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    const keyword = search.trim().toLowerCase();
    if (!keyword) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(keyword)
        )
      );
    }
  }, [search, products]);

  return (
    <div className="bg-white min-h-screen">
       <Header />
      {/* Hero Section */}
      <section className="relative w-full h-[600px] overflow-hidden">
        <img
          src={heroImages[currentHeroIndex]}
          alt="Hero"
          className="w-full h-full object-cover"
        />
        {/* Tombol navigasi kiri */}
        <button
          onClick={prevImage}
          className="absolute top-1/2 left-4 -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full p-3 focus:outline-none transition"
          aria-label="Previous Image"
        >
          &#8249;
        </button>

        {/* Tombol navigasi kanan */}
        <button
          onClick={nextImage}
          className="absolute top-1/2 right-4 -translate-y-1/2 bg-black bg-opacity-30 hover:bg-opacity-50 text-white rounded-full p-3 focus:outline-none transition"
          aria-label="Next Image"
        >
          &#8250;
        </button>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">
          Semua Produk
        </h2>

        {/* Bar Pencarian */}
        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Cari produk berdasarkan nama..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-2 border border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-green-900"
          />
        </div>

        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-gray-500">Produk tidak ditemukan.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={index}
                image={product.image}
                name={
                  <Link
                    to={`/products/${product.id}`}
                    className="text-green-800 hover:text-green-600"
                  >
                    {product.name}
                  </Link>
                }
                price={product.price}
                description={product.description}
                onAdd={() => alert(`Added ${product.name} to cart!`)}
                cardClass="bg-white p-4 rounded-xl shadow hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out border border-gray-100"
                imageClass="w-full h-40 object-cover rounded-lg"
                nameClass="text-lg text-green-800"
                priceClass="text-green-600 font-semibold"
                descClass="text-gray-500"
                buttonClass="bg-green-600 hover:bg-green-700"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
