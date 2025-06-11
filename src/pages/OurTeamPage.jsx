import React from "react";
import { motion } from "framer-motion";
import Header from "../components/Header"; // Sesuaikan path import Header Anda

const teamMembers = [
  {
    name: "Mike Cannon-Brookes",
    title: "Co-Founder & Co-CEO",
    description:
      "Visionary leader with a passion for technology and innovation. Berpengalaman lebih dari 20 tahun membangun perusahaan teknologi global.",
    image: "/img/hadin1.jpg",
    animation: {
      initial: { x: -200, opacity: 0 },
      animate: { x: 0, opacity: 1 },
      transition: { type: "spring", stiffness: 100, damping: 20, duration: 0.8 },
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
      transition: { type: "spring", stiffness: 100, damping: 20, duration: 0.8 },
    },
  },
];

export default function OurTeamPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-6">
      <Header />
      <main className="flex flex-col items-center py-16 w-full max-w-7xl">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Our Leadership Team</h1>
        <p className="text-gray-600 mb-12 text-center max-w-3xl">
          With over 100 years of combined experience, we’ve got a well-seasoned team at the helm.
        </p>
        <div className="flex flex-col md:flex-row gap-16 w-full justify-center items-center">
          {teamMembers.map(({ name, title, description, image, animation }) => (
            <div key={name} className="flex flex-col items-center max-w-sm text-center">
              <motion.img
                src={image}
                alt={name}
                className="w-[360px] h-[400px] object-contain bg-transparent"
                initial={animation.initial}
                animate={animation.animate}
                transition={animation.transition}
                whileHover={{ scale: 1.05 }}
                style={{ backgroundColor: "transparent" }}
              />
              <h3 className="mt-6 text-2xl font-semibold text-gray-800">{name}</h3>
              <p className="text-blue-600 font-medium mb-2">{title}</p>
              <p className="text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
