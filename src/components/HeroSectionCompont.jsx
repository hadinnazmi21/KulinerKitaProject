import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function HeroSectionComponent({
  image,
  title,
  subtitle,
  description,
  buttonLabel,
  buttonLink,
}) {
  return (
    <section className="w-full bg-[#f9f8f4] py-16 px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        {/* Gambar masuk dari kiri ke dalam */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, x: -150 }} // kiri → tengah
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src={image}
            alt={title}
            className="max-w-full h-auto object-contain"
          />
        </motion.div>

        {/* Teks masuk dari kanan ke dalam */}
        <motion.div
          initial={{ opacity: 0, x: 150 }} // kanan → tengah
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="text-sm text-green-800 font-medium mb-2">{subtitle}</p>
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            {title}
          </h1>
          <p className="text-gray-600 text-base md:text-lg mb-6 leading-relaxed">
            {description}
          </p>
          <Link
            to={buttonLink}
            className="inline-block bg-green-800 hover:bg-green-700 text-white text-sm md:text-base font-medium px-6 py-3 rounded transition"
          >
            {buttonLabel}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
