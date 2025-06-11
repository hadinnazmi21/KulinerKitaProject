import { useEffect, useState } from "react";
import ArtikelCard from "../components/ArtikelCard";

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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {articles.map((item) => (
        <ArtikelCard
          key={item.id}
          id={item.id}
          image_url={item.image_url}
          title={item.judul}
          excerpt={item.excerpt}
          tanggal={item.tanggal}
          author={item.penulis}
          views={item.views}
          kategori={item.kategori}
          tags={[item.tag1, item.tag2, item.tag3].filter(Boolean)}
        />
      ))}
    </div>
  );
}
