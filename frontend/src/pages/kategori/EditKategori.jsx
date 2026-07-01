import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import MainLayout from "../../layouts/MainLayout";
import Loading from "../../components/common/Loading";
import KategoriForm from "../../components/kategori/KategoriForm";

import {
  getKategoriById,
  updateKategori,
} from "../../services/kategoriService";

const EditKategori = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [kategori, setKategori] = useState(null);

  useEffect(() => {
    loadKategori();
  }, []);

  const loadKategori = async () => {
    try {
      const res = await getKategoriById(id);
      setKategori(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Kategori tidak ditemukan");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (data) => {
    try {
      await updateKategori(id, data);

      toast.success("Kategori berhasil diubah");

      navigate("/kategori");
    } catch (err) {
      console.log(err);
      toast.error("Gagal mengubah kategori");
    }
  };

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-5">
        Edit Kategori
      </h1>

      {loading ? (
        <Loading />
      ) : (
        <KategoriForm
          initialData={kategori}
          onSubmit={handleSubmit}
        />
      )}
    </MainLayout>
  );
};

export default EditKategori;