import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { produkAPI } from "../services/produkAPI";

export default function PageShopDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

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
      .catch(() => setError("Gagal mengambil data produk dari Supabase."));
  }, [id]);

  if (error) return <div className="text-red-600 p-4 text-center">{error}</div>;
  if (!product) return <div className="p-4 text-center">Loading...</div>;

  const decrement = () => setQuantity((q) => Math.max(1, q - 1));
  const increment = () => setQuantity((q) => q + 1);

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Images */}
        <div className="flex flex-col gap-4 items-center">
          <img
            src={product.foto}
            alt={product.nama}
            className="w-full h-96 object-cover rounded-lg"
          />
          {/* Thumbnail list (static for now) */}
          <div className="flex gap-2 overflow-x-auto w-full justify-center md:justify-start">
            {[product.foto, product.foto, product.foto].map((src, i) => (
              <img
                key={i}
                src={src}
                alt={product.nama + i}
                className="w-20 h-20 object-cover rounded border"
              />
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div className="flex flex-col gap-4">
          {/* Nama & Rating */}
          <h1 className="text-2xl font-semibold leading-snug">{product.nama}</h1>
          <div className="flex items-center gap-3 text-sm text-gray-600">
            <span className="flex items-center gap-1">⭐⭐⭐⭐⭐ 4.9</span>
            <span>|</span>
            <span>1.2rb Penilaian</span>
            <span>|</span>
            <span>3rb+ Terjual</span>
          </div>

          {/* Harga */}
          <div className="bg-orange-50 px-4 py-6 rounded-lg border border-orange-200">
            <p className="text-3xl text-orange-600 font-bold">
              Rp {parseInt(product.harga).toLocaleString("id-ID")}
            </p>
            <p className="text-xs text-gray-500 mt-1">Termasuk PPN (jika berlaku)</p>
          </div>

          {/* Promo statis */}
          <div className="flex items-center gap-3 bg-green-50 text-green-800 px-4 py-3 rounded-lg">
            <span className="font-medium">Gratis Ongkir</span>
            <span className="text-sm">Min. belanja Rp50.000</span>
          </div>

          {/* Deskripsi */}
          <div>
            <h3 className="font-medium mb-1">Deskripsi Produk</h3>
            <p className="text-gray-700 whitespace-pre-wrap text-sm leading-relaxed">
              {product.deskripsi}
            </p>
          </div>

          {/* Kuantitas */}
          <div className="flex items-center gap-4 mt-2">
            <span className="w-24 font-medium">Kuantitas</span>
            <div className="flex items-center border rounded">
              <button
                onClick={decrement}
                className="px-3 py-1 text-lg font-bold hover:bg-gray-100"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                className="w-12 text-center focus:outline-none"
              />
              <button
                onClick={increment}
                className="px-3 py-1 text-lg font-bold hover:bg-gray-100"
              >
                +
              </button>
            </div>
            <span className="text-sm text-gray-500">Stok tersedia</span>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-4">
            <button
              type="button"
              className="flex-1 md:flex-none md:w-48 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-lg shadow"
            >
              + Keranjang
            </button>
            <button
              type="button"
              onClick={() =>
                navigate("/CheckoutPage", {
                  state: {
                    product: {
                      name: product.nama,
                      price: parseInt(product.harga),
                      image: product.foto,
                      description: product.deskripsi,
                    },
                    quantity,
                    name: "", // diisi di checkout nanti
                    address: "", // diisi di checkout nanti
                    voucher: "",
                    discountAmount: 0,
                  },
                })
              }
              className="flex-1 md:flex-none md:w-48 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg shadow"
            >
              Beli Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
