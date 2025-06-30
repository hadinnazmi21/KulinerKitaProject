import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { faqAPI } from "../services/faqAPI";

export default function FAQPage() {
  const [faqs, setFaqs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await faqAPI.fetchNotes();
        setFaqs(data);
        setError(null);
      } catch (err) {
        console.error("Gagal memuat data FAQ:", err);
        setError("Gagal memuat pertanyaan. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredFaqs = faqs.filter((faq) =>
    faq.pertanyaan.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white min-h-screen flex flex-col text-green-800">
      <Header />

      <section className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] overflow-hidden">
        <img
          src="/img/hero/FAQ.png"
          alt="FAQ Hero"
          className="w-full h-full object-cover object-center"
        />
      </section>

      <div className="max-w-4xl mx-auto -mt-12 sm:-mt-16 md:-mt-20 px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <input
          type="text"
          placeholder="Ketik pertanyaan Anda..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 sm:p-4 bg-white text-gray-800 rounded-full shadow-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow duration-200"
        />
      </div>

      <div className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full"> {/* Max-width di sini agar konten tidak terlalu lebar */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-10 text-gray-800">
          Pertanyaan yang sering dicari
        </h2>

        {loading ? (
          <div className="text-center py-10 text-gray-600 text-lg">Memuat pertanyaan...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-600 text-lg">{error}</div>
        ) : filteredFaqs.length === 0 ? (
          <div className="text-center py-10 text-gray-600 text-lg">
            Tidak ada pertanyaan yang cocok dengan pencarian Anda.
          </div>
        ) : (
          // --- PERUBAHAN DI SINI: Mengubah grid menjadi satu kolom dan menambahkan gap-y ---
          <div className="grid grid-cols-1 gap-y-4 sm:gap-y-6 pt-2">
            {filteredFaqs.map((item) => (
              <details
                key={item.id}
                className="bg-white border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
              >
                <summary className="p-4 sm:p-5 font-semibold text-base sm:text-lg text-gray-800 cursor-pointer flex justify-between items-center">
                  <span>{item.pertanyaan}</span>
                  <svg
                    className="w-5 h-5 ml-2 transition-transform duration-200 transform details-arrow text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </summary>

                <div className="p-4 sm:p-5 pt-0 text-sm text-gray-700 leading-relaxed border-t border-gray-100">
                  {item.jawaban}
                </div>
              </details>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}