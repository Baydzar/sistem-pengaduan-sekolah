import { useEffect, useState } from "react";
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

    const handleSubmit = async (data) => {

        await createPengaduan(data);

        navigate("/pengaduan");

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