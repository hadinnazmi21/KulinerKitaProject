import React from "react";

import HeroSectionComponent from "../components/HeroSectionCompont";

import ProductCard from "../components/ProductCard";
import TrustedSection from "../components/TrustedSection";
import TestimoniSection from "../components/TestimoniSection";

export default function PageHome() {
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
      name: "Sambal Bawang",
      price: "35.000",
      description: "Cocok untuk kamu anak kost agar makan lebih nikmat",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-white">
      <HeroSectionComponent
        image="/img/hero-1.png"
        subtitle="Place to Buy Viral Food"
        title="Join The War "
        description="Tempat dimana anda dapat mendahului war product yang sulit di dapat"
        buttonLabel="Shop Now"
        buttonLink="/PageShop"
      />
      <TrustedSection />

      {/* Product Section */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {products.map((product, idx) => (
              <ProductCard
                key={idx}
                image={product.image}
                name={product.name}
                price={product.price}
                description={product.description}
                onAdd={() => alert(`Added ${product.name} to cart!`)}
                cardClass="bg-white p-6 rounded-xl shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out"
                imageClass="w-40 h-40 object-cover rounded-full mx-auto"
                nameClass="mt-4 text-xl font-bold"
                priceClass="mt-1 text-sm"
                descClass="mt-2 text-sm"
                buttonClass="mt-4"
              />
            ))}
          </div>
        </div>
      </section>

      <TestimoniSection />
    </div>
  );
}
