import React, { useEffect, useState } from "react";
import { notesAPI } from "../services/testimoniAPI";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TestimoniCard from "../components/TestimoniCard";
import TestimoniForm from "../components/TestimoniForm";

export default function TestimoniPage() {
  const [testimonis, setTestimonis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false); // State untuk loading form
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const testimonisPerPage = 9;

  const loadTestimonis = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await notesAPI.fetchNotes();
      setTestimonis(data);
    } catch (err) {
      setError("Gagal memuat testimoni");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTestimonis();
  }, []);

  const indexOfLast = currentPage * testimonisPerPage;
  const indexOfFirst = indexOfLast - testimonisPerPage;
  const currentTestimonis = testimonis.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(testimonis.length / testimonisPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Fungsi handle submit form testimoni
  const handleSubmitTestimoni = async (formData) => {
    try {
      setUploading(true);
      setError("");
      // Kirim data testimoni ke API (sesuaikan dengan API Anda)
      await notesAPI.submitNote(formData);
      await loadTestimonis(); // Refresh daftar testimoni setelah submit
      setCurrentPage(1); // Kembali ke halaman pertama setelah submit
    } catch (err) {
      setError("Gagal mengirim testimoni");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-green-900">
      <Header />

      <main className="flex-grow p-6 max-w-6xl mx-auto">
        {error && (
          <div className="bg-red-500 text-white p-4 mb-4 rounded-xl shadow-md">
            <p>{error}</p>
          </div>
        )}

        {loading && <LoadingSpinner text="Memuat testimoni..." />}

        {!loading && testimonis.length === 0 && !error && (
          <EmptyState text="Belum ada testimoni. Silakan tambah testimoni di halaman Home." />
        )}

        {/* Testimoni Grid */}
        {!loading && currentTestimonis.length > 0 && (
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pb-24">
            {currentTestimonis.map(({ id, avatar, nama, pesan }) => (
              <TestimoniCard key={id} avatar={avatar} nama={nama} pesan={pesan} />
            ))}
          </section>
        )}

        {/* Pagination fixed di bawah konten */}
        <nav
          className="sticky bottom-0 bg-white border-t border-green-300 shadow-inner py-3 max-w-6xl mx-auto flex justify-center space-x-2 px-4"
          aria-label="Pagination Navigation"
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => paginate(num)}
              className={`px-4 py-2 rounded-md border border-green-600 transition ${
                num === currentPage
                  ? "bg-green-600 text-white"
                  : "bg-white text-green-700 hover:bg-green-100"
              }`}
              aria-current={num === currentPage ? "page" : undefined}
              aria-label={`Page ${num}`}
            >
              {num}
            </button>
          ))}
        </nav>

        {/* Form Testimoni */}
        <section className="max-w-xl mx-auto my-12">
          <h2 className="text-2xl font-semibold mb-4">Kirim Testimoni</h2>
          <TestimoniForm
            fields={[
              { name: "nama", type: "text", placeholder: "Nama Anda" },
              {
                name: "pesan",
                type: "textarea",
                placeholder: "Tulis testimoni Anda...",
              },
              {
                name: "avatar",
                type: "file",
                placeholder: "Upload foto/avatar (opsional)",
              },
            ]}
            onSubmit={handleSubmitTestimoni}
            disabled={uploading}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}
