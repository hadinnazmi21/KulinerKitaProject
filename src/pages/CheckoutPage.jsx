import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function CheckoutPage() {
  // Dapatkan data order yang dikirim dari halaman SimulasiWar
  const { state } = useLocation();
  const navigate = useNavigate();

  // Jika user mengakses halaman ini langsung tanpa data, kembalikan ke halaman war
  if (!state) {
    navigate("/simulasi-war", { replace: true });
    return null;
  }

  const {
    product,
    quantity,
    name,
    address,
    voucher,
    discountAmount,
  } = state;

  const [shippingMethod, setShippingMethod] = useState("REG"); // REG / EXP
  const [paymentMethod, setPaymentMethod] = useState("COD"); // COD / VA / EWALLET

  // Ongkir sederhana — bisa diganti ke perhitungan lebih detail
  const shippingCost = shippingMethod === "REG" ? 12000 : 20000;

  const subtotal = product.price * quantity;
  const total = Math.max(0, subtotal - (discountAmount || 0)) + shippingCost;

  const handlePay = () => {
    alert(
      `Terima kasih, ${name}! Pesananmu sedang diproses.\n\n` +
        `Total bayar: Rp${total.toLocaleString("id-ID")}`
    );
    // Kembali ke beranda (atau halaman sukses khusus)
    navigate("/", { replace: true });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow bg-gray-50 p-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Kolom Detail Pesanan */}
          <section className="lg:col-span-2 bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Detail Pesanan</h2>
            <div className="flex items-center gap-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-medium">{product.name}</h3>
                <p className="text-sm text-gray-600">
                  {quantity} x Rp{product.price.toLocaleString("id-ID")}
                </p>
              </div>
              <p className="font-semibold">
                Rp{(product.price * quantity).toLocaleString("id-ID")}
              </p>
            </div>

            {/* Voucher Info */}
            {voucher && discountAmount > 0 && (
              <div className="mt-4 flex justify-between text-green-600">
                <span>Diskon ({voucher})</span>
                <span>-Rp{discountAmount.toLocaleString("id-ID")}</span>
              </div>
            )}

            {/* Shipping Method */}
            <div className="mt-6">
              <h3 className="font-medium mb-2">Pilih Pengiriman</h3>
              <div className="space-y-2">
                {[
                  { id: "REG", label: "Reguler (2‑3 hari) - Rp12.000" },
                  { id: "EXP", label: "Express (1 hari) - Rp20.000" },
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="shipping"
                      value={opt.id}
                      checked={shippingMethod === opt.id}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      className="radio radio-success"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="mt-6">
              <h3 className="font-medium mb-2">Metode Pembayaran</h3>
              <div className="space-y-2">
                {[
                  { id: "COD", label: "Bayar di Tempat (COD)" },
                  { id: "VA", label: "Virtual Account" },
                  { id: "EWALLET", label: "E‑Wallet" },
                ].map((opt) => (
                  <label
                    key={opt.id}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={opt.id}
                      checked={paymentMethod === opt.id}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="radio radio-success"
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>
          </section>

          {/* Kolom Ringkasan Pembayaran */}
          <aside className="bg-white rounded-xl shadow p-6 h-fit">
            <h2 className="text-xl font-semibold mb-4">Ringkasan Pembayaran</h2>

            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>Rp{subtotal.toLocaleString("id-ID")}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between mb-2 text-green-600">
                <span>Diskon</span>
                <span>-Rp{discountAmount.toLocaleString("id-ID")}</span>
              </div>
            )}

            <div className="flex justify-between mb-2">
              <span>Ongkir</span>
              <span>Rp{shippingCost.toLocaleString("id-ID")}</span>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between font-semibold text-lg">
              <span>Total Bayar</span>
              <span>Rp{total.toLocaleString("id-ID")}</span>
            </div>

            <button
              onClick={handlePay}
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded transition"
            >
              Bayar Sekarang
            </button>
          </aside>
        </div>

        {/* Alamat */}
        <div className="max-w-5xl mx-auto mt-8 bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Alamat Pengiriman</h2>
          <p className="font-medium">{name}</p>
          <p>{address}</p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
