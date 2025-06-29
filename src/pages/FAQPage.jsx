import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
        console.error("Gagal mengambil data FAQ:", err);
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

      {/* FAQ List */}
      <div className="flex-grow max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16"> 
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-10 text-gray-800"> 
          Artikel yang Sering Dicari
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 pt-2"> 
            {filteredFaqs.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-green-200 rounded-lg p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200" 
              >
                <h3 className="font-semibold text-base sm:text-lg mb-2 text-gray-800">{item.pertanyaan}</h3> 
                <p className="text-sm text-gray-700 line-clamp-3 leading-relaxed"> 
                  {item.jawaban}
                </p>
                <div className="mt-4">
                  <Link
                    to={`/faq/${item.id}`}
                    className="text-green-600 hover:text-green-800 font-semibold text-sm sm:text-base transition-colors" 
                  >
                    Lihat Detail &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer /> 
    </div>
  );
}