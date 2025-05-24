import React from "react";

export default function ProductCard({
  image,
  name,
  price,
  description,
  onAdd,
  cardClass = "",
  imageClass = "",
  nameClass = "",
  priceClass = "",
  descClass = "",
  buttonClass = "",
}) {
  return (
    <div className={`text-center ${cardClass}`}>
      <img src={image} alt={name} className={`mx-auto mb-4 ${imageClass}`} />
      <h3 className={`text-lg font-semibold ${nameClass}`}>{name}</h3>
      <p className={`text-red-600 font-bold ${priceClass}`}>Rp {price}</p>
      <p className={`text-sm text-gray-500 ${descClass}`}>{description}</p>
      <button
        onClick={onAdd}
        className={`mt-4 bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-red-700 transition ${buttonClass}`}
      >
        +
      </button>
    </div>
  );
}
