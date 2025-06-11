// src/pages/PageShopDetail.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { produkAPI } from "../services/produkAPI";

export default function PageShopDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    produkAPI
      .fetchNotes()
      .then((data) => {
        const found = data.find((p) => String(p.id) === String(id));
        if (!found) {
          setError("Produk tidak ditemukan.");
        } else {
          setProduct(found);
        }
      })
      .catch((err) => setError("Gagal mengambil data produk dari Supabase."));
  }, [id]);

  if (error) return <div className="text-red-600 p-4 text-center">{error}</div>;
  if (!product) return <div className="p-4 text-center">Loading...</div>;

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-lg mx-auto mt-6">
      <img
        src={product.foto}
        alt={product.nama}
        className="rounded-xl mb-4 w-full h-48 object-cover"
      />
      <h2 className="text-2xl font-bold mb-2">{product.nama}</h2>
      <p className="text-gray-600 mb-3">{product.deskripsi}</p>
      <p className="text-green-600 font-semibold text-lg">
        Harga: Rp {parseInt(product.harga).toLocaleString("id-ID")}
      </p>
    </div>
  );
}
