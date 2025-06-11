import React, { useState } from "react";

export default function TestimoniForm({ onSubmit, disabled = false }) {
  const [formData, setFormData] = useState({
    nama: "",
    deskripsi: "",
    foto: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
    setFormData({ nama: "", deskripsi: "", foto: "" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow space-y-4"
    >
      <input
        type="text"
        name="nama"
        placeholder="Nama Anda"
        value={formData.nama}
        onChange={handleChange}
        className="w-full p-3 border rounded-md bg-gray-50"
        required
      />
      <textarea
        name="deskripsi"
        placeholder="Tulis testimoni Anda..."
        value={formData.deskripsi}
        onChange={handleChange}
        className="w-full p-3 border rounded-md bg-gray-50"
        required
      />
      <input
        type="text"
        name="foto"
        placeholder="Link URL foto Anda (opsional)"
        value={formData.foto}
        onChange={handleChange}
        className="w-full p-3 border rounded-md bg-gray-50"
      />

      {formData.foto && (
        <img
          src={formData.foto}
          alt="Preview"
          className="w-24 h-24 rounded-full mt-2 object-cover border"
        />
      )}
      <button
        type="submit"
        disabled={disabled}
        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-md"
      >
        {disabled ? "Mengirim..." : "Kirim Testimoni"}
      </button>
    </form>
  );
}
