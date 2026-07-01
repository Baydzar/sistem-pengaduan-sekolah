import { useState } from "react";
import TrackingTimeline from "../../components/tracking/TrackingTimeline";
import MainLayout from "../../layouts/MainLayout";
import { trackPengaduan } from "../../services/pengaduanService";

const Tracking = () => {

  const [id, setId] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {

    try {

      setLoading(true);

      const res = await trackPengaduan(id);

      setData(res.data);

    } catch (err) {

      alert(
        err.response?.data?.message ||
        "Data tidak ditemukan"
      );

      setData(null);

    } finally {

      setLoading(false);

    }

  };

  return (

    <MainLayout>

      <h1 className="text-3xl font-bold mb-6">
        Tracking Pengaduan
      </h1>

      <div className="bg-white rounded-xl shadow p-6">

        <div className="flex gap-3 mb-5">

          <input
            type="text"
            placeholder="Masukkan ID Pengaduan"
            value={id}
            onChange={(e) =>
              setId(e.target.value)
            }
            className="flex-1 border rounded p-3"
          />

          <button
            onClick={handleSearch}
            className="bg-blue-600 text-white px-5 rounded"
          >
            Cari
          </button>

        </div>

        {
          loading && (
            <p>Mencari data...</p>
          )
        }

        {
          data && (
            <div className="space-y-3">

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
                <strong>Isi :</strong>
                <p>{data.isi}</p>
              </div>

            </div>
          )
        }
        {
        data && (
            <TrackingTimeline
            status={data.status}
            />
        )
        }
      </div>

    </MainLayout>

  );

};

export default Tracking;