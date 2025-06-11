import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
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
        setError("Gagal mengambil data FAQ.");
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) return <p className="p-6 text-center">Memuat detail FAQ...</p>;
  if (error)
    return (
      <p className="p-6 text-center text-red-600 font-semibold">{error}</p>
    );

  return (
    <div className="bg-green-50 min-h-screen text-green-800">
      <Header />
      <section className="py-12 text-center">
        <h1 className="text-4xl font-bold text-green-800 mb-2">Detail FAQ</h1>
        <div className="w-24 h-1 bg-green-600 mx-auto mb-6 rounded"></div>
      </section>

      <section className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8">
        <h2 className="text-2xl font-semibold mb-4">{faq.pertanyaan}</h2>
        <p className="text-gray-700">{faq.jawaban}</p>

        <div className="mt-8">
          <Link
            to="/FAQPage"
            className="text-green-600 hover:text-green-800 font-semibold"
          >
            &larr; Kembali ke FAQ
          </Link>
        </div>
      </section>
    </div>
  );
}
