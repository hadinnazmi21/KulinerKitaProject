import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header"; 
import Footer from "../components/Footer"; 
import { faqAPI } from "../services/faqAPI"; 

export default function FAQDetail() {
  const { id } = useParams();
  const [faq, setFaq] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await faqAPI.fetchNotes();
        
        const selected = data.find((item) => item.id === parseInt(id));
        if (!selected) {
          setError("FAQ tidak ditemukan.");
        } else {
          setFaq(selected);
        }
      } catch (err) {
        console.error("Error fetching FAQ detail:", err);
        setError("Gagal mengambil data FAQ.");
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]); 

 
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-700">
        <p className="p-6 text-lg">Memuat detail FAQ...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-red-600">
        <p className="p-6 text-lg font-semibold">{error}</p>
        <Link
          to="/FAQPage"
          className="mt-4 text-green-600 hover:text-green-800 font-semibold text-base sm:text-lg"
        >
          &larr; Kembali ke Daftar FAQ
        </Link>
      </div>
    );
  }

 
  if (!faq) {
      return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-600">
              <p className="p-6 text-lg">FAQ tidak ditemukan.</p>
              <Link
                  to="/FAQPage"
                  className="mt-4 text-green-600 hover:text-green-800 font-semibold text-base sm:text-lg"
              >
                  &larr; Kembali ke Daftar FAQ
              </Link>
          </div>
      );
  }


  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800"> 
      <Header />

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
      
        <section className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-green-800 mb-3">
            Detail FAQ
          </h1>
          
        </section>

        <section className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6 sm:p-8 md:p-10 border border-green-100">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-gray-900 leading-tight">
            {faq.pertanyaan}
          </h2>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
            {faq.jawaban}
          </p>

          <div className="mt-8 pt-6 border-t border-gray-200"> 
            <Link
              to="/FAQPage"
              className="inline-flex items-center text-green-600 hover:text-green-800 font-semibold text-base sm:text-lg transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Kembali ke Daftar FAQ
            </Link>
          </div>
        </section>
      </main>

      <Footer /> 
    </div>
  );
}