import React, { useState } from "react";
import Header from "../components/Header";
import { contactUsAPI } from "../services/contactusAPI";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    pesan: "",
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nama || !formData.email || !formData.pesan) {
      setStatus({ success: false, message: "Mohon isi semua kolom." });
      return;
    }

    try {
      await contactUsAPI.createContact(formData);
      setStatus({ success: true, message: "Pesan berhasil dikirim. Terima kasih!" });
      setFormData({ nama: "", email: "", pesan: "" });
    } catch (error) {
      setStatus({ success: false, message: "Gagal mengirim pesan: " + error.message });
    }
  };

  return (
    <div className="bg-green-50 min-h-screen text-green-900">
      <Header />

     

      {/* Contact Form */}
      <section className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-12 mb-24">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="nama" className="block text-green-800 font-semibold mb-1">
              Nama Lengkap
            </label>
            <input
              type="text"
              id="nama"
              name="nama"
              value={formData.nama}
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
            <label htmlFor="pesan" className="block text-green-800 font-semibold mb-1">
              Pesan
            </label>
            <textarea
              id="pesan"
              name="pesan"
              value={formData.pesan}
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
