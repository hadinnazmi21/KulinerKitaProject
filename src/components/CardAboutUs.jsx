import React from "react";

export default function CardAboutUs({
  icon,
  title,
  description,
  bgColor = "#35a828",
  textColor = "#1A223E",
}) {
  return (
    <div className="bg-green-50 rounded-xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="mb-4">
        <span
          className="inline-block rounded-md p-3"
          style={{ backgroundColor: bgColor }}
        >
          <div className="text-white text-xl">{icon}</div>
        </span>
      </div>
      <h4 className="font-semibold mb-1 text-left" style={{ color: textColor }}>
        {title}
      </h4>
      <p className="text-gray-600 text-sm text-left">{description}</p>
    </div>
  );
}
