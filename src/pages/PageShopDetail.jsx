import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { produkAPI } from "../services/produkAPI";
import { notesAPI } from "../services/testimoniAPI"; // <--- MENGGUNAKAN API YANG SUDAH ADA (notesAPI)

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

  // State lokal untuk form ulasan
  const [reviewFormName, setReviewFormName] = useState('');
  const [reviewFormText, setReviewFormText] = useState('');
  const [reviewFormPhoto, setReviewFormPhoto] = useState('');
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

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-700 text-lg">Loading...</div>;
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

  
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!reviewFormName || !reviewFormText) {
      setReviewSubmissionError("Nama dan ulasan tidak boleh kosong!");
      return;
    }
    setReviewSubmissionError(''); 

    
    const reviewDataToSend = {
      nama: reviewFormName, 
      deskripsi: reviewFormText, 
      foto: reviewFormPhoto, 
      created_at: new Date().toISOString(), 
    };

    try {
      setIsSubmittingReview(true);
      await notesAPI.createNote(reviewDataToSend); 

      alert(`Ulasan dari ${reviewFormName} berhasil dikirim!`);
      
      // Reset form setelah berhasil submit
      setReviewFormName('');
      setReviewFormText('');
      setReviewFormPhoto('');


    } catch (apiError) {
      console.error("Error submitting review:", apiError);
      setReviewSubmissionError("Gagal mengirim ulasan. Silakan coba lagi.");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-grow py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
          {/* Left: Images */}
          <div className="flex flex-col gap-4 items-center">
            <img
              src={product.foto}
              alt={product.nama}
              className="w-full h-64 sm:h-80 md:h-96 object-cover rounded-lg shadow-md"
            />
            {/* Thumbnail list */}
            <div className="flex gap-2 overflow-x-auto w-full justify-center md:justify-start py-2">
              {[product.foto, product.foto, product.foto, product.foto].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${product.nama} thumbnail ${i + 1}`}
                  className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border-2 border-transparent hover:border-green-500 cursor-pointer transition-all duration-200"
                />
              ))}
            </div>
          </div>

          {/* Right: Details */}
          <div className="flex flex-col gap-3 sm:gap-4">
            {/* Nama & Rating */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-gray-900">{product.nama}</h1>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm sm:text-base text-gray-600">
              <span className="flex items-center gap-1 text-yellow-500">
                ⭐⭐⭐⭐⭐ <span className="text-gray-600">4.9</span>
              </span>
              <span>•</span>
              <span>1.2rb Penilaian</span>
              <span>•</span>
              <span>3rb+ Terjual</span>
            </div>

            {/* Harga */}
            <div className="bg-orange-50 px-4 sm:px-6 py-4 sm:py-6 rounded-lg border border-orange-200 my-2">
              <p className="text-3xl sm:text-4xl lg:text-5xl text-orange-600 font-extrabold">
                Rp {parseInt(product.harga).toLocaleString("id-ID")}
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mt-1">Termasuk PPN (jika berlaku)</p>
            </div>

            {/* Promo statis */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 bg-green-50 text-green-800 px-4 py-3 rounded-lg text-sm sm:text-base">
              <span className="font-semibold">Gratis Ongkir</span>
              <span className="text-gray-600">Min. belanja Rp50.000</span>
            </div>

            {/* Kuantitas */}
            <div className="flex items-center gap-4 mt-2">
              <span className="min-w-[80px] font-medium text-gray-800 text-sm sm:text-base">Kuantitas</span>
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <button
                  onClick={decrement}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 text-lg font-bold hover:bg-gray-100 transition-colors"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                  className="w-12 text-center text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-green-500"
                />
                <button
                  onClick={increment}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 text-lg font-bold hover:bg-gray-100 transition-colors"
                >
                  +
                </button>
              </div>
              <span className="text-sm text-gray-500">Stok tersedia</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6">
              <button
                type="button"
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 sm:py-3.5 rounded-lg shadow-md transition-colors text-base sm:text-lg"
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
                      name: "",
                      address: "",
                      voucher: "",
                      discountAmount: 0,
                    },
                  })
                }
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-3 sm:py-3.5 rounded-lg shadow-md transition-colors text-base sm:text-lg"
              >
                Beli Sekarang
              </button>
            </div>
          </div>
        </div>

        {/* Bagian Deskripsi Produk (Statis) */}
        <section className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10 mt-8 sm:mt-12">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
            Deskripsi Produk
          </h2>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed whitespace-pre-wrap">
            {staticProductDescription}
          </p>
        </section>

        {/* Bagian Ulasan Pembeli (Statis) */}
        <section className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10 mt-8 sm:mt-12">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
            Ulasan Pembeli
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
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

        {/* Bagian Formulir Tulis Ulasan (REAL) */}
        <section className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8 md:p-10 mt-8 sm:mt-12">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-6 sm:mb-8">
            Tulis Ulasan Anda
          </h2>
          {reviewSubmissionError && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 text-center">
              <span className="block sm:inline">{reviewSubmissionError}</span>
            </div>
          )}
          <form onSubmit={handleReviewSubmit} className="space-y-6">
            <div>
              <label htmlFor="reviewerName" className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                Nama Anda <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="reviewerName"
                value={reviewFormName}
                onChange={(e) => setReviewFormName(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-sm sm:text-base transition-all duration-200"
                placeholder="Masukkan nama Anda"
                required
                disabled={isSubmittingReview}
              />
            </div>
            <div>
              <label htmlFor="reviewText" className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                Ulasan Anda <span className="text-red-500">*</span>
              </label>
              <textarea
                id="reviewText"
                value={reviewFormText}
                onChange={(e) => setReviewFormText(e.target.value)}
                rows="5"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-sm sm:text-base transition-all duration-200 resize-y"
                placeholder="Bagikan pengalaman Anda tentang produk ini..."
                required
                disabled={isSubmittingReview}
              ></textarea>
            </div>
            {/* Input Link Foto Ulasan */}
            <div>
              <label htmlFor="reviewPhoto" className="block text-sm sm:text-base font-medium text-gray-700 mb-2">
                Link Foto (Opsional)
              </label>
              <input
                type="url"
                id="reviewPhoto"
                value={reviewFormPhoto}
                onChange={(e) => setReviewFormPhoto(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 text-sm sm:text-base transition-all duration-200"
                placeholder="Masukkan URL foto ulasan Anda (mis: dari Imgur, Google Photos)"
                disabled={isSubmittingReview}
              />
              {reviewFormPhoto && (
                  <div className="mt-3 flex justify-center">
                      <img src={reviewFormPhoto} alt="Preview Ulasan" className="w-24 h-24 object-cover rounded-lg border border-gray-200 shadow-sm" />
                  </div>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmittingReview}
              className="w-full inline-flex justify-center py-3 sm:py-3.5 px-6 border border-transparent shadow-md text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
            >
              {isSubmittingReview ? 'Mengirim Ulasan...' : 'Kirim Ulasan'}
            </button>
          </form>
        </section>
      </main>

      <Footer />
    </div>
  );
}