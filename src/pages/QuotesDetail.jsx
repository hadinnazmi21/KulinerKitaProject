import { useEffect, useState } from "react"
import axios from "axios"

export default function QuoteDetail() {
  const [quote, setQuote] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios
      .get("https://zenquotes.io/api/random")
      .then((response) => {
        if (response.status !== 200 || !response.data || !response.data[0]) {
          setError("Gagal mengambil kutipan.")
          return
        }
        setQuote(response.data[0])
      })
      .catch((err) => {
        setError(err.message)
      })
  }, [])

  if (error) return <div className="text-red-600 p-4">{error}</div>
  if (!quote) return <div className="p-4">Loading...</div>

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg max-w-xl mx-auto mt-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Kutipan Hari Ini</h2>
      <p className="text-lg italic text-gray-700 mb-4">&quot;{quote.q}&quot;</p>
      <p className="text-right text-gray-500 font-medium">- {quote.a}</p>
    </div>
  )
}
