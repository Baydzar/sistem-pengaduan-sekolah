import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";

import PengaduanForm from "../../components/pengaduan/PengaduanForm";

import api from "../../services/api";

import {
    getPengaduan,
    updatePengaduan,
} from "../../services/pengaduanService";

const EditPengaduan = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [kategori, setKategori] = useState([]);

    const [data, setData] = useState(null);

    useEffect(() => {

        const load = async () => {

            const p = await getPengaduan(id);

            const k = await api.get("/kategori");

            setData(p.data);

            setKategori(k.data.data);

        };

        load();

    }, [id]);

    const handleSubmit = async (form) => {

        await updatePengaduan(id, form);

        navigate("/pengaduan");

    };

    if (!data) return <MainLayout>Loading...</MainLayout>;

    return (

        <MainLayout>

            <h1 className="text-3xl font-bold mb-5">

                Edit Pengaduan

            </h1>

            <PengaduanForm

                initialData={data}

                kategori={kategori}

                onSubmit={handleSubmit}

            />

        </MainLayout>

    );

};

export default EditPengaduan;