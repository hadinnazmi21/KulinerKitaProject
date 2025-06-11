import React from "react";

export default function TestimoniCard({ nama, foto, deskripsi }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center text-center">
      <img
        src={foto}
        alt={nama}
        className="w-24 h-24 object-cover rounded-full mb-4 border"
      />
      <h4 className="text-lg font-semibold mb-2">{nama}</h4>
      <p className="text-gray-700 italic text-sm">"{deskripsi}"</p>
    </div>
  );
}
