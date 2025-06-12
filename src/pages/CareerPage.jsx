import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CareerCard from "../components/CareerCard";

export default function CareerPage() {
  const [careers, setCareers] = useState([]);

  useEffect(() => {
    const fetchCareers = async () => {
      const res = await fetch("/data/career.json");
      const data = await res.json();
      setCareers(data);
    };
    fetchCareers();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">
        <h1 className="text-3xl font-bold mb-8 text-green-800 text-center">
          Karir di Kuliner Kita
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {careers.map((career) => (
            <CareerCard
              key={career.id}
              id={career.id}
              title={career.title}
              location={career.location}
              type={career.type}
              excerpt={career.excerpt}
              qualifications={career.qualifications}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
