export default function TestimoniCard({ avatar, nama, pesan }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between text-left h-full">
      {/* Pesan */}
      <p className="text-gray-800 mb-6 leading-relaxed text-sm">
        {pesan}
      </p>

      {/* Profil */}
      <div className="flex items-center space-x-4 mt-auto">
        {avatar ? (
          <img
            src={avatar}
            alt={nama || "Avatar"}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-green-200 flex items-center justify-center text-green-800 font-bold text-lg">
            {nama ? nama[0].toUpperCase() : "?"}
          </div>
        )}
        <div>
          <h4 className="font-semibold text-gray-900 text-sm">{nama || "Anonim"}</h4>
          <p className="text-gray-500 text-xs">Pengguna Setia KulinerKu</p>
        </div>
      </div>
    </div>
  );
}
