import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ArtikelDetail() {
  const { id } = useParams();
  const [artikel, setArtikel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch("/data/artikel.json"); 
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        const found = data.find((item) => item.id === parseInt(id));
        
        if (!found) {
          setError("Artikel tidak ditemukan.");
        } else {
          setArtikel(found);
        }
      } catch (err) {
        console.error("Gagal mengambil data artikel:", err);
        setError("Gagal memuat artikel. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);


  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-700">
        <p className="p-6 text-lg">Memuat artikel...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-red-600">
        <p className="p-6 text-lg font-semibold">{error}</p>
        <Link
          to="/ArtikelList"
          className="mt-4 text-green-600 hover:text-green-800 font-semibold text-base sm:text-lg"
        >
          &larr; Kembali ke Daftar Artikel
        </Link>
      </div>
    );
  }

  if (!artikel) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white text-gray-600">
        <p className="p-6 text-lg">Artikel tidak ditemukan.</p>
        <Link
          to="/ArtikelList"
          className="mt-4 text-green-600 hover:text-green-800 font-semibold text-base sm:text-lg"
        >
          &larr; Kembali ke Daftar Artikel
        </Link>
      </div>
    );
  }

  
  const articleContentParagraphs = artikel.isi ? artikel.isi.split('\n\n') : [];

  return (
    <div className="flex flex-col min-h-screen bg-white"> 
      <Header />

      <main className="flex-1 max-w-3xl lg:max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12"> 
       
        <img
          src={artikel.image_url}
          alt={artikel.judul}
          className="w-full h-48 sm:h-64 md:h-80 object-cover rounded-xl mb-6 shadow-md" 
        />

     
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 text-gray-900 leading-tight">
          {artikel.judul}
        </h1>

      
        <div className="flex flex-wrap items-center text-sm text-gray-500 gap-x-4 gap-y-2 mb-6">
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full font-semibold text-xs">
            {artikel.kategori}
          </span>
          <span className="text-gray-600 text-xs sm:text-sm">
            Diposting pada: {new Date().toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
          </span>
          <span className="text-gray-600 text-xs sm:text-sm">
            Oleh: KulinerKita Tim
          </span>
        </div>


        {artikel.excerpt && (
            <p className="mb-4 text-gray-700 font-medium text-base sm:text-lg leading-relaxed text-justify">
                {artikel.excerpt}
            </p>
        )}
        
        {articleContentParagraphs.map((paragraph, index) => (
          <p key={index} className="mb-4 text-gray-700 text-base sm:text-lg leading-relaxed text-justify">
            {paragraph}
          </p>
        ))}


        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 sm:p-5 mb-6 rounded-r-lg shadow-sm">
          <p className="text-sm sm:text-base font-semibold text-gray-800 mb-1">🔍 Kesimpulan:</p>
          <p className="text-sm sm:text-base text-gray-700 leading-snug text-justify">
            Dengan mengikuti tips ini, pembeli dapat lebih yakin mendapatkan makanan hits yang dia idamkan.
          </p>
        </div>

    
        <div className="flex flex-wrap gap-2 mb-8">
          {[artikel.tag1, artikel.tag2, artikel.tag3].filter(Boolean).map((tag, idx) => (
            <span
              key={idx}
              className="bg-gray-200 text-gray-700 text-xs sm:text-sm px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

       
        <Link
          to="/ArtikelList"
          className="inline-block bg-green-600 text-white px-5 py-2.5 rounded-lg hover:bg-green-700 transition-colors shadow-md text-base sm:text-lg"
        >
          &larr; Kembali ke Daftar Artikel
        </Link>
      </main>

      <Footer />
    </div>
  );
}