import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";

export default function FAQDetail() {
  const { id } = useParams();
  const [faq, setFaq] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/faq.json")  // Sesuaikan path jika perlu
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil data FAQ.");
        return res.json();
      })
      .then((data) => {
        const foundFaq = data[parseInt(id, 10)];
        if (!foundFaq) {
          setError("FAQ tidak ditemukan.");
        } else {
          setFaq(foundFaq);
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
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
        <h2 className="text-2xl font-semibold mb-4">{faq.question}</h2>
        <p className="text-gray-700">{faq.answer}</p>

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
