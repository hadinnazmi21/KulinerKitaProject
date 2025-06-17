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
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Card Produk */}
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-72 object-cover rounded-lg mb-6"
            />
            <h2 className="text-2xl font-semibold mb-2">{product.name}</h2>
            <p className="text-green-700 font-bold text-xl mb-4">
              Rp{product.price.toLocaleString("id-ID")}
            </p>
            <p className="text-gray-600 text-center">{product.description}</p>

            {/* Countdown */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4 text-center">
                Waktu War Makanan
              </h3>
              <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
                {[
                  { label: "days", value: days },
                  { label: "hours", value: hours },
                  { label: "min", value: minutes },
                  { label: "sec", value: seconds },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content"
                  >
                    <span
                      className="countdown font-mono text-5xl"
                      style={{ "--value": item.value }}
                      aria-label={`${item.value} ${item.label}`}
                    >
                      {item.value}
                    </span>
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form Pembelian */}
          <div className="bg-white rounded-xl shadow p-8">
            <h2 className="text-2xl font-semibold mb-6">Form Pembelian</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="product" className="block mb-1 font-medium">
                  Produk
                </label>
                <input
                  type="text"
                  id="product"
                  value={product.name}
                  disabled
                  className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div>
                <label htmlFor="quantity" className="block mb-1 font-medium">
                  Jumlah
                </label>
                <input
                  type="number"
                  id="quantity"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>

              <div>
                <label htmlFor="voucher" className="block mb-1 font-medium">
                  Kode Voucher
                </label>
                <input
                  type="text"
                  id="voucher"
                  value={voucher}
                  onChange={handleVoucherChange}
                  placeholder="Masukkan kode voucher"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
                {discountAmount > 0 && (
                  <p className="text-green-600 mt-1 font-semibold">
                    Voucher berhasil digunakan! Potongan Rp75.000
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="name" className="block mb-1 font-medium">
                  Nama Pembeli
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama Anda"
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  required
                />
              </div>

              <div>
                <label htmlFor="address" className="block mb-1 font-medium">
                  Alamat Pengiriman
                </label>
                <textarea
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Masukkan alamat lengkap"
                  className="w-full border border-gray-300 rounded px-3 py-2 resize-none"
                  rows={4}
                  required
                />
              </div>

              <div className="text-right font-semibold text-xl">
                Total Harga: Rp{calculateTotal().toLocaleString("id-ID")}
              </div>

              <button
                type="button"
                onClick={() => {
                  navigate("/CheckoutPage", {
                    state: {
                      product,
                      quantity,
                      name,
                      address,
                      voucher,
                      discountAmount,
                    },
                  });
                }}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded transition"
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
