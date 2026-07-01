import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import PengaduanForm from "../../components/pengaduan/PengaduanForm";
import { createPengaduan } from "../../services/pengaduanService";
import api from "../../services/api";

const TambahPengaduan = () => {

    const navigate = useNavigate();

    const [kategori, setKategori] = useState([]);

    useEffect(() => {

        const loadKategori = async () => {

            const res = await api.get("/kategori");

            setKategori(res.data.data);

        };

        loadKategori();

    }, []);

    const handleSubmit = async (formData) => {
        try {
            await createPengaduan(formData);
    
            toast.success("Pengaduan berhasil ditambahkan");
    
            navigate("/pengaduan");
        } catch (err) {
            console.log("Status :", err.response.status);
            console.log("Response :", err.response.data);
    
            toast.error("Gagal menambahkan pengaduan");
        }
    };

    return (

        <MainLayout>

            <h1 className="text-3xl font-bold mb-5">

                Tambah Pengaduan

            </h1>

            <PengaduanForm

                kategori={kategori}

                onSubmit={handleSubmit}

            />

        </MainLayout>

    );

};

export default TambahPengaduan;