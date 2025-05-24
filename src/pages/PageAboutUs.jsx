import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PageAboutUs() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <section className="bg-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h4 className="text-sm text-gray-500 tracking-widest uppercase mb-2">
            Tentang Kami
          </h4>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Kuliner Kita</h2>
          <p className="text-lg text-gray-600">
            Tempat penjualan sekaligus war makanan viral dan langka dari Instagram
            & TikTok. Kami hadir untuk bantu kamu gak ketinggalan{" "}
            <span className="font-medium text-[#006633]">war kuliner</span>{" "}
            kekinian!
          </p>

          <div className="text-center max-w-3xl mx-auto mb-24">
            <div className="bg-[#f7f7f7] p-8 rounded-xl shadow-md mb-8">
              <h3 className="text-2xl font-semibold text-[#006633] mb-3">Visi</h3>
              <p className="text-gray-700 leading-relaxed">
                Menjadi platform kuliner terpercaya di Indonesia untuk produk
                viral & rare item, sekaligus membangun komunitas pecinta makanan
                yang aktif dan solid.
              </p>
            </div>

            <div className="bg-[#f7f7f7] p-8 rounded-xl shadow-md">
              <h3 className="text-2xl font-semibold text-[#006633] mb-3">Misi</h3>
              <p className="text-gray-700 leading-relaxed">
                Membuat makanan viral dan langka jadi mudah diakses, aman, dan
                menyenangkan lewat sistem pre-order, war, dan kurasi ketat dari
                tim kami.
              </p>
            </div>
          </div>

          <div className="text-center max-w-3xl mx-auto mb-16 mt-24">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Tim di Balik Kuliner Kita
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Kami adalah duo kreatif dengan semangat tinggi dalam membawa tren
              kuliner ke tangan kamu, langsung dari layar TikTok & Instagram.
            </p>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-gray-50 rounded-2xl p-8 shadow-md hover:shadow-lg transition text-center">
              <img
                src="/img/kela.jpg"
                alt="Foto Pendiri"
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-1">Kela</h3>
              <p className="text-sm text-gray-500 mb-3">Founder & Kurator Produk</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Bertanggung jawab atas seleksi makanan viral, tren sosial media,
                dan kualitas produk terbaik untuk pengguna.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-8 shadow-md hover:shadow-lg transition text-center">
              <img
                src="/img/hadin1.jpg"
                alt="Foto Rekan"
                className="w-32 h-32 object-cover rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800 mb-1">Hadin</h3>
              <p className="text-sm text-gray-500 mb-3">Founder & Digital Strategist</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Mengelola strategi promosi, sistem pre-order, dan komunikasi
                komunitas Kuliner Kita secara kreatif dan efisien.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="flex-grow" />
      <Footer />
    </div>
  );
}
