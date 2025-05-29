import { useEffect, useState } from "react";
import PageHeader from "../components/Header";
import axios from "axios";
import { BsFillExclamationDiamondFill } from "react-icons/bs";

export default function Quotes() {
  const breadcrumb = ["Dashboard", "Quotes"];
  const [quotes, setQuotes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fungsi delay untuk hindari rate limit API
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const allQuotes = [];

        for (let i = 0; i < 5; i++) { // ambil 5 dulu untuk uji coba
          const response = await axios.get("https://api.api-ninjas.com/v1/quotes", {
            headers: { "X-Api-Key": "rMSnviBN4IBBrP64pwJJ9g==1p75eOEZiMIMaWk9" },
          });

          console.log(`Response #${i + 1}:`, response.data);

          if (response.status === 200 && Array.isArray(response.data)) {
            allQuotes.push(...response.data); // response.data biasanya array dengan 1 objek
          } else {
            throw new Error("Gagal mengambil kutipan dari API.");
          }

          await delay(300); // delay antar request
        }

        setQuotes(allQuotes);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message || "Terjadi kesalahan saat mengambil data.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuotes();
  }, []);

  const errorInfo = error ? (
    <div className="bg-red-200 mb-5 p-5 text-sm font-light text-gray-600 rounded flex items-center">
      <BsFillExclamationDiamondFill className="text-red-600 me-2 text-lg" />
      {error}
    </div>
  ) : null;

  return (
    <div>
      <PageHeader title="Quotes" breadcrumb={breadcrumb} />

      {errorInfo}

      {loading ? (
        <p className="text-gray-600 italic mb-5">Memuat kutipan...</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200 overflow-hidden rounded-2xl shadow-lg">
          <thead>
            <tr className="bg-emerald-600 text-white text-left text-sm font-semibold">
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Quote</th>
              <th className="px-4 py-3">Author</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100 text-sm text-gray-800">
            {quotes.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="px-6 py-4 font-medium text-gray-700">
                  {index + 1}.
                </td>
                <td className="px-6 py-4 italic">&quot;{item.quote}&quot;</td>
                <td className="px-6 py-4">{item.author}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
