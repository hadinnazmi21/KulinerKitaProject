import { Link } from "react-router-dom";

export default function QuoteCard({ id, quote, author }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow hover:shadow-lg border border-gray-100 transition-all duration-300 ease-in-out">
      <p className="italic text-gray-700 mb-4">&quot;{quote}&quot;</p>
      <p className="font-semibold text-green-700 mb-3">- {author || "Unknown"}</p>
      <Link to={`/quotes/${id}`} className="text-green-600 hover:text-green-800 font-medium">
        Lihat Detail
      </Link>
    </div>
  );
}
