import React, { useEffect, useState } from "react";
import Header from "../components/Header";

export default function FAQPage() {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    fetch("/src/assets/faq.json")
      .then((res) => res.json())
      .then((data) => setFaqs(data));
  }, []);

  return (
    <div className="bg-green-50 min-h-screen text-green-800">
      <Header />
      {/* Hero Search Section */}
      <div className="bg-green-700 text-white py-16 px-6 text-center relative overflow-hidden">
        <div className="max-w-xl mx-auto space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold">
            Bagaimana Kami Bisa Membantu?
          </h1>

          <form className="flex flex-col gap-4 mt-6">
            <input
              type="text"
              placeholder="Ketik pertanyaan Anda"
              aria-label="Cari pertanyaan"
              className="w-full p-3 bg-white text-black rounded-full outline-none shadow-md placeholder-gray-500"
            />

            <p className="text-sm">
              Mengalami kendala dengan pesanan? Hubungi kami melalui formulir
              bantuan.
            </p>

            <button
              type="submit"
              className="bg-white text-green-700 font-semibold px-5 py-2 rounded-full shadow hover:bg-green-100 transition"
            >
              Dapatkan Bantuan
            </button>
          </form>
        </div>
      </div>

      {/* Tabs (Static) */}
      <div className="bg-white shadow border-b border-green-200">
        <div className="flex justify-center space-x-8 py-4 font-medium text-green-700">
          <button className="border-b-2 border-green-600 pb-1">
            Belanja di KulinerKita
          </button>
          <button className="hover:text-green-900">
            Menjual di KulinerKita
          </button>
        </div>
      </div>

      {/* Featured Articles */}
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-center mb-8">
          Artikel yang Sering Dicari
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-green-200 rounded-lg p-5 shadow-sm hover:shadow-md transition"
            >
              <h3 className="font-semibold mb-2">{item.question}</h3>
              <p className="text-sm text-gray-700">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
