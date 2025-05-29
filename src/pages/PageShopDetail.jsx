import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function PageShopDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil data produk.");
        return res.json();
      })
      .then((data) => {
        const foundProduct = data.find((p) => String(p.id) === String(id));
        if (!foundProduct) {
          setError("Produk tidak ditemukan.");
        } else {
          setProduct(foundProduct);
        }
      })
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <div className="text-red-600 p-4 text-center">{error}</div>;
  if (!product) return <div className="p-4 text-center">Loading...</div>;

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-lg mx-auto mt-6">
      <img
        src={product.image}
        alt={product.name}
        className="rounded-xl mb-4 w-full h-48 object-cover"
      />
      <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
      <p className="text-gray-600 mb-3">{product.description}</p>
      <p className="text-green-600 font-semibold text-lg">
        Harga: Rp {parseInt(product.price).toLocaleString("id-ID")}
      </p>
    </div>
  );
}
