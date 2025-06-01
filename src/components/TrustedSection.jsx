import { motion, useScroll, useTransform } from "framer-motion";

const badges = [
  "my superpower", "Whoa", "Fantastic", "Insane", "Next-level",
  "Unreal", "Incredible", "Perfect", "Super!", "Awesome!",
  "Amazing!", "mind-blowingly"
];

export default function TrustedSection() {
  const { scrollYProgress } = useScroll();
  // Animasi horizontal bergerak saat scroll (parallax)
  const x = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <section className="py-20 bg-white flex flex-col items-center">
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-extrabold text-green-700">
          Trusted by <span className="text-green-500">13000+</span> user
        </h2>
      </div>
      {/* Badges animasi */}
      <motion.div
        className="flex flex-wrap justify-center gap-3 max-w-3xl"
        style={{ x }}
      >
        {badges.map((badge, idx) => (
          <span
            key={idx}
            className="px-4 py-2 rounded-full text-sm font-semibold bg-green-100 text-green-700 shadow transition-all duration-300 hover:bg-green-200"
          >
            {badge}
          </span>
        ))}
      </motion.div>
    </section>
  );
}
