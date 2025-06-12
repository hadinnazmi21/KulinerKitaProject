import React from "react";
import { motion } from "framer-motion";
import Header from "../components/Header"; // Sesuaikan path import Header Anda
import Footer from "../components/Footer";

const teamMembers = [
  {
    name: "Tengku Muhammad Hadin Nazmi",
    title: "Co-Founder & Co-CEO",
    description:
      "Visionary leader with a passion for technology and innovation. Berpengalaman lebih dari 20 tahun membangun perusahaan teknologi global.",
    image: "/img/hadin1.jpg",
    animation: {
      initial: { x: -200, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.8,
      },
    },
  },
  {
    name: "Scott Farquhar",
    title: "Co-Founder & Co-CEO",
    description:
      "Ahli strategi dengan fokus pada pertumbuhan bisnis dan budaya perusahaan. Berperan penting dalam ekspansi internasional.",
    image: "/img/kela.jpg",
    animation: {
      initial: { x: 200, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.8,
      },
    },
  },
];

export default function OurTeamPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header full-width */}
      <Header />

      {/* Konten utama terpusat */}
      <main className="flex flex-col items-center py-16 w-full max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold mb-6 text-gray-800 text-center">
          Tim Developer Kuliner Kita
        </h1>
        <p className="text-gray-600 mb-12 text-center max-w-3xl">
          Kami adalah dua developer dengan visi membangun platform digital yang
          membantu UMKM kuliner berkembang di era teknologi. Dengan semangat
          kolaboratif dan kreativitas, kami terus berinovasi demi pengalaman
          terbaik pengguna.
        </p>
        <div className="flex flex-col md:flex-row gap-16 w-full justify-center items-center">
          {teamMembers.map(({ name, title, description, image, animation }) => (
            <div
              key={name}
              className="flex flex-col items-center max-w-sm text-center"
            >
              <motion.img
                src={image}
                alt={name}
                className="w-[360px] h-[400px] object-contain bg-transparent"
                initial={animation.initial}
                animate={animation.animate}
                transition={animation.transition}
                whileHover={{ scale: 1.05 }}
              />
              <h3 className="mt-6 text-2xl font-semibold text-gray-800">
                {name}
              </h3>
              <p className="text-green-600 font-medium mb-2">{title}</p>
              <p className="text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
