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
    const [keyword, setKeyword] = useState("");

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

            <div className="flex gap-3">

                <input
                type="text"
                placeholder="Cari kategori..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="border rounded-lg px-4 py-2 w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                onClick={() => navigate("/kategori/tambah")}
                className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                Tambah
                </button>

            </div>
        </div>

      {loading ? (
        <Loading />
      ) : (
        <KategoriTable
            data={kategori.filter((item) => {
                return (
                item.nama.toLowerCase().includes(keyword.toLowerCase()) ||
                item.deskripsi.toLowerCase().includes(keyword.toLowerCase())
                );
            })}
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
      )}
    </MainLayout>
  );
};

export default Kategori;