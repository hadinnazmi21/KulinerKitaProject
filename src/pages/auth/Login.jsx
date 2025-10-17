import React from "react";

import { useState } from "react";
import { loginAPI } from "../../services/loginAPI";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(true);

    try {
      // 🔹 Gunakan username & password (bukan email)
      const user = await loginAPI.login(username, password);
      console.log("Login berhasil:", user);

      // ✅ Notifikasi sukses tanpa redirect
      setSuccessMsg(`✅ Berhasil login! Selamat datang, ${user.username}!`);
    } catch (err) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900">
          Masuk ke Akun Anda
        </h2>

        {errorMsg && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4 text-center">
            {errorMsg}
          </div>
        )}

        {successMsg && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-center">
            {successMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Masukkan username"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Kata Sandi
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Masukkan kata sandi"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white py-2 rounded-md text-lg font-semibold hover:bg-green-600 transition"
          >
            {loading ? "Memeriksa..." : "Masuk"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Belum punya akun?{" "}
          <a href="/register" className="text-green-600 hover:underline">
            Daftar di sini
          </a>
        </p>
      </div>
    </div>
  );
}
