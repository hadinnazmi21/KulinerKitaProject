import React, { useEffect, useState } from "react";
import { notesAPI } from "../services/testimoniAPI"; // Pastikan path ini benar
import Header from "../components/Header"; // Pastikan path ini benar
import Footer from "../components/Footer"; // Pastikan path ini benar
import LoadingSpinner from "../components/LoadingSpinner"; // Pastikan path ini benar
import EmptyState from "../components/EmptyState"; // Pastikan path ini benar
import TestimoniCard from "../components/TestimoniCard"; // Pastikan path ini benar
import TestimoniForm from "../components/TestimoniForm"; // Pastikan path ini benar

export default function TestimoniPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
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
      console.error("Error fetching testimonials:", err); // Log error for debugging
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      setUploading(true);
      setError("");

      await notesAPI.createNote({
        nama: formData.nama,
        deskripsi: formData.deskripsi,
        foto: formData.foto || "", // Foto diharapkan sebagai URL string
      });

      // Setelah sukses, muat ulang data dan kembali ke halaman 1
      fetchData();
      setPage(1);
    } catch (err) {
      console.error("Error submitting testimoni:", err); // Log error for debugging
      setError("Gagal mengirim testimoni. Silakan coba lagi.");
    } finally {
      setUploading(false);
    }
  };

  const paginated = data.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(data.length / perPage);

  return (
    <div className="min-h-screen flex flex-col bg-green-50 text-green-900"> {/* Mengubah latar belakang halaman */}
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

        {/* Loading / Empty State */}
        {loading ? (
          <LoadingSpinner text="Memuat testimoni..." />
        ) : data.length === 0 ? (
          <EmptyState text="Belum ada testimoni. Jadilah yang pertama!" />
        ) : (
          /* Bagian Daftar Testimoni */
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"> {/* Mengatur gap dan kolom */}
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

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 mb-16"> {/* Menambah mb untuk jarak ke form */}
            <div className="flex space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (num) => (
                  <button
                    key={num}
                    onClick={() => setPage(num)}
                    className={`px-4 py-2 rounded-md font-semibold border transition-colors duration-200
                      ${
                        page === num
                          ? "bg-green-600 text-white border-green-700" // Warna tombol aktif lebih solid
                          : "bg-white text-green-700 border-green-300 hover:bg-green-100 hover:border-green-400" // Hover yang lebih jelas
                      }`}
                  >
                    {num}
                  </button>
                )
              )}
            </div>
          </div>
        )}

        {/* Bagian Kirim Testimoni (Form) - Diperindah */}
        <section className="max-w-xl mx-auto mt-16 p-8 bg-white rounded-lg shadow-xl"> {/* Container baru untuk form */}
          <h2 className="text-3xl font-bold text-[#1A223E] mb-4 text-center">
            Bagikan Pengalaman Anda!
          </h2>
          <p className="text-gray-700 mb-8 text-center leading-relaxed">
            Kami sangat menghargai ulasan Anda. Mari bantu orang lain menemukan kuliner terbaik!
          </p>
          <TestimoniForm onSubmit={handleSubmit} disabled={uploading} />
          {uploading && (
            <div className="text-center text-green-600 mt-4">
              Mengirim testimoni...
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}