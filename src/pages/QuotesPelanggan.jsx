import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { quotesAPI } from "../services/quotesAPI";

export default function QuotesPelanggan() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadQuotes = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await quotesAPI.fetchQuotes();
      setQuotes(data);
    } catch (err) {
      setError("Gagal memuat quotes");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuotes();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-grow max-w-4xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Daftar Quotes Pelanggan</h2>

        {error && <p className="text-red-600 mb-4">{error}</p>}
        {loading && <p>Memuat quotes...</p>}
        {!loading && quotes.length === 0 && <p>Belum ada quotes.</p>}

        <ul className="space-y-6">
          {quotes.map(({ id, nama, quotes }) => (
            <li key={id} className="border p-4 rounded shadow bg-gray-50">
              <p className="italic text-gray-700">"{quotes}"</p>
              <p className="mt-2 font-semibold text-right">- {nama}</p>
            </li>
          ))}
        </ul>
      </main>

      <Footer />
    </div>
  );
}
