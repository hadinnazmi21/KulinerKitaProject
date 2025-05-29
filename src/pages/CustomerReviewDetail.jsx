import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";

export default function CustomerReviewDetail() {
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/reviews.json")
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil data review.");
        return res.json();
      })
      .then((data) => {
        const foundReview = data.find((r) => String(r.id) === id);
        if (!foundReview) {
          setError("Review tidak ditemukan.");
        } else {
          setReview(foundReview);
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="p-6 text-center">Memuat detail review...</p>;
  if (error)
    return (
      <p className="p-6 text-center text-red-600 font-semibold">{error}</p>
    );

  return (
    <div className="bg-green-50 min-h-screen text-green-900">
      <Header />
      <section className="py-12 text-center">
        <h1 className="text-4xl font-bold text-green-800 mb-2">Detail Review</h1>
        <div className="w-24 h-1 bg-green-600 mx-auto mb-6 rounded"></div>
      </section>

      <section className="max-w-3xl mx-auto bg-white rounded-lg shadow p-8">
        <div className="flex items-center gap-4 mb-6">
          <img
            src={review.avatar}
            alt={review.name}
            className="w-16 h-16 rounded-full border-2 border-green-400"
          />
          <div>
            <h2 className="text-2xl font-semibold text-green-800">{review.name}</h2>
          </div>
        </div>
        <p className="text-green-800 mb-6">{review.review}</p>
        <a
          href={review.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-600 hover:underline font-medium"
        >
          Lihat sumber review
        </a>

        <div className="mt-8">
          <Link
            to="/CustomerReviewsPage"
            className="text-green-600 hover:text-green-800 font-semibold"
          >
            &larr; Kembali ke daftar review
          </Link>
        </div>
      </section>
    </div>
  );
}
