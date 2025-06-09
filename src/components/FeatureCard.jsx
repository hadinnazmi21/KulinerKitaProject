// src/components/FeatureCard.jsx
export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow border border-gray-200 flex flex-col items-center text-center">
      <div className="bg-green-500 rounded-full w-14 h-14 flex items-center justify-center mb-4">
        <span className="text-white text-3xl">{icon}</span>
      </div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
