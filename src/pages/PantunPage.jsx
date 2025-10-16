import { useEffect, useState } from "react";
import ArtikelCard from "../components/ArtikelCard";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PantunPage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/data/pantun.json");
      const data = await res.json();
      setArticles(data);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[#1A223E] mb-8 text-center">
          Daftar Pantun
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
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