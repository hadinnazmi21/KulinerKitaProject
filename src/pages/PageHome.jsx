import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import HeroSectionComponent from "../components/HeroSectionCompont";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import FeatureCard from "../components/FeatureCard";
import TestimoniCard from "../components/TestimoniCard";
import features from "../../public/data/feature.json";
import {
  FaStopwatch,
  FaStore,
  FaMobileAlt,
  FaHandshake,
  FaMapMarkerAlt,
  FaGlobeAsia,
} from "react-icons/fa";
import { notesAPI } from "../services/testimoniAPI";
import { quotesAPI } from "../services/quotesAPI";
import { uploadAvatar } from "../services/uploadService";
import { produkAPI } from "../services/produkAPI";

const iconMap = {
  FaStopwatch: <FaStopwatch size={36} />,
  FaStore: <FaStore size={36} />,
  FaMobileAlt: <FaMobileAlt size={36} />,
  FaHandshake: <FaHandshake size={36} />,
  FaMapMarkerAlt: <FaMapMarkerAlt size={36} />,
  FaGlobeAsia: <FaGlobeAsia size={36} />,
};

export default function PageHome() {
  const [products, setProducts] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [quotesSubmitting, setQuotesSubmitting] = useState(false);
  const [testimoniList, setTestimoniList] = useState([]);
  const [loadingTestimoni, setLoadingTestimoni] = useState(true);
  const [errorTestimoni, setErrorTestimoni] = useState("");
  const [errorProduk, setErrorProduk] = useState("");

  // Fetch produk
  useEffect(() => {
    const fetchProduk = async () => {
      try {
        const data = await produkAPI.fetchNotes();
        setProducts(data);
      } catch (err) {
        console.error("Gagal ambil produk:", err);
        setErrorProduk("Gagal memuat produk.");
      }
    };
    fetchProduk();
  }, []);

  // Fetch testimoni
  useEffect(() => {
    const fetchTestimoni = async () => {
      setLoadingTestimoni(true);
      setErrorTestimoni("");
      try {
        const data = await notesAPI.fetchNotes();
        setTestimoniList(data);
      } catch (err) {
        setErrorTestimoni("Gagal memuat testimoni");
        console.error(err);
      } finally {
        setLoadingTestimoni(false);
      }
    };
    fetchTestimoni();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-grow">
        <HeroSectionComponent
          image="/img/hero-1.png"
          subtitle="Place to Buy Viral Food"
          title="Join The War "
          description="Tempat dimana anda dapat mendahului war product yang sulit di dapat"
          buttonLabel="Shop Now"
          buttonLink="/PageShop"
        />

        {/* Feature Cards */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
              Kenapa Harus Jual Beli di{" "}
              <span className="text-green-600">KulinerKita?</span>
            </h2>
            <p className="text-center text-gray-600 mb-8">
              Fitur dan pelayanan terbaik yang kami berikan untuk semua pembeli
              dan penjual
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((feature, idx) => (
                <FeatureCard
                  key={idx}
                  icon={iconMap[feature.icon] || null}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Produk Terlaris */}
        <section className="py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <h2 className="text-2xl font-bold text-center text-green-700 mb-8">
              Produk Terlaris
            </h2>
            {errorProduk ? (
              <p className="text-center text-red-500">{errorProduk}</p>
            ) : products.length === 0 ? (
              <p className="text-center text-gray-500">
                Tidak ada produk tersedia.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                {products.slice(0, 3).map((product) => (
                  <ProductCard
                    key={product.id}
                    photo={product.foto}
                    name={product.nama}
                    price={product.harga}
                    description={product.deskripsi}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Testimoni */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold text-center mb-6">
              Testimoni Pelanggan
            </h2>
            <h4 className="text-xl text-center mb-6">Apa Kata Mereka</h4>

            {loadingTestimoni ? (
              <div className="text-center text-gray-400">
                Memuat testimoni...
              </div>
            ) : errorTestimoni ? (
              <div className="text-center text-red-500">{errorTestimoni}</div>
            ) : testimoniList.length === 0 ? (
              <div className="text-center text-gray-400">
                Belum ada testimoni.
              </div>
            ) : (
              <div className="flex justify-center flex-wrap gap-6">
                {testimoniList.slice(0, 3).map((item) => (
                  <div key={item.id} className="w-full sm:w-80">
                    <TestimoniCard
                      foto={item.foto}
                      nama={item.nama}
                      deskripsi={item.deskripsi}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
