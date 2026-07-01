import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import Loading from "../../components/common/Loading";
import PengaduanTable from "../../components/pengaduan/PengaduanTable";

import {
    getAllPengaduan,
    deletePengaduan,
} from "../../services/pengaduanService";

const Pengaduan = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [keyword, setKeyword] = useState("");
    const [pengaduan, setPengaduan] = useState([]);

    const loadData = async () => {
        try {
    
            setLoading(true);
    
            const res = await getAllPengaduan();
    
            setPengaduan(res.data);
    
        } catch (err) {
    
            console.log(err);
    
        } finally {
    
            setLoading(false);
    
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleDelete = async (id) => {
        const yakin = window.confirm("Yakin ingin menghapus pengaduan?");
    
        if (!yakin) return;
    
        try {
            await deletePengaduan(id);
    
            toast.success("Pengaduan berhasil dihapus");
    
            loadData();
        } catch (err) {
            console.log(err);
    
            toast.error("Gagal menghapus pengaduan");
        }
    };

    const handleEdit = (item) => {
        navigate(`/pengaduan/edit/${item._id}`);
    };

    return (

        <MainLayout>

                <div className="flex justify-between items-center mb-5">

                <h1 className="text-3xl font-bold">
                    Data Pengaduan
                </h1>

                    <div className="flex gap-3">

                        <input
                            type="text"
                            placeholder="Cari pengaduan..."
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                            className="border rounded-lg px-4 py-2 w-72 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <button
                            onClick={() => navigate("/pengaduan/tambah")}
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Tambah
                        </button>

                    </div>

                </div>

            {
    loading
        ? <Loading/>
        : (
            <PengaduanTable
                data={pengaduan.filter((item) => {
                    return (
                        item.judul.toLowerCase().includes(keyword.toLowerCase()) ||
                        item.isi.toLowerCase().includes(keyword.toLowerCase()) ||
                        item.kategori?.nama?.toLowerCase().includes(keyword.toLowerCase())
                    );
                })}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        )
}

        </MainLayout>

    );

};

export default Pengaduan;