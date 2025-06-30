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
    <div className="flex flex-col h-full bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      
      {/* Gambar Header */}
      <img
        src={image_url}
        alt={title}
        className="w-full h-48 sm:h-56 object-cover object-center"
      />

      {/* Konten */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        
        {/* Kategori */}
        <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded-full mb-2">
          {kategori}
        </span>

        {/* Judul */}
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 leading-tight">
          <Link to={`/artikel/${id}`} className="hover:text-green-600 transition-colors">
            {title}
          </Link>
        </h3>

        {/* Deskripsi */}
        <p className="text-sm sm:text-base text-gray-600 mb-3 flex-grow line-clamp-3">
          {excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Tombol di posisi bawah */}
        <div className="mt-auto">
          <Link
            to={`/artikel/${id}`}
            className="block text-center bg-green-500 text-white py-2.5 rounded-lg hover:bg-green-600 transition-colors"
          >
            Baca Selengkapnya
          </Link>
        </div>
        
      </div>
    </div>
  );
}
