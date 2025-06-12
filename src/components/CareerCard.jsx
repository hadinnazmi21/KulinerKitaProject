import React from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";

export default function CareerCard({ id, title, location, excerpt, qualifications = [] }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between space-y-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <span className="bg-green-100 text-green-600 text-sm px-3 py-1 rounded-full">
            Lowongan
          </span>
        </div>

        <div className="flex items-center text-sm text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mr-1 text-pink-500" />
          {location}
        </div>

        <p className="text-gray-700 text-sm mb-3">
          {excerpt}
        </p>

        <div>
          <p className="font-semibold text-sm text-gray-800 mb-1">Kualifikasi:</p>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
            {qualifications.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <Link
        to={`/careers/${id}`}
        className="mt-4 bg-green-900 text-white text-sm font-medium px-4 py-2 rounded-md text-center hover:bg-gray-800 transition"
      >
        Lamar Sekarang
      </Link>
    </div>
  );
}
