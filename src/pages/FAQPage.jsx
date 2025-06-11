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
    <div className="bg-green-50 min-h-screen text-green-800">
      <Header />
      <div className="bg-green-700 text-white py-16 px-6 text-center">
        <div className="max-w-xl mx-auto space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold">
            Bagaimana Kami Bisa Membantu?
          </h1>
          <input
            type="text"
            placeholder="Ketik pertanyaan Anda"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 bg-white text-black rounded-full outline-none shadow-md placeholder-gray-500"
          />
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-center mb-8">
          Artikel yang Sering Dicari
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredFaqs.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-green-200 rounded-lg p-5 shadow-sm hover:shadow-md transition"
            >
              <div>
                <h3 className="font-semibold mb-2">{item.pertanyaan}</h3>
                <p className="text-sm text-gray-700 line-clamp-3">
                  {item.jawaban}
                </p>
              </div>
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
