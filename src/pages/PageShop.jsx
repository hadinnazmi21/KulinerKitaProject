import React from "react";
import ProductCard from "../components/ProductCard"; // pastikan path-nya benar

const products = [
  {
    image: "/img/kopisusugulaarenjpg.jpg",
    name: "Kopi Susu Gula Aren",
    price: "15.000",
    description: "Pecinta Kopi wajib nyobain ini",
  },
  {
    image: "/img/baksourat.png",
    name: "Bakso Urat Instan",
    price: "10.000",
    description: "Makan bakso tiap hari tanpa perlu ribet pesan online",
  },
  {
    image: "/img/sambalbawang.png",
    name: "Sambal Bawang Instan",
    price: "35.000",
    description: "Cocok untuk kamu anak kost agar makan lebih nikmat",
  },
  // Duplikat produk untuk demo banyak data
  {
    image: "/img/kopisusugulaarenjpg.jpg",
    name: "Kopi Gula Aren Lite",
    price: "13.000",
    description: "Varian rendah kalori, cocok buat diet!",
  },
  {
    image: "/img/baksourat.png",
    name: "Bakso Urat Jumbo",
    price: "12.000",
    description: "Lebih besar, lebih puas!",
  },
  {
    image: "/img/sambalbawang.png",
    name: "Sambal Extra Pedas",
    price: "40.000",
    description: "Bikin makanmu makin nendang!",
  },
  // Tambah produk lainnya sesuai kebutuhan
];

export default function PageShop() {
  return (
    <div className="bg-white py-16 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">
          Semua Produk
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard
              key={index}
              image={product.image}
              name={product.name}
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
      </div>
    </div>
  );
}
