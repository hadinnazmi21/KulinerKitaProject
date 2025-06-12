import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ArtikelDetail() {
  const { id } = useParams();
  const [artikel, setArtikel] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/data/artikel.json");
      const data = await res.json();
      const found = data.find((item) => item.id === parseInt(id));
      setArtikel(found);
    };
    fetchData();
  }, [id]);

  if (!artikel) return <p className="p-6">Memuat artikel...</p>;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 max-w-3xl mx-auto px-4 py-8">
        <img
          src={artikel.image_url}
          alt={artikel.judul}
          className="w-full h-64 object-cover rounded-xl mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">{artikel.judul}</h1>
        <div className="flex items-center text-sm text-gray-500 gap-4 mb-4">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            {artikel.kategori}
          </span>
        </div>
        <p className="mb-6 text-gray-700">{artikel.excerpt}</p>

        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-4">
          <p className="text-sm font-semibold">🔍 Kesimpulan:</p>
          <p className="text-sm">
            Dengan mengikuti tips ini, pembeli dapat lebih yakin mendapatkan makanan hits yang dia idamkan.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {[artikel.tag1, artikel.tag2, artikel.tag3].filter(Boolean).map((tag, idx) => (
            <span
              key={idx}
              className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        <Link
          to="/"
          className="inline-block bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          ← Kembali
        </Link>
      </main>

      <Footer />
    </div>
  );
}
