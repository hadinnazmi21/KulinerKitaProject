// src/components/TestimoniCard.jsx
export default function TestimoniCard({ avatar, nama, pesan }) {
  return (
    <div className="bg-white border border-green-200 rounded-lg shadow hover:shadow-lg transition p-6 flex flex-col justify-between text-center h-full">
      {/* Avatar */}
      {avatar ? (
        <img
          src={avatar}
          alt={nama || "Avatar"}
          className="w-16 h-16 rounded-full border-2 border-green-400 mx-auto mb-4 object-cover"
        />
      ) : (
        <div className="w-16 h-16 rounded-full border-2 border-green-400 mx-auto mb-4 flex items-center justify-center bg-green-200 text-green-700 font-semibold text-xl">
          {nama ? nama[0].toUpperCase() : "?"}
        </div>
      )}

      {/* Nama */}
      <h3 className="font-semibold text-green-700 mb-2">{nama || "Anonim"}</h3>

      {/* Pesan */}
      <p className="text-green-800 whitespace-pre-line flex-grow">{pesan}</p>
    </div>
  );
}
