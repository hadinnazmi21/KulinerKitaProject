import React, { useEffect, useState } from "react";
import { notesAPI } from "../services/testimoniAPI"; 
import Header from "../components/Header"; 
import Footer from "../components/Footer"; 
import LoadingSpinner from "../components/LoadingSpinner"; 
import EmptyState from "../components/EmptyState"; 
import TestimoniCard from "../components/TestimoniCard"; 

export default function TestimoniPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const perPage = 9;

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await notesAPI.fetchNotes();
      setData(result);
    } catch (err) {
      setError("Gagal memuat testimoni.");
      console.error("Error fetching testimonials:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const paginated = data.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(data.length / perPage);

  return (
    <div className="min-h-screen flex flex-col bg-white text-green-900">
      <Header />

      <main className="flex-grow py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Pesan Error */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6 text-center" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Judul Halaman */}
        <h1 className="text-4xl font-bold text-[#1A223E] mb-10 text-center">
          Testimoni Pelanggan
        </h1>

        {/* Loading / Empty State / Daftar Testimoni */}
        {loading ? (
          <LoadingSpinner text="Memuat testimoni..." />
        ) : data.length === 0 ? (
          <EmptyState text="Belum ada testimoni. Bagikan pengalaman Anda di halaman detail produk!" />
        ) : (
          /* Bagian Daftar Testimoni - Sudah Responsif */
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {paginated.map((item) => (
              <TestimoniCard
                key={item.id}
                nama={item.nama}
                foto={item.foto}
                deskripsi={item.deskripsi}
              />
            ))}
          </section>
        )}

        {/* Pagination - Sudah Responsif */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 mb-16">
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (num) => (
                  <button
                    key={num}
                    onClick={() => setPage(num)}
                    className={`px-4 py-2 rounded-md font-semibold border transition-colors duration-200
                      ${
                        page === num
                          ? "bg-green-600 text-white border-green-700"
                          : "bg-white text-green-700 border-green-300 hover:bg-green-100 hover:border-green-400"
                      }`}
                  >
                    {num}
                  </button>
                )
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}