import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ContactUsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden md:flex min-h-[550px]">
         
          <div className="md:w-1/2">
            <img
              src="/img/ContactUs.png"
              alt="Hubungi Kami - Customer Service"
              className="w-full h-full object-cover rounded-l-lg" 
            />
          </div>

          
          <div className="md:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-green-50">
            <h2 className="text-3xl font-bold text-[#1A223E] mb-4 sm:mb-6 text-center md:text-left">
              Hubungi Kami
            </h2>
            <p className="text-gray-700 mb-8 sm:mb-10 text-center md:text-left leading-relaxed">
              Punya pertanyaan atau masukan? Jangan ragu untuk menghubungi kami!
              Kami siap membantu Anda.
            </p>

            <form className="space-y-8">
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
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
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
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
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Pesan <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  placeholder="Tulis pesan Anda di sini"
                  className="mt-1 block w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-base transition-all duration-200 resize-y"
                  required
                ></textarea>
              </div>

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
