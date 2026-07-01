import { useState } from "react";

const PengaduanForm = ({
  initialData,
  kategori,
  onSubmit,
}) => {

  const [form, setForm] = useState({
    judul: initialData?.judul || "",
    isi: initialData?.isi || "",
    kategori: initialData?.kategori?._id || "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white rounded-lg shadow p-5 space-y-4"
    >
      <div>
        <label className="block mb-2">
          Judul
        </label>

        <input
          type="text"
          name="judul"
          value={form.judul}
          onChange={handleChange}
          className="w-full border rounded p-3"
          required
        />
      </div>

      <div>
        <label className="block mb-2">
          Kategori
        </label>

        <select
          name="kategori"
          value={form.kategori}
          onChange={handleChange}
          className="w-full border rounded p-3"
          required
        >
          <option value="">
            Pilih Kategori
          </option>

          {kategori.map((item) => (
            <option
              key={item._id}
              value={item._id}
            >
              {item.nama}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-2">
          Isi Pengaduan
        </label>

        <textarea
          name="isi"
          rows="5"
          value={form.isi}
          onChange={handleChange}
          className="w-full border rounded p-3"
          required
        />
      </div>

      <button
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Simpan
      </button>
    </form>
  );
};

export default PengaduanForm;