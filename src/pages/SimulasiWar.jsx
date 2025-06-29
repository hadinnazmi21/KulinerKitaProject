import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header"; // Ganti path sesuai struktur proyekmu
import Footer from "../components/Footer";

export default function SimulasiWar() {
  const navigate = useNavigate();

  const product = {
    name: "Coklat Dubai",
    price: 150000,
    image: "/img/simulasi.png",
    description: "Coklat Dubai dengan Pistachio pilihan",
  };

  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [voucher, setVoucher] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1 * 3600 + 30 * 60 + 45);

  const days = Math.floor(timeLeft / (3600 * 24));
  const hours = Math.floor((timeLeft % (3600 * 24)) / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timerId = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  const calculateTotal = () => {
    const subtotal = product.price * quantity;
    const discountedTotal = subtotal - discountAmount;
    return Math.max(0, discountedTotal);
  };

  const handleVoucherChange = (e) => {
    const code = e.target.value.toUpperCase();
    setVoucher(code);
    if (code === "DUBAI75") {
      setDiscountAmount(75000);
    } else {
      setDiscountAmount(0);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Order diterima:
Produk: ${product.name}
Jumlah: ${quantity}
Nama: ${name}
Alamat: ${address}
Voucher: ${voucher || "-"}
Total Harga: Rp${calculateTotal().toLocaleString("id-ID")}`);
    // Setelah alert, Anda bisa mengarahkan ke halaman checkout
    navigate("/CheckoutPage", {
      state: {
        product,
        quantity,
        name,
        address,
        voucher,
        discountAmount,
        totalPrice: calculateTotal(),
      },
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50"> {/* Menambahkan bg-gray-50 */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-grow py-8 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8"> {/* Padding responsif */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16"> {/* Gap responsif */}
          {/* Card Produk */}
          <div className="bg-white rounded-xl shadow p-6 sm:p-8 flex flex-col items-center text-center"> {/* Padding responsif */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-w-[288px] sm:max-w-xs md:max-w-sm object-cover rounded-lg mb-6" /* Ukuran gambar responsif */
            />
            <h2 className="text-xl sm:text-2xl font-semibold mb-2">{product.name}</h2> {/* Ukuran teks responsif */}
            <p className="text-green-700 font-bold text-lg sm:text-xl mb-4"> {/* Ukuran teks responsif */}
              Rp{product.price.toLocaleString("id-ID")}
            </p>
            <p className="text-gray-600 text-sm sm:text-base">{product.description}</p> {/* Ukuran teks responsif */}

            {/* Countdown */}
            <div className="mt-8 w-full">
              <h3 className="text-base sm:text-lg font-semibold mb-4 text-center"> {/* Ukuran teks responsif */}
                Waktu War Makanan
              </h3>
              <div className="grid grid-flow-col gap-3 sm:gap-4 text-center auto-cols-max justify-center"> {/* Gap responsif */}
                {[
                  { label: "Hari", value: days },
                  { label: "Jam", value: hours },
                  { label: "Menit", value: minutes },
                  { label: "Detik", value: seconds },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col p-1 sm:p-2 bg-neutral rounded-box text-neutral-content min-w-[50px] sm:min-w-[60px]" /* Ukuran kotak responsif */
                  >
                    <span
                      className="countdown font-mono text-4xl sm:text-5xl" /* Ukuran teks responsif */
                      style={{ "--value": item.value }}
                      aria-label={`${item.value} ${item.label}`}
                    >
                      {item.value.toString().padStart(2, '0')}
                    </span>
                    <span className="text-xs sm:text-sm mt-1">{item.label}</span> {/* Ukuran teks responsif */}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form Pembelian */}
          <div className="bg-white rounded-xl shadow p-6 sm:p-8"> {/* Padding responsif */}
            <h2 className="text-xl sm:text-2xl font-semibold mb-6">Form Pembelian</h2> {/* Ukuran teks responsif */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6"> {/* Gap vertikal responsif */}
              <div>
                <label htmlFor="product" className="block mb-1 font-medium text-sm sm:text-base"> {/* Ukuran teks responsif */}
                  Produk
                </label>
                <input
                  type="text"
                  id="product"
                  value={product.name}
                  disabled
                  className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed text-sm sm:text-base" /* Padding & ukuran teks responsif */
                />
              </div>

              <div>
                <label htmlFor="quantity" className="block mb-1 font-medium text-sm sm:text-base">
                  Jumlah
                </label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm sm:text-base focus:ring-green-500 focus:border-green-500 transition" /* Padding & ukuran teks responsif, focus */
                  required
                />
              </div>

              <div>
                <label htmlFor="voucher" className="block mb-1 font-medium text-sm sm:text-base">
                  Kode Voucher
                </label>
                <input
                  type="text"
                  id="voucher"
                  value={voucher}
                  onChange={handleVoucherChange}
                  placeholder="Masukkan kode voucher"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm sm:text-base focus:ring-green-500 focus:border-green-500 transition" /* Padding & ukuran teks responsif, focus */
                />
                {discountAmount > 0 && (
                  <p className="text-green-600 mt-1 font-semibold text-xs sm:text-sm"> {/* Ukuran teks responsif */}
                    Voucher berhasil digunakan! Potongan Rp75.000
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="name" className="block mb-1 font-medium text-sm sm:text-base">
                  Nama Pembeli
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama Anda"
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm sm:text-base focus:ring-green-500 focus:border-green-500 transition" /* Padding & ukuran teks responsif, focus */
                  required
                />
              </div>

              <div>
                <label htmlFor="address" className="block mb-1 font-medium text-sm sm:text-base">
                  Alamat Pengiriman
                </label>
                <textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Masukkan alamat lengkap"
                  className="w-full border border-gray-300 rounded px-3 py-2 resize-y text-sm sm:text-base focus:ring-green-500 focus:border-green-500 transition" /* Padding & ukuran teks responsif, focus */
                  rows={4}
                  required
                ></textarea>
              </div>

              <div className="text-right font-semibold text-lg sm:text-xl pt-2 sm:pt-4 border-t border-gray-200"> {/* Ukuran teks & border responsif */}
                Total Harga: Rp{calculateTotal().toLocaleString("id-ID")}
              </div>

              <button
                type="button" // Menggunakan type="button" agar tidak submit form bawaan HTML
                onClick={() => {
                  navigate("/CheckoutPage", {
                    state: {
                      product,
                      quantity,
                      name,
                      address,
                      voucher,
                      discountAmount,
                      totalPrice: calculateTotal(),
                    },
                  });
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 sm:py-3 rounded transition" /* Padding & ukuran teks responsif */
              >
                Beli Sekarang
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}