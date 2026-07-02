import { useEffect, useState } from "react";
import Toast from "../components/Toast";
import { useAuth } from "../hooks/useAuth";
import { usePengaduan } from "../hooks/usePengaduan";
import { useToast } from "../hooks/useToast";
import api from "../services/api";
import FilterBar from "../components/FilterBar";
import PengaduanTable from "../components/PengaduanTable";

export default function ListPengaduan() {
  const [data, setData] = useState([]);
  const [kategori, setKategori] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [kategoriList, setKategoriList] = useState([]);
  const [page, setPage] = useState(1);
  const limitPerPage = 5;
  const { getAll, update, remove, loading, error } = usePengaduan();
  const { getUser } = useAuth();
  const user = getUser();
  const { toast, showToast, hideToast } = useToast();

  const fetchData = async () => {
    const params = {};
    if (kategori) params.kategori = kategori;
    if (status) params.status = status;
    if (search) params.search = search;
    const res = await getAll(params);
    setData(res);
    setPage(1);
  };

  const handleStatusChange = async (id, newStatus) => {
    await update(id, { status: newStatus });
    fetchData();
    showToast("Status berhasil diubah!");
  };

  const handleDelete = async (id) => {
    if (!confirm("Yakin hapus pengaduan ini?")) return;
    try {
      await remove(id);
      fetchData();
      showToast("Pengaduan berhasil dihapus!", "success");
    } catch {
      showToast("Gagal hapus pengaduan", "error");
    }
  };

  useEffect(() => {
    api.get("/kategori").then((res) => setKategoriList(res.data));
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { fetchData(); }, [kategori, status]);

  const totalPages = Math.ceil(data.length / limitPerPage);
  const paginated = data.slice((page - 1) * limitPerPage, page * limitPerPage);

  return (
    <div className="page-wrap">
      {toast && <Toast message={toast.message} type={toast.type} onClose={hideToast} />}

      <header className="page-head">
        <div>
          <p className="page-kicker">Workbench pengaduan</p>
          <h1 className="page-title">Daftar Pengaduan</h1>
          <p className="page-subtitle">Cari, filter, ekspor, dan tindak lanjuti laporan.</p>
        </div>
      </header>

      <FilterBar
        search={search} setSearch={setSearch}
        kategori={kategori} setKategori={setKategori}
        status={status} setStatus={setStatus}
        kategoriList={kategoriList}
        fetchData={fetchData}
        data={data}
      />

      {loading && <p className="page-subtitle">Memuat data...</p>}
      {error && <p className="alert alert-error">{error}</p>}

      <PengaduanTable
        paginated={paginated}
        user={user}
        handleStatusChange={handleStatusChange}
        handleDelete={handleDelete}
      />

      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1} className="btn btn-secondary !min-h-0 !py-1">
            Sebelumnya
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`btn !min-h-0 !py-1 ${page === i + 1 ? "btn-primary" : "btn-secondary"}`}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages} className="btn btn-secondary !min-h-0 !py-1">
            Berikutnya
          </button>
        </div>
      )}
    </div>
  );
}
