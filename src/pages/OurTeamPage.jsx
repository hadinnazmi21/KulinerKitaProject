import React from "react";
import { motion } from "framer-motion";
import Header from "../components/Header"; 
import Footer from "../components/Footer";

const teamMembers = [
  {
    name: "Tengku Muhammad Hadin Nazmi",
    title: "Co-Founder & Co-CEO",
    description:
      "Visionary leader with a passion for technology and innovation. Berpengalaman lebih dari 20 tahun membangun perusahaan teknologi global.",
    image: "/img/hadin1.jpg", // Pastikan path gambar ini benar
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
    image: "/img/kela.jpg", // Pastikan path gambar ini benar
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
      <Header />

      <main className="flex flex-col items-center py-12 sm:py-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-grow"> 
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 text-gray-800 text-center">
          Tim Developer Kuliner Kita
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mb-8 sm:mb-12 text-center max-w-3xl leading-relaxed">
          Kami adalah dua developer dengan visi membangun platform digital yang
          membantu UMKM kuliner berkembang di era teknologi. Dengan semangat
          kolaboratif dan kreativitas, kami terus berinovasi demi pengalaman
          terbaik pengguna.
        </p>
        
        <div className="flex flex-col md:flex-row gap-8 sm:gap-12 md:gap-16 w-full justify-center items-center">
          {teamMembers.map(({ name, title, description, image, animation }) => (
            <div
              key={name}
              className="flex flex-col items-center text-center max-w-xs sm:max-w-sm md:max-w-md px-4 sm:px-0" 
            >
              <motion.img
                src={image}
                alt={name}
                // --- UKURAN GAMBAR FIXED DAN KONSISTEN ---
                className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full object-cover border-4 border-white shadow-lg mb-4" 
                initial={animation.initial}
                animate={animation.animate}
                transition={animation.transition}
                whileHover={{ scale: 1.05 }}
              />
              <h3 className="mt-2 text-xl sm:text-2xl font-semibold text-gray-800">
                {name}
              </h3>
              <p className="text-green-600 font-medium mb-1 sm:mb-2 text-sm sm:text-base"> 
                {title}
              </p>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed"> 
                {description}
              </p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}