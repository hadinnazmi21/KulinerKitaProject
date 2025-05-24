import React, { useState } from "react";
import Header from "../components/Header";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Contoh: validasi sederhana
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ success: false, message: "Mohon isi semua kolom." });
      return;
    }

    // Simulasi submit form (bisa diganti dengan API call)
    setTimeout(() => {
      setStatus({ success: true, message: "Pesan berhasil dikirim. Terima kasih!" });
      setFormData({ name: "", email: "", message: "" });
    }, 1000);
  };

  return (
    <div className="bg-green-50 min-h-screen text-green-900">
      <Header />

      {/* Hero Section */}
      <section className="bg-green-700 text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-2">Hubungi Kami</h1>
        <p className="text-center text-green-200">
          Kami siap membantu Anda. Silakan isi formulir di bawah untuk mengirim pesan kepada kami.
        </p>
      </section>

      {/* Contact Form */}
      <section className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-12 mb-24">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-green-800 font-semibold mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap Anda"
              className="w-full px-4 py-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-green-800 font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Masukkan email Anda"
              className="w-full px-4 py-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-green-800 font-semibold mb-1">
              Pesan
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tulis pesan Anda di sini"
              rows={5}
              className="w-full px-4 py-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
              required
            />
          </div>

          {status && (
            <p
              className={`text-center font-semibold ${
                status.success ? "text-green-600" : "text-red-600"
              }`}
            >
              {status.message}
            </p>
          )}

          <div className="text-center">
            <button
              type="submit"
              className="bg-green-700 text-white font-semibold px-8 py-3 rounded-full shadow hover:bg-green-800 transition"
            >
              Kirim Pesan
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
