import { Link } from "react-router-dom";

export default function ArtikelCard({
  id,
  image_url,
  title,
  excerpt,
  tanggal,
  author,
  views,
  kategori,
  tags = []
}) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={image_url}
        alt={title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded-full mb-2">
          {kategori}
        </span>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mt-1">{excerpt}</p>
        <div className="flex items-center justify-between text-xs text-gray-500 mt-3">
          <span>📅 {tanggal}</span>
          <span>👁️ {views}</span>
        </div>
        <p className="text-sm text-gray-700 mt-2">✍️ {author}</p>
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
        <Link
          to={`/artikel/${id}`}
          className="block mt-4 text-center bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Baca Selengkapnya
        </Link>
      </div>
    </div>
  );
}
