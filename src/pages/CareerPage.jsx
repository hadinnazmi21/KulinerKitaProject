import React, { useEffect, useState } from "react";
import Header from "../components/Header"; // Pastikan path ini benar
import Footer from "../components/Footer"; // Pastikan path ini benar
import CareerCard from "../components/CareerCard"; // Pastikan path ini benar

export default function CareerPage() {
  const [careers, setCareers] = useState([]);

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const res = await fetch("/data/career.json");
        const data = await res.json();
        setCareers(data);
      } catch (error) {
        console.error("Error fetching careers:", error);
        // Anda bisa menambahkan state untuk error handling di sini
      }
    };
    fetchCareers();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50"> {/* Menambahkan bg-gray-50 untuk latar belakang halaman */}
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">
        {/* Judul Halaman */}
        <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-green-800 text-center">
          Lowongan di Kuliner Kita
        </h1>
        {/* Deskripsi singkat jika diperlukan */}
        <p className="text-gray-600 text-base sm:text-lg text-center max-w-3xl mx-auto mb-12 leading-relaxed">
          Bergabunglah dengan tim kami yang dinamis dan bersemangat untuk membantu mengembangkan masa depan kuliner Indonesia!
        </p>

        {/* Grid Lowongan Pekerjaan */}
        {careers.length === 0 ? (
          <div className="text-center py-10 text-gray-600 text-lg">
            Tidak ada lowongan yang tersedia saat ini.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12"> {/* Menyesuaikan gap responsif */}
            {careers.map((career) => (
              <CareerCard
                key={career.id}
                id={career.id}
                title={career.title}
                location={career.location}
                type={career.type}
                excerpt={career.excerpt}
                qualifications={career.qualifications}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}