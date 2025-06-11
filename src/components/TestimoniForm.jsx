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
      className="bg-white p-6 rounded-xl shadow space-y-6"
    >
      <fieldset className="border border-green-200 p-4 rounded-md">
        <legend className="text-sm font-medium text-green-700 px-2">Nama Anda</legend>
        <input
          type="text"
          name="nama"
          placeholder="Nama Anda"
          value={formData.nama}
          onChange={handleChange}
          className="input input-bordered w-full bg-white text-black"
          required
        />
        <p className="text-xs text-gray-500 mt-1">Masukkan nama yang ingin ditampilkan.</p>
      </fieldset>

      <fieldset className="border border-green-200 p-4 rounded-md">
        <legend className="text-sm font-medium text-green-700 px-2">Testimoni</legend>
        <textarea
          name="deskripsi"
          placeholder="Tulis testimoni Anda..."
          value={formData.deskripsi}
          onChange={handleChange}
          className="textarea textarea-bordered w-full bg-white text-black"
          required
        />
        <p className="text-xs text-gray-500 mt-1">Bagikan pengalaman Anda secara singkat.</p>
      </fieldset>

      <fieldset className="border border-green-200 p-4 rounded-md">
        <legend className="text-sm font-medium text-green-700 px-2">Foto (Opsional)</legend>
        <input
          type="text"
          name="foto"
          placeholder="Link URL foto Anda (opsional)"
          value={formData.foto}
          onChange={handleChange}
          className="input input-bordered w-full bg-white text-black"
        />
        <p className="text-xs text-gray-500 mt-1">Gunakan link gambar dari sumber terpercaya.</p>

        {formData.foto && (
          <div className="mt-3 flex justify-center">
            <img
              src={formData.foto}
              alt="Preview"
              className="w-24 h-24 rounded-full object-cover border"
            />
          </div>
        )}
      </fieldset>

      <button
        type="submit"
        disabled={disabled}
        className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-md w-full"
      >
        {disabled ? "Mengirim..." : "Kirim Testimoni"}
      </button>
    </form>
  );
}
