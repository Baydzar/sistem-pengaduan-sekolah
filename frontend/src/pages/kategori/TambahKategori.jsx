import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import MainLayout from "../../layouts/MainLayout";
import KategoriForm from "../../components/kategori/KategoriForm";

import { createKategori } from "../../services/kategoriService";

const TambahKategori = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    try {
      await createKategori(data);

      toast.success("Kategori berhasil ditambahkan");

      navigate("/kategori");
    } catch (err) {
      console.log(err);

      toast.error("Gagal menambahkan kategori");
    }
  };

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-5">
        Tambah Kategori
      </h1>

      <KategoriForm onSubmit={handleSubmit} />
    </MainLayout>
  );
};

export default TambahKategori;