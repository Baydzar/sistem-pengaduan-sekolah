import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import Loading from "../../components/common/Loading";
import KategoriTable from "../../components/kategori/KategoriTable";

import {
  getAllKategori,
  deleteKategori,
} from "../../services/kategoriService";

const Kategori = () => {
  const navigate = useNavigate();

  const [kategori, setKategori] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      setLoading(true);

      const res = await getAllKategori();

      setKategori(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleEdit = (item) => {
    navigate(`/kategori/edit/${item._id}`);
  };

  const handleDelete = async (id) => {
    const yakin = window.confirm("Yakin ingin menghapus kategori?");

    if (!yakin) return;

    try {
      await deleteKategori(id);
      loadData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-3xl font-bold">
          Data Kategori
        </h1>

        <button
          onClick={() => navigate("/kategori/tambah")}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Tambah
        </button>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <KategoriTable
          data={kategori}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </MainLayout>
  );
};

export default Kategori;