import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";

export default function CustomerReviewsPage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("/data/reviews.json")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  return (
    <div className="bg-green-50 min-h-screen text-green-900">
     
      {/* Hero Section */}
      <section className="py-12 text-center">
        <h1 className="text-4xl font-bold text-green-800 mb-2">REVIEWS</h1>
        <div className="w-24 h-1 bg-green-600 mx-auto mb-6 rounded"></div>
      </section>

      {/* Reviews Grid */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white border border-green-200 rounded-lg shadow hover:shadow-lg transition p-6 flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-10 h-10 rounded-full border-2 border-green-400"
                />
                <span className="font-semibold text-green-700">
                  {review.name}
                </span>
              </div>
              <p className="text-green-800 flex-1">{review.review}</p>
              <Link
                to={`/reviews/${review.id}`}
                className="mt-4 text-green-600 hover:underline text-sm font-medium"
              >
                Lihat detail
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
