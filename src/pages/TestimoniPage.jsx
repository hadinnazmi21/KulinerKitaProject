import React, { useEffect, useState } from "react";
import { notesAPI } from "../services/testimoniAPI";
import LoadingSpinner from "../components/LoadingSpinner";
import EmptyState from "../components/EmptyState";
import Header from "../components/Header";

export default function TestimoniPage() {
  const [testimonis, setTestimonis] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  return (
    <div className="bg-green-50 min-h-screen text-green-900 p-6">
      <Header />
      {/* Hero Section */}
      <section className="py-12 text-center">
        <h1 className="text-4xl font-bold text-green-800 mb-2">TESTIMONI</h1>
        <div className="w-24 h-1 bg-green-600 mx-auto mb-6 rounded"></div>
      </section>

      {error && (
        <div className="bg-red-500 text-white p-4 mb-4 rounded-xl shadow-md max-w-4xl mx-auto">
          <p>{error}</p>
        </div>
      )}

      {loading && <LoadingSpinner text="Memuat testimoni..." />}

      {!loading && testimonis.length === 0 && !error && (
        <EmptyState text="Belum ada testimoni. Silakan tambah testimoni di halaman Home." />
      )}

      {/* Testimoni Grid */}
      {!loading && testimonis.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {testimonis.map((testimoni) => (
              <div
                key={testimoni.id}
                className="bg-white border border-green-200 rounded-lg shadow hover:shadow-lg transition p-6 flex flex-col"
              >
                {/* Avatar dan Nama */}
                {testimoni.avatar ? (
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src={testimoni.avatar}
                      alt={testimoni.nama || "Avatar"}
                      className="w-10 h-10 rounded-full border-2 border-green-400"
                    />
                    <span className="font-semibold text-green-700">
                      {testimoni.nama || "Anonim"}
                    </span>
                  </div>
                ) : (
                  <div className="mb-4 font-semibold text-green-700">{testimoni.nama}</div>
                )}

                {/* Isi testimoni */}
                <p className="text-green-800 flex-1 whitespace-pre-line">{testimoni.pesan}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
