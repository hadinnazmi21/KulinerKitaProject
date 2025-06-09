import React, { useState } from "react";

export default function TestimoniForm({
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
  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (!file) return;

      // Preview gambar sebelum upload
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);

      // Simpan file ke formData (untuk dikirim ke parent)
      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSubmit) onSubmit(formData);

    setFormData(initialState);
    setAvatarPreview(null);
  };

  return (
    <div className={`bg-white p-6 rounded-xl shadow ${containerClass}`}>
      <h4 className={`text-base font-semibold mb-4 ${titleClass}`}>
        Tambah Catatan Baru
      </h4>
      <form onSubmit={handleSubmit} className={formClass}>
        {fields.map((field) => (
          <div key={field.name} className="mb-4">
            {field.type === "textarea" ? (
              <textarea
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
                className={`w-full p-3 rounded-md border border-gray-200 bg-gray-50 ${textareaClass}`}
              />
            ) : field.type === "file" ? (
              <>
                <input
                  type="file"
                  name={field.name}
                  accept="image/*"
                  onChange={handleChange}
                  className={`w-full p-1 rounded-md border border-gray-200 bg-gray-50 ${inputClass}`}
                />
                {avatarPreview && (
                  <img
                    src={avatarPreview}
                    alt="Preview Avatar"
                    className="mt-2 w-24 h-24 object-cover rounded-full border"
                  />
                )}
              </>
            ) : (
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
                className={`w-full p-3 rounded-md border border-gray-200 bg-gray-50 ${inputClass}`}
              />
            )}
          </div>
        ))}
        <button
          type="submit"
          className={`bg-green-500 text-white font-semibold rounded-md px-5 py-2 hover:bg-green-600 transition ${buttonClass}`}
        >
          Tambah Catatan
        </button>
      </form>
    </div>
  );
}
