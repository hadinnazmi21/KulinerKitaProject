import React from "react";
import Header from "../components/Header";

export default function CareerPage() {
  return (
    <div className="bg-green-50 min-h-screen text-green-900">
      <Header />

      {/* Hero Section - Full Width */}
      <section className="w-full bg-green-700 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <div className="uppercase text-green-200 font-semibold tracking-wide text-sm mb-2">
            Karir di KulinerKita
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Bergabung Bersama Kami
          </h1>
          <p className="text-lg mb-6">
            Temukan peluang kerja fleksibel dan ramah jarak jauh. <br />
            Bersama kami, jadikan hidup kerja lebih mudah, menyenangkan, dan produktif.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/careers"
              className="bg-white text-green-700 font-semibold px-6 py-3 rounded-full shadow hover:bg-green-100 transition"
            >
              Lihat Lowongan
            </a>
            <a
              href="/internships"
              className="underline text-green-100 hover:text-white text-base mt-2 sm:mt-0 sm:ml-4"
            >
              Cari magang?
            </a>
          </div>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-8 text-green-800">
          Mengapa Bergabung dengan KulinerKita?
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-8 text-green-800">
          <li className="bg-white rounded-xl shadow p-6 flex items-start gap-4 border border-green-100">
            <span className="text-green-600 text-2xl">🌱</span>
            <span>
              <span className="font-semibold">Fleksibel & Remote-friendly</span>
              <br />
              Bekerja dari mana saja dengan jam kerja yang fleksibel.
            </span>
          </li>
          <li className="bg-white rounded-xl shadow p-6 flex items-start gap-4 border border-green-100">
            <span className="text-yellow-500 text-2xl">🤝</span>
            <span>
              <span className="font-semibold">Tim Inovatif & Kolaboratif</span>
              <br />
              Bertumbuh bersama tim yang suportif dan terbuka.
            </span>
          </li>
          <li className="bg-white rounded-xl shadow p-6 flex items-start gap-4 border border-green-100">
            <span className="text-blue-500 text-2xl">🌍</span>
            <span>
              <span className="font-semibold">Budaya Inklusif</span>
              <br />
              Kami menghargai keberagaman dan inklusivitas.
            </span>
          </li>
          <li className="bg-white rounded-xl shadow p-6 flex items-start gap-4 border border-green-100">
            <span className="text-orange-500 text-2xl">⚖️</span>
            <span>
              <span className="font-semibold">Work-Life Balance</span>
              <br />
              Dukungan penuh untuk keseimbangan hidup dan kerja.
            </span>
          </li>
        </ul>
      </section>

      {/* How to Apply Section */}
      <div className="text-center pb-16">
        <p className="text-green-700 text-lg">
          Temukan posisi yang sesuai dan kirimkan lamaran Anda melalui tombol di atas.<br />
          Kami menantikan kontribusi terbaik Anda!
        </p>
      </div>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-8 text-center">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 px-4">
          <div>
            <span className="font-semibold">Kontak HRD:</span> hrd@kulinerkita.com
          </div>
          <div className="flex gap-6">
            <a href="/faq" className="underline hover:text-green-200">FAQ</a>
            <a href="/privacy" className="underline hover:text-green-200">Kebijakan Privasi</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
