import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import QuoteCard from "../components/QuoteCard";

export default function Quotes() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Cek apakah sudah ada data di localStorage
    const storedQuotes = localStorage.getItem("quotes");
    if (storedQuotes) {
      setQuotes(JSON.parse(storedQuotes));
      setLoading(false);
      return;
    }

    // Jika belum ada, fetch dari API
    const fetchQuotes = async () => {
      try {
        const allQuotes = [];
        for (let i = 0; i < 5; i++) {
          const res = await axios.get("https://api.api-ninjas.com/v1/quotes", {
            headers: {
              "X-Api-Key": "rMSnviBN4IBBrP64pwJJ9g==1p75eOEZiMIMaWk9",
            },
          });
          if (res.status === 200 && Array.isArray(res.data)) {
            allQuotes.push(...res.data);
          } else {
            throw new Error("Gagal mengambil kutipan dari API.");
          }
          await new Promise((r) => setTimeout(r, 300));
        }
        const quotesWithId = allQuotes.map((q, idx) => ({ ...q, id: idx + 1 }));
        setQuotes(quotesWithId);
        // Simpan ke localStorage
        localStorage.setItem("quotes", JSON.stringify(quotesWithId));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQuotes();
  }, []);

  if (loading) return <p>Memuat kutipan...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div>
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {quotes.map((q) => (
          <QuoteCard key={q.id} id={q.id} quote={q.quote} author={q.author} />
        ))}
      </div>
    </div>
  );
}
