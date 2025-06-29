import { Link } from "react-router-dom";

export default function ArtikelCard({
  id,
  image_url,
  title,
  excerpt,
  kategori,
  tags = [],
}) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"> {/* Tambah duration untuk hover */}
      {/* Gambar Artikel: Tinggi responsif dan memastikan objek-cover */}
      <img
        src={image_url}
        alt={title}
        className="w-full h-48 sm:h-56 object-cover object-center" // Tambah sm:h-56 untuk tinggi lebih di layar > sm
      />
      <div className="p-4 sm:p-5"> {/* Padding responsif untuk konten */}
        {/* Kategori */}
        <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full mb-2">
          {kategori}
        </span>
        {/* Judul Artikel: Ukuran teks responsif, leading-tight untuk baris */}
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 leading-tight"> {/* Tambah sm:text-xl dan mb-2 */}
          {/* Link judul */}
          <Link to={`/artikel/${id}`} className="hover:text-green-600 transition-colors">
            {title}
          </Link>
        </h3>
        {/* Ringkasan: Batasi baris dengan line-clamp, ukuran teks responsif */}
        <p className="text-sm sm:text-base text-gray-600 mt-1 mb-3 line-clamp-3"> {/* Tambah sm:text-base, mb-3, dan line-clamp-3 */}
          {excerpt}
        </p>

        {/* Bagian tanggal, views, dan author dihilangkan (sesuai kode Anda) */}

        {/* Tags: flex-wrap dan gap sudah baik untuk responsivitas */}
        <div className="mt-2 flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
        {/* Tombol Baca Selengkapnya: Padding dan hover responsif */}
        <Link
          to={`/artikel/${id}`}
          className="block mt-4 text-center bg-green-500 text-white py-2.5 rounded-lg hover:bg-green-600 transition-colors" // Tambah py-2.5 dan transition-colors
        >
          Baca Selengkapnya
        </Link>
      </div>
    </div>
  );
}