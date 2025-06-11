import { useLocation, Link } from "react-router-dom";

export default function QuotesDetail() {
  const location = useLocation();
  const { quote, author } = location.state || {};

  if (!quote) {
    return (
      <div className="p-6 text-center text-red-600">
        Data kutipan tidak tersedia. Kembali ke <Link to="/quotes" className="text-green-600 underline">daftar kutipan</Link>.
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-6">
      <p className="italic text-lg mb-4">&quot;{quote}&quot;</p>
      <p className="font-semibold text-green-700 mb-6">- {author || "Unknown"}</p>
      <Link to="/quotes" className="text-green-600 hover:text-green-800 font-medium">
        &larr; Kembali ke daftar kutipan
      </Link>
    </div>
  );
}
a