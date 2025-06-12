import { useEffect, useState } from "react";
import ArtikelCard from "../components/ArtikelCard";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ArtikelList() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/data/artikel.json");
      const data = await res.json();
      setArticles(data);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="w-full h-[500px]">
        <img
          src="/img/hero/Artikel.png" // Ganti dengan path gambar hero yang sesuai
          alt="War Makanan Hero"
          className="w-full h-full object-cover"
        />
      </section>

      <main className="flex-1 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {articles.map((item) => (
            <ArtikelCard
              key={item.id}
              id={item.id}
              image_url={item.image_url}
              title={item.judul}
              excerpt={item.excerpt}
              kategori={item.kategori}
              tags={[item.tag1, item.tag2, item.tag3].filter(Boolean)}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
