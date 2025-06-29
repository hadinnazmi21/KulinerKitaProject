import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaMapMarkerAlt } from "react-icons/fa"; // Import ikon lokasi

export default function CheckoutPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Jika user mengakses halaman ini langsung tanpa data, kembalikan ke halaman war
  if (!state) {
    navigate("/simulasi-war", { replace: true });
    return null;
  }

  const { product, quantity, name, voucher, discountAmount } = state;

  const staticName = "Hadin";
  const staticAddress = "Jalan Rowo Sari, Rumbai, Pekanbaru, Riau";

  const [shippingMethod, setShippingMethod] = useState("REG");
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const shippingCost = shippingMethod === "REG" ? 12000 : 20000;

  const subtotal = product.price * quantity;
  const total = Math.max(0, subtotal - (discountAmount || 0)) + shippingCost;

  const handlePay = () => {
    alert(
      `Terima kasih, ${name}! Pesananmu sedang diproses.\n\n` +
        `Total bayar: Rp${total.toLocaleString("id-ID")}`
    );
    navigate("/", { replace: true });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Kolom Detail Pesanan */}
          <section className="lg:col-span-2 bg-white rounded-xl shadow-lg p-6 sm:p-8"> {/* Padding responsif */}
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800">Detail Pesanan</h2> {/* Ukuran teks responsif */}

            {/* Produk yang dibeli - Dibingkai dalam kotak terpisah */}
            <div className="bg-gray-50 rounded-lg p-4 sm:p-5 flex items-center gap-4 border border-gray-200 mb-6"> {/* Padding & ukuran gambar responsif */}
              <img
                src={product.image}
                alt={product.name}
                className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg shadow-sm"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-lg sm:text-xl text-gray-900">{product.name}</h3> {/* Ukuran teks responsif */}
                <p className="text-sm sm:text-base text-gray-600"> {/* Ukuran teks responsif */}
                  {quantity} x Rp{product.price.toLocaleString("id-ID")}
                </p>
              </div>
              <p className="font-bold text-lg sm:text-xl text-gray-800"> {/* Ukuran teks responsif */}
                Rp{(product.price * quantity).toLocaleString("id-ID")}
              </p>
            </div>

            {/* Ringkasan Biaya Produk */}
            <div className="space-y-2 pb-4 border-b border-gray-200 mb-4">
                {voucher && discountAmount > 0 && (
                <div className="flex justify-between text-green-600 font-medium text-sm sm:text-base"> {/* Ukuran teks responsif */}
                    <span>Diskon ({voucher})</span>
                    <span>-Rp{discountAmount.toLocaleString("id-ID")}</span>
                </div>
                )}
                <div className="flex justify-between font-medium text-gray-800 text-sm sm:text-base"> {/* Ukuran teks responsif */}
                    <span>Subtotal Produk</span>
                    <span>Rp{subtotal.toLocaleString("id-ID")}</span>
                </div>
            </div>


            {/* Shipping Method */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h3 className="font-medium mb-3 text-gray-800 text-base sm:text-lg">Pilih Pengiriman</h3> {/* Ukuran teks responsif */}
              <div className="space-y-3">
                {[
                  { id: "REG", label: "Reguler (2‑3 hari)", price: 12000 },
                  { id: "EXP", label: "Express (1 hari)", price: 20000 },
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-center justify-between gap-2 cursor-pointer p-3 sm:p-4 border rounded-lg transition-all duration-200
                      ${shippingMethod === opt.id ? 'border-green-500 bg-green-50 shadow-sm' : 'border-gray-200 hover:bg-gray-50'}`} /* Padding & ukuran teks responsif */
                  >
                    <div className="flex items-center gap-2">
                        <input
                            type="radio"
                            name="shipping"
                            value={opt.id}
                            checked={shippingMethod === opt.id}
                            onChange={(e) => setShippingMethod(e.target.value)}
                            className="radio radio-success text-green-600 focus:ring-green-500"
                        />
                        <span className="text-gray-700 text-sm sm:text-base">{opt.label}</span> {/* Ukuran teks responsif */}
                    </div>
                    <span className="font-semibold text-green-700 text-sm sm:text-base"> {/* Ukuran teks responsif */}
                        Rp{opt.price.toLocaleString("id-ID")}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h3 className="font-medium mb-3 text-gray-800 text-base sm:text-lg">Metode Pembayaran</h3> {/* Ukuran teks responsif */}
              <div className="space-y-3">
                {[
                  { id: "COD", label: "Bayar di Tempat (COD)" },
                  { id: "VA", label: "Virtual Account" },
                  { id: "EWALLET", label: "E‑Wallet" },
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className={`flex items-center gap-2 cursor-pointer p-3 sm:p-4 border rounded-lg transition-all duration-200
                      ${paymentMethod === opt.id ? 'border-green-500 bg-green-50 shadow-sm' : 'border-gray-200 hover:bg-gray-50'}`} /* Padding & ukuran teks responsif */
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={opt.id}
                      checked={paymentMethod === opt.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="radio radio-success text-green-600 focus:ring-green-500"
                    />
                    <span className="text-gray-700 text-sm sm:text-base">{opt.label}</span> {/* Ukuran teks responsif */}
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* Kolom Ringkasan Pembayaran */}
          <aside className="bg-white rounded-xl shadow-lg p-6 sm:p-8 h-fit lg:sticky lg:top-24"> {/* Padding responsif */}
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-gray-800">Ringkasan Pembayaran</h2> {/* Ukuran teks responsif */}

            <div className="flex justify-between mb-2 text-gray-700 text-sm sm:text-base"> {/* Ukuran teks responsif */}
              <span>Subtotal</span>
              <span>Rp{subtotal.toLocaleString("id-ID")}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between mb-2 text-green-600 font-medium text-sm sm:text-base"> {/* Ukuran teks responsif */}
                <span>Diskon</span>
                <span>-Rp{discountAmount.toLocaleString("id-ID")}</span>
              </div>
            )}

            <div className="flex justify-between text-gray-700 text-sm sm:text-base"> {/* Ukuran teks responsif */}
              <span>Ongkir</span>
              <span>Rp{shippingCost.toLocaleString("id-ID")}</span>
            </div>

            <hr className="my-4 border-gray-300" />

            <div className="flex justify-between font-semibold text-lg sm:text-xl text-gray-900"> {/* Ukuran teks responsif */}
              <span>Total Bayar</span>
              <span>Rp{total.toLocaleString("id-ID")}</span>
            </div>

            <button
              onClick={handlePay}
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 sm:py-3.5 rounded-lg transition-colors shadow-md hover:shadow-lg text-base sm:text-lg" /* Padding & ukuran teks responsif */
            >
              Bayar Sekarang
            </button>
          </aside>
        </div>

        {/* Alamat Pengiriman (Statis) - Diperindah & Responsif */}
        <div className="max-w-5xl mx-auto mt-8 bg-green-50 rounded-xl shadow-lg p-6 sm:p-8 border border-green-200"> {/* Padding & ukuran teks responsif */}
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-green-800 flex items-center gap-2"> {/* Ukuran teks responsif */}
            <FaMapMarkerAlt className="text-green-600 text-2xl sm:text-3xl" /> {/* Ukuran ikon responsif */}
            Alamat Pengiriman
          </h2>
          <p className="font-medium text-gray-900 text-base sm:text-lg">{staticName}</p> {/* Ukuran teks responsif */}
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">{staticAddress}</p> {/* Ukuran teks responsif */}
        </div>
      </main>

      <Footer />
    </div>
  );
}