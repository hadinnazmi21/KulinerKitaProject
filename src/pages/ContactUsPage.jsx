import React from "react";
import Header from "../components/Header"; // Pastikan path ini benar
import Footer from "../components/Footer"; // Pastikan path ini benar

export default function ContactUsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      {/* Main content area - background is white for the overall page */}
      {/* py-12 px-4 sm:px-6 lg:px-8 memastikan padding responsif di berbagai ukuran layar */}
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        {/* Kontainer utama untuk gambar dan form */}
        {/* max-w-7xl mx-auto untuk lebar maksimal dan posisi tengah */}
        {/* rounded-lg shadow-xl overflow-hidden untuk gaya card dengan sudut membulat */}
        {/* md:flex untuk layout dua kolom di medium screen ke atas, menumpuk di bawah md */}
        {/* min-h-[550px] memastikan card memiliki tinggi minimum untuk tampilan yang konsisten */}
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden md:flex min-h-[550px]">
          {/* Bagian Kiri: Gambar */}
          {/* md:w-1/2 untuk mengambil setengah lebar di medium screen ke atas */}
          {/* flex-shrink-0 untuk mencegah gambar menyusut jika ada konten lain yang membutuhkan ruang */}
          <div className="md:w-1/2 flex-shrink-0">
            <img
              src="https://st.depositphotos.com/1017986/2197/i/450/depositphotos_21977667-stock-photo-friendly-female-helpline-operator.jpg"
              alt="Hubungi Kami"
              className="w-full h-full object-cover" // w-full h-full object-cover memastikan gambar mengisi penuh dan tidak terdistorsi
            />
          </div>

          {/* Bagian Kanan: Form Kontak dengan background hijau muda profesional */}
          {/* md:w-1/2 untuk mengambil setengah lebar di medium screen ke atas */}
          {/* p-8 sm:p-12 lg:p-16 untuk padding responsif di dalam bagian form */}
          {/* flex flex-col justify-center untuk menata konten form secara vertikal di tengah */}
          {/* bg-green-50 memberikan latar belakang hijau muda yang profesional pada bagian form saja */}
          <div className="md:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-green-50">
            <h2 className="text-3xl font-bold text-[#1A223E] mb-4 sm:mb-6 text-center md:text-left">
              Hubungi Kami
            </h2>
            <p className="text-gray-700 mb-8 sm:mb-10 text-center md:text-left leading-relaxed">
              Punya pertanyaan atau masukan? Jangan ragu untuk menghubungi kami! Kami siap membantu Anda.
            </p>

            <form className="space-y-8"> {/* space-y-8 memberikan jarak vertikal yang cukup antar elemen form */}
              {/* Nama Lengkap */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Masukkan nama lengkap Anda"
                  className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-base transition-all duration-200"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Masukkan email Anda"
                  className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-base transition-all duration-200"
                  required
                />
              </div>

              {/* Pesan */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Pesan <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  placeholder="Tulis pesan Anda di sini"
                  className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-base transition-all duration-200"
                  required
                ></textarea>
              </div>

              {/* Tombol Kirim Pesan */}
              <div>
                <button
                  type="submit"
                  className="w-full inline-flex justify-center py-3.5 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                >
                  Kirim Pesan
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}