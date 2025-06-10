// components/CardAboutUs.jsx
import React from "react";

export default function CardAboutUs({ iconClass, title, description, bgColor = "#35a828", textColor = "#1A223E" }) {
  return (
    <div className="bg-white rounded-lg p-9 shadow flex flex-col items-center text-center">
      <div className="mb-2">
        <span className="inline-block rounded-full p-2" style={{ backgroundColor: bgColor }}>
          <i className={`${iconClass} text-white`}></i>
        </span>
      </div>
      <h4 className="font-semibold mb-1" style={{ color: textColor }}>
        {title}
      </h4>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}
