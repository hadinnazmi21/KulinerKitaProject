import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { produkAPI } from "../services/produkAPI";
import { notesAPI } from "../services/testimoniAPI"; // API yang menyimpan ulasan

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
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  // State untuk form ulasan
  const [reviewFormName, setReviewFormName] = useState('');
  const [reviewFormMessage, setReviewFormMessage] = useState('');
  const [reviewFormAvatar, setReviewFormAvatar] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewSubmissionError, setReviewSubmissionError] = useState('');

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
      .finally(() => setLoading(false));
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-700 text-lg">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-red-600 text-lg">
        <p className="p-4 text-center">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
        >
          Kembali
        </button>
      </div>
    );

  if (!product) return null;

  const decrement = () => setQuantity((q) => Math.max(1, q - 1));
  const increment = () => setQuantity((q) => q + 1);

  const staticProductDescription = `Nikmati pengalaman kuliner tak terlupakan dengan beragam pilihan makanan premium dari KulinerKita. Setiap produk dipilih dengan cermat untuk memastikan kualitas dan rasa terbaik, cocok untuk setiap momen spesial Anda. Dari hidangan tradisional hingga kreasi modern, kami hadirkan yang terbaik langsung ke pintu Anda. Dengan bahan-bahan segar dan proses pengolahan higienis, kami berkomitmen menyajikan kebahagiaan di setiap gigitan.`;

  // ======================================================
  //  🔹 HANDLE SUBMIT ULASAN (Nama, Pesan, Avatar)
  // ======================================================
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!reviewFormName || !reviewFormMessage) {
      setReviewSubmissionError("Nama dan pesan tidak boleh kosong!");
      return;
    }

    setReviewSubmissionError('');
    setIsSubmittingReview(true);

    // Data dikirim sesuai kolom di Supabase
    const reviewDataToSend = {
      nama: reviewFormName,
      pesan: reviewFormMessage,
      avatar: reviewFormAvatar || null,
      created_at: new Date().toISOString(),
    };

    try {
      console.log("Mengirim data ulasan:", reviewDataToSend);
      await notesAPI.createNote(reviewDataToSend);
      alert(`Ulasan dari ${reviewFormName} berhasil dikirim!`);

      // Reset form setelah berhasil
      setReviewFormName('');
      setReviewFormMessage('');
      setReviewFormAvatar('');

    } catch (err) {
      console.error("Error saat kirim ulasan:", err);
      setReviewSubmissionError("Gagal mengirim ulasan. Coba lagi nanti.");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  // ======================================================
  //  🔹 TAMPILAN HALAMAN
  // ======================================================
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
          {/* LEFT: GAMBAR PRODUK */}
          <div className="flex flex-col gap-4 items-center">
            <img
              src={product.foto}
              alt={product.nama}
              className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-lg shadow-md"
            />
            <div className="flex gap-2 overflow-x-auto w-full justify-center md:justify-start py-2">
              {[product.foto, product.foto, product.foto].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${product.nama} thumbnail ${i + 1}`}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border-2 border-transparent hover:border-green-500 cursor-pointer transition-all duration-200"
                />
              ))}
            </div>
          </div>

          {/* RIGHT: DETAIL PRODUK */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <h1 className="text-3xl font-bold text-gray-900">{product.nama}</h1>
            <p className="text-gray-600 text-base">{product.deskripsi}</p>

            <div className="bg-orange-50 px-6 py-4 rounded-lg border border-orange-200 mt-3">
              <p className="text-4xl text-orange-600 font-extrabold">
                Rp {parseInt(product.harga).toLocaleString("id-ID")}
              </p>
            </div>

            <div className="flex items-center gap-4 mt-2">
              <span className="font-medium text-gray-800 text-sm sm:text-base">Kuantitas</span>
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <button onClick={decrement} className="px-4 py-2 hover:bg-gray-100">-</button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                  className="w-12 text-center"
                />
                <button onClick={increment} className="px-4 py-2 hover:bg-gray-100">+</button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
              <button className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-lg shadow-md">
                + Keranjang
              </button>
              <button
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
                    },
                  })
                }
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg shadow-md"
              >
                Beli Sekarang
              </button>
            </div>
          </div>
        </div>

        {/* DESKRIPSI PRODUK */}
        <section className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Deskripsi Produk</h2>
          <p className="text-gray-700 leading-relaxed">{staticProductDescription}</p>
        </section>

        {/* ULASAN PEMBELI (STASIS) */}
        <section className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Ulasan Pembeli</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {staticTestimonials.map((testimoni) => (
              <div key={testimoni.id} className="bg-gray-50 rounded-lg p-5 border border-gray-100">
                <div className="flex items-center mb-2">
                  <span className="text-yellow-500 mr-2">
                    {"⭐".repeat(testimoni.rating)}
                  </span>
                  <span className="font-semibold text-gray-800">{testimoni.author}</span>
                </div>
                <p className="text-gray-700 text-sm sm:text-base leading-snug">
                  "{testimoni.text}"
                </p>
                <p className="text-xs text-gray-500 mt-3 text-right">{testimoni.date}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FORM ULASAN (REAL KE SUPABASE) */}
        <section className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Tulis Ulasan Anda</h2>

          {reviewSubmissionError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
              {reviewSubmissionError}
            </div>
          )}

          <form onSubmit={handleReviewSubmit} className="space-y-6">
            <div>
              <label className="block font-medium mb-2 text-gray-700">
                Nama Anda <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={reviewFormName}
                onChange={(e) => setReviewFormName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                placeholder="Masukkan nama Anda"
                required
                disabled={isSubmittingReview}
              />
            </div>

            <div>
              <label className="block font-medium mb-2 text-gray-700">
                Pesan Ulasan <span className="text-red-500">*</span>
              </label>
              <textarea
                value={reviewFormMessage}
                onChange={(e) => setReviewFormMessage(e.target.value)}
                rows="5"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                placeholder="Bagikan pengalaman Anda..."
                required
                disabled={isSubmittingReview}
              ></textarea>
            </div>

            <div>
              <label className="block font-medium mb-2 text-gray-700">
                Link Avatar (Opsional)
              </label>
              <input
                type="url"
                value={reviewFormAvatar}
                onChange={(e) => setReviewFormAvatar(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                placeholder="Masukkan URL gambar profil Anda (jika ada)"
                disabled={isSubmittingReview}
              />
              {reviewFormAvatar && (
                <div className="mt-3 flex justify-center">
                  <img
                    src={reviewFormAvatar}
                    alt="Preview Avatar"
                    className="w-24 h-24 rounded-full object-cover border border-gray-200 shadow-sm"
                  />
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmittingReview}
              className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-md transition"
            >
              {isSubmittingReview ? "Mengirim..." : "Kirim Ulasan"}
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
}
