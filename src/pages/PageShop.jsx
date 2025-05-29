import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

export default function PageShop() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil data produk.");
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="bg-white py-16 min-h-screen">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-green-700 mb-8 text-center">
          Semua Produk
        </h2>

        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <ProductCard
                key={index}
                image={product.image}
                name={
                  <Link
                    to={`/products/${product.id}`}  // Perhatikan path disini sudah sesuai route
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
