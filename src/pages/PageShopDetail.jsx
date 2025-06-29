import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header"; // Pastikan path ini benar
import Footer from "../components/Footer"; // Pastikan path ini benar
import { produkAPI } from "../services/produkAPI"; // Pastikan path ini benar

// Data testimoni statis
const staticTestimonials = [
  {
    id: 1,
    author: "Amanda S.",
    rating: 5,
    text: "Coklatnya enak banget! Pistachionya melimpah dan kualitas premium. Pengiriman juga cepat. Pasti repeat order!",
    date: "24 Juni 2025"
  },
  {
    id: 2,
    author: "Budi T.",
    rating: 4,
    text: "Packing rapi, coklat sampai dengan aman. Rasanya manis pas, tidak bikin eneg. Cocok untuk ngemil sore.",
    date: "20 Juni 2025"
  },
  {
    id: 3,
    author: "Citra D.",
    rating: 5,
    text: "Wow! Kualitas coklatnya jauh di atas ekspektasi. Aromanya kuat dan pistachio-nya renyah. Sangat recommended!",
    date: "18 Juni 2025"
  },
  {
    id: 4,
    author: "Dewi P.",
    rating: 5,
    text: "Pelayanan sangat baik, admin responsif. Produk sesuai deskripsi, mantap!",
    date: "15 Juni 2025"
  }
];

export default function PageShopDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // Tambah state loading
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
      .catch(() => setError("Gagal mengambil data produk."))
      .finally(() => setLoading(false)); // Set loading ke false setelah selesai
  }, [id]);

  // Tampilkan loading atau error secara full-page
  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-700 text-lg">Loading...</div>;
  if (error)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-red-600 text-lg">
        <p className="p-4 text-center">{error}</p>
        <button
          onClick={() => navigate(-1)} // Kembali ke halaman sebelumnya
          className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Kembali
        </button>
      </div>
    );
  if (!product) return null; // Jika tidak ada produk setelah loading, tampilkan null (atau bisa empty state)

  const decrement = () => setQuantity((q) => Math.max(1, q - 1));
  const increment = () => setQuantity((q) => q + 1);

  // Deskripsi produk statis yang diminta
  const staticProductDescription = `Nikmati pengalaman kuliner tak terlupakan dengan beragam pilihan makanan premium dari KulinerKita. Setiap produk dipilih dengan cermat untuk memastikan kualitas dan rasa terbaik, cocok untuk setiap momen spesial Anda. Dari hidangan tradisional hingga kreasi modern, kami hadirkan yang terbaik langsung ke pintu Anda. Dengan bahan-bahan segar dan proses pengolahan higienis, kami berkomitmen menyajikan kebahagiaan di setiap gigitan.`;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50"> {/* Latar belakang abu-abu muda */}
      <Header />

      <main className="flex-grow py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
          {/* Left: Images */}
          <div className="flex flex-col gap-4 items-center">
            <img
              src={product.foto}
              alt={product.nama}
              className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-lg shadow-md" /* Tinggi responsif & shadow */
            />
            {/* Thumbnail list */}
            <div className="flex gap-2 overflow-x-auto w-full justify-center md:justify-start py-2"> {/* py-2 untuk jarak scrollbar */}
              {[product.foto, product.foto, product.foto, product.foto].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${product.nama} thumbnail ${i + 1}`}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border-2 border-transparent hover:border-green-500 cursor-pointer transition-all duration-200" /* Ukuran responsif & hover effect */
                />
              ))}
            </div>
          </div>

          {/* Right: Details */}
          <div className="flex flex-col gap-3 sm:gap-4"> {/* Gap responsif */}
            {/* Nama & Rating */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-gray-900">{product.nama}</h1> {/* Ukuran responsif */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm sm:text-base text-gray-600"> {/* flex-wrap & gap-y untuk mobile */}
              <span className="flex items-center gap-1 text-yellow-500">
                ⭐⭐⭐⭐⭐ <span className="text-gray-600">4.9</span>
              </span>
              <span>•</span>
              <span>1.2rb Penilaian</span>
              <span>•</span>
              <span>3rb+ Terjual</span>
            </div>

            {/* Harga */}
            <div className="bg-orange-50 px-4 sm:px-6 py-4 sm:py-6 rounded-lg border border-orange-200 my-2"> {/* Padding responsif */}
              <p className="text-3xl sm:text-4xl lg:text-5xl text-orange-600 font-extrabold"> {/* Ukuran & ketebalan font responsif */}
                Rp {parseInt(product.harga).toLocaleString("id-ID")}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">Termasuk PPN (jika berlaku)</p>
            </div>

            {/* Promo statis */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 bg-green-50 text-green-800 px-4 py-3 rounded-lg text-sm sm:text-base"> {/* flex-wrap & gap-y untuk mobile, ukuran teks responsif */}
              <span className="font-semibold">Gratis Ongkir</span>
              <span className="text-gray-600">Min. belanja Rp50.000</span>
            </div>

            {/* Kuantitas */}
            <div className="flex items-center gap-4 mt-2">
              <span className="min-w-[80px] font-medium text-gray-800 text-sm sm:text-base">Kuantitas</span> {/* Ukuran teks responsif */}
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <button
                  onClick={decrement}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 text-lg font-bold hover:bg-gray-100 transition-colors" /* Padding responsif */
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                  className="w-12 text-center text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-green-500" /* Ukuran teks responsif & focus */
                />
                <button
                  onClick={increment}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 text-lg font-bold hover:bg-gray-100 transition-colors" /* Padding responsif */
                >
                  +
                </button>
              </div>
              <span className="text-sm text-gray-500">Stok tersedia</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6"> {/* flex-col di mobile, flex-row di sm */}
              <button
                type="button"
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 sm:py-3.5 rounded-lg shadow-md transition-colors text-base sm:text-lg" /* Padding & ukuran teks responsif */
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
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 sm:py-3.5 rounded-lg shadow-md transition-colors text-base sm:text-lg" /* Padding & ukuran teks responsif */
              >
                Beli Sekarang
              </button>
            </div>
          </div>
        </div>

        {/* Bagian Deskripsi Produk (Statis) */}
        <section className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10 mt-8 sm:mt-12"> {/* Padding & margin responsif */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
            Deskripsi Produk
          </h2>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed whitespace-pre-wrap">
            {staticProductDescription} {/* Menggunakan deskripsi statis di sini */}
          </p>
        </section>

        {/* Bagian Testimoni Statis */}
        <section className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10 mt-8 sm:mt-12"> {/* Padding & margin responsif */}
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
            Ulasan Pembeli
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"> {/* Grid testimoni responsif */}
            {staticTestimonials.map((testimoni) => (
              <div key={testimoni.id} className="bg-gray-50 rounded-lg p-5 border border-gray-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center mb-2">
                    <span className="text-yellow-500 mr-2">
                      {"⭐".repeat(testimoni.rating)}
                    </span>
                    <span className="font-semibold text-gray-800">{testimoni.author}</span>
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base leading-snug">
                    "{testimoni.text}"
                  </p>
                </div>
                <p className="text-xs text-gray-500 mt-3 self-end">{testimoni.date}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}