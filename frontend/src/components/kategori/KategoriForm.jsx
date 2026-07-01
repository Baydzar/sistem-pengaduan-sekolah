import { useState, useEffect } from "react";

const KategoriForm = ({ initialData, onSubmit }) => {
  const [form, setForm] = useState({
    nama: "",
    deskripsi: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        nama: initialData.nama || "",
        deskripsi: initialData.deskripsi || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow"
    >
      <div className="mb-4">
        <label className="block mb-2 font-medium">
          Nama Kategori
        </label>

        <input
          type="text"
          name="nama"
          value={form.nama}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
          placeholder="Masukkan nama kategori"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">
          Deskripsi
        </label>

        <textarea
          name="deskripsi"
          value={form.deskripsi}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-2"
          rows="4"
          placeholder="Masukkan deskripsi kategori"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
      >
        Simpan
      </button>
    </form>
  );
};

export default KategoriForm;