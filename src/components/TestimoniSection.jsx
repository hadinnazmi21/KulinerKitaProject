import React, { useEffect, useState } from "react";

export default function TestimoniSection() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("/data/reviews.json")
      .then((res) => res.json())
      .then(setReviews);
  }, []);

  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Testimoni Pelanggan
          </h2>
          <p className="text-gray-600 text-lg">
            Apa kata mereka tentang KulinerKu?
          </p>
          <div className="flex justify-center mt-2">
            <svg height="16" width="120" className="text-green-600">
              <polyline points="0,15 20,5 40,15 60,5 80,15 100,5 120,15" fill="none" stroke="currentColor" strokeWidth="3" />
            </svg>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow p-6 flex flex-col justify-between"
            >
              <p className="text-gray-700 mb-6">{r.review}</p>
              <div className="flex items-center gap-3 mt-auto">
                <img
                  src={r.avatar}
                  alt={r.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-green-500"
                />
                <div>
                  <div className="font-bold text-gray-900">{r.name}</div>
                  <div className="text-sm text-gray-500">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
