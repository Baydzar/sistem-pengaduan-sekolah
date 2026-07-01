import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MainLayout from "../../layouts/MainLayout";
import Loading from "../../components/common/Loading";

import { getPengaduan } from "../../services/pengaduanService";

const DetailPengaduan = () => {

  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    loadDetail();
  }, []);

  const loadDetail = async () => {

    try {

      const res = await getPengaduan(id);

      setData(res.data);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  if (loading) {
    return <Loading />;
  }

  return (

    <MainLayout>

      <div className="bg-white rounded-xl shadow p-6">

        <h1 className="text-3xl font-bold mb-6">
          Detail Pengaduan
        </h1>

        <div className="space-y-4">

          <div>
            <strong>Judul :</strong>
            <p>{data.judul}</p>
          </div>

          <div>
            <strong>Kategori :</strong>
            <p>{data.kategori?.nama}</p>
          </div>

          <div>
            <strong>Status :</strong>
            <p>{data.status}</p>
          </div>

          <div>
            <strong>Isi Pengaduan :</strong>
            <p>{data.isi}</p>
          </div>

        </div>

      </div>

    </MainLayout>

  );

};

export default DetailPengaduan;