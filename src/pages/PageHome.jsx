import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import HeroSectionComponent from "../components/HeroSectionCompont";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import TestimoniForm from "../components/TestimoniForm";
import QuotesForm from "../components/QuotesForm";
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
import { uploadAvatar } from "../services/uploadService";
import { quotesAPI } from "../services/quotesAPI";

const iconMap = {
  FaStopwatch: <FaStopwatch size={36} />,
  FaStore: <FaStore size={36} />,
  FaMobileAlt: <FaMobileAlt size={36} />,
  FaHandshake: <FaHandshake size={36} />,
  FaMapMarkerAlt: <FaMapMarkerAlt size={36} />,
  FaGlobeAsia: <FaGlobeAsia size={36} />,
};

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

  const [uploading, setUploading] = useState(false);
  const [quotesSubmitting, setQuotesSubmitting] = useState(false);
  const [testimoniList, setTestimoniList] = useState([]);
  const [loadingTestimoni, setLoadingTestimoni] = useState(true);
  const [errorTestimoni, setErrorTestimoni] = useState("");

  // Carousel state
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;

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

  const prevSlide = () => {
    setStartIndex((prev) =>
      (prev - 1 + testimoniList.length) % testimoniList.length
    );
  };

  const nextSlide = () => {
    setStartIndex((prev) => (prev + 1) % testimoniList.length);
  };

  const getVisibleTestimoni = () => {
    if (testimoniList.length <= visibleCount) return testimoniList;
    let visible = [];
    for (let i = 0; i < visibleCount; i++) {
      visible.push(testimoniList[(startIndex + i) % testimoniList.length]);
    }
    return visible;
  };

  const handleSubmitTestimoni = async (data) => {
    try {
      setUploading(true);

      let avatarUrl = null;
      if (data.avatar && data.avatar instanceof File) {
        avatarUrl = await uploadAvatar(data.avatar);
      }

      const payload = {
        nama: data.nama,
        pesan: data.pesan,
      };
      if (avatarUrl) payload.avatar = avatarUrl;

      await notesAPI.createNote(payload);
      alert("Testimoni berhasil dikirim!");

      // Refresh testimoni
      const refreshedData = await notesAPI.fetchNotes();
      setTestimoniList(refreshedData);
      setStartIndex(0); // reset carousel position
    } catch (err) {
      alert("Gagal mengirim testimoni: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmitQuotes = async (data) => {
    try {
      setQuotesSubmitting(true);
      await quotesAPI.createQuote(data);
      alert("Quote berhasil dikirim!");
    } catch (err) {
      alert("Gagal mengirim quote: " + err.message);
    } finally {
      setQuotesSubmitting(false);
    }
  };

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

        {/* Feature Cards Section */}
        <section className="py-12 bg-gray-50">
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

        {/* Testimoni Carousel Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-semibold text-center mb-6">
              Testimoni Pengguna
            </h2>

            {loadingTestimoni ? (
              <div className="text-center text-gray-400">Memuat testimoni...</div>
            ) : errorTestimoni ? (
              <div className="text-center text-red-500">{errorTestimoni}</div>
            ) : testimoniList.length === 0 ? (
              <div className="text-center text-gray-400">Belum ada testimoni.</div>
            ) : (
              <div className="relative flex items-center justify-center">
                {/* Prev Button */}
                <button
                  onClick={prevSlide}
                  className="absolute left-0 z-10 bg-green-600 text-white rounded-full p-2 shadow hover:bg-green-700"
                  aria-label="Previous"
                >
                  &#8592;
                </button>

                {/* Testimoni Cards */}
                <div className="flex justify-center gap-6 overflow-hidden">
                  {getVisibleTestimoni().map((item) => (
                    <div key={item.id} className="flex-shrink-0 w-80">
                      <TestimoniCard
                        avatar={item.avatar}
                        nama={item.nama}
                        pesan={item.pesan}
                      />
                    </div>
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={nextSlide}
                  className="absolute right-0 z-10 bg-green-600 text-white rounded-full p-2 shadow hover:bg-green-700"
                  aria-label="Next"
                >
                  &#8594;
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Form Testimoni */}
        <section className="max-w-xl mx-auto my-12">
          <h2 className="text-2xl font-semibold mb-4">Kirim Testimoni</h2>
          <TestimoniForm
            fields={[
              { name: "nama", type: "text", placeholder: "Nama Anda" },
              { name: "pesan", type: "textarea", placeholder: "Tulis testimoni Anda..." },
              { name: "avatar", type: "file", placeholder: "Upload foto/avatar (opsional)" },
            ]}
            onSubmit={handleSubmitTestimoni}
            disabled={uploading}
          />
        </section>

        {/* Form Quotes */}
        <section className="max-w-xl mx-auto my-12">
          <h2 className="text-2xl font-semibold mb-4">Kirim Quote</h2>
          <QuotesForm
            fields={[
              { name: "nama", type: "text", placeholder: "Nama Anda" },
              { name: "quotes", type: "textarea", placeholder: "Tulis quote Anda..." },
            ]}
            onSubmit={handleSubmitQuotes}
            disabled={quotesSubmitting}
          />
        </section>

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
      </main>

      <Footer />
    </div>
  );
}
