import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import PengaduanTable from "../../components/pengaduan/PengaduanTable";

import {
    getAllPengaduan,
    deletePengaduan,
} from "../../services/pengaduanService";

const Pengaduan = () => {

    const navigate = useNavigate();

    const [pengaduan, setPengaduan] = useState([]);

    const loadData = async () => {
        try {
            const res = await getAllPengaduan();

            setPengaduan(res.data);

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleDelete = async (id) => {

        const yakin = window.confirm("Hapus data?");

        if (!yakin) return;

        await deletePengaduan(id);

        loadData();

    };

    const handleEdit = (item) => {
        navigate(`/pengaduan/edit/${item._id}`);
    };

    return (

        <MainLayout>

            <div className="flex justify-between mb-5">

                <h1 className="text-3xl font-bold">

                    Data Pengaduan

                </h1>

                <button
                    onClick={() => navigate("/pengaduan/tambah")}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Tambah
                </button>

            </div>

            <PengaduanTable
                data={pengaduan}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />

        </MainLayout>

    );

};

export default Pengaduan;