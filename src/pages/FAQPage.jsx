import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import { faqAPI } from "../services/faqAPI";

export default function FAQPage() {
  const [faqs, setFaqs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await faqAPI.fetchNotes();
        setFaqs(data);
      } catch (err) {
        console.error("Gagal mengambil data FAQ:", err);
      }
    };
    fetchData();
  }, []);

  const filteredFaqs = faqs.filter((faq) =>
    faq.pertanyaan.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen text-green-800">
      <Header />

      {/* Hero Section */}
      <section className="w-full h-full">
        <img
          src="/img/hero/FAQ.png"
          alt="FAQ Hero"
          className="w-full h-[500px] object-cover"
        />
      </section>

      {/* Search bar di bawah gambar */}
      <div className="max-w-4xl mx-auto -mt-12 px-4 relative z-10">
        <input
          type="text"
          placeholder="Ketik pertanyaan Anda..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-4 bg-white text-black rounded-full shadow-md placeholder-gray-500 focus:outline-none"
        />
      </div>

      {/* FAQ List */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-10">
          Artikel yang Sering Dicari
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pt-2">
          {filteredFaqs.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-green-200 rounded-lg p-5 shadow-sm hover:shadow-md transition"
            >
              <h3 className="font-semibold mb-2">{item.pertanyaan}</h3>
              <p className="text-sm text-gray-700 line-clamp-3">
                {item.jawaban}
              </p>
              <div className="mt-4">
                <Link
                  to={`/faq/${item.id}`}
                  className="text-green-600 hover:text-green-800 font-semibold"
                >
                  Lihat Detail &rarr;
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
