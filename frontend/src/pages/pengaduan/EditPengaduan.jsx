import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import PengaduanForm from "../../components/pengaduan/PengaduanForm";
import api from "../../services/api";
import {getPengaduan,updatePengaduan,} from "../../services/pengaduanService";

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

    const handleSubmit = async (formData) => {
        try {
            await updatePengaduan(id, formData);
    
            toast.success("Pengaduan berhasil diperbarui");
    
            navigate("/pengaduan");
        } catch (err) {
            console.log("STATUS:", err.response?.status);
            console.log("DATA:", err.response?.data);
    
            toast.error("Gagal memperbarui pengaduan");
        }
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