import React, { useEffect, useState } from "react";
import { notesAPI } from "../services/testimoniAPI";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import TestimoniCard from "../components/TestimoniCard";
import TestimoniForm from "../components/TestimoniForm";

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

      let fotoUrl = "";

      if (formData.foto) {
        // Simulasi upload: gunakan base64 langsung
        fotoUrl = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(formData.foto);
        });
      }

      await notesAPI.createNote({
        nama: formData.nama,
        deskripsi: formData.deskripsi,
        foto: fotoUrl,
      });

      fetchData();
      setPage(1);
    } catch (err) {
      console.error(err);
      setError("Gagal mengirim testimoni.");
    } finally {
      setUploading(false);
    }
  };

  const paginated = data.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(data.length / perPage);

  return (
    <div className="min-h-screen flex flex-col bg-white text-green-900">
      <Header />

      <main className="flex-grow p-6 max-w-6xl mx-auto">
        {error && <div className="bg-red-500 text-white p-4 rounded mb-4">{error}</div>}
        {loading && <LoadingSpinner text="Memuat testimoni..." />}
        {!loading && data.length === 0 && <EmptyState text="Belum ada testimoni." />}

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {paginated.map((item) => (
            <TestimoniCard key={item.id} nama={item.nama} foto={item.foto} deskripsi={item.deskripsi} />
          ))}
        </section>

        {/* Pagination */}
        <nav className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={`px-4 py-2 rounded border ${
                num === page
                  ? "bg-green-600 text-white"
                  : "bg-white text-green-700 border-green-500 hover:bg-green-100"
              }`}
            >
              {num}
            </button>
          ))}
        </nav>

        <section className="max-w-xl mx-auto my-12">
          <h2 className="text-2xl font-semibold mb-4">Kirim Testimoni</h2>
          <TestimoniForm onSubmit={handleSubmit} disabled={uploading} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
