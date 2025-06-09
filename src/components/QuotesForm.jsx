import React, { useState } from "react";

export default function QuotesForm({
  fields,
  onSubmit,
  containerClass = "",
  titleClass = "",
  formClass = "",
  inputClass = "",
  textareaClass = "",
  buttonClass = "",
}) {
  const initialState = fields.reduce((acc, curr) => ({ ...acc, [curr.name]: "" }), {});
  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
    setFormData(initialState);
  };

  return (
    <div className={`bg-white p-6 rounded-xl shadow ${containerClass}`}>
      <h4 className={`text-base font-semibold mb-4 ${titleClass}`}>
        Tambah Quote Baru
      </h4>
      <form onSubmit={handleSubmit} className={formClass}>
        {fields.map(({ name, type, placeholder }) => (
          <div key={name} className="mb-4">
            {type === "textarea" ? (
              <textarea
                name={name}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleChange}
                className={`w-full p-3 rounded-md border border-gray-200 bg-gray-50 ${textareaClass}`}
                required
              />
            ) : (
              <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={formData[name]}
                onChange={handleChange}
                className={`w-full p-3 rounded-md border border-gray-200 bg-gray-50 ${inputClass}`}
                required
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className={`bg-green-500 text-white font-semibold rounded-md px-5 py-2 hover:bg-green-600 transition ${buttonClass}`}
        >
          Tambah Quote
        </button>
      </form>
    </div>
  );
}
