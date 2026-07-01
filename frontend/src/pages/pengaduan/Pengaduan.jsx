import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import Loading from "../../components/common/Loading";
import PengaduanTable from "../../components/pengaduan/PengaduanTable";
import { getAllPengaduan, deletePengaduan } from "../../services/pengaduanService";
import { getAllKategori } from "../../services/kategoriService";

const Pengaduan = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [keyword, setKeyword] = useState("");
    const [pengaduan, setPengaduan] = useState([]);
    const [categories, setCategories] = useState([]);

    // Filter & Pagination States
    const [statusFilter, setStatusFilter] = useState("");
    const [kategoriFilter, setKategoriFilter] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [pagination, setPagination] = useState(null);

    const loadCategories = async () => {
        try {
            const res = await getAllKategori();
            setCategories(res.data || []);
        } catch (err) {
            console.error(err);
        }
    };

    const loadData = async () => {
        try {
            setLoading(true);
            const params = {
                page,
                limit,
                search: keyword,
                status: statusFilter,
                kategori: kategoriFilter,
                startDate,
                endDate
            };
            const res = await getAllPengaduan(params);
            setPengaduan(res.data || []);
            setPagination(res.pagination);
        } catch (err) {
            console.error(err);
            toast.error("Gagal memuat data pengaduan");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    useEffect(() => {
        const delayDebounce = setTimeout(() => {
            loadData();
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [page, keyword, statusFilter, kategoriFilter, startDate, endDate]);

    const handleResetFilters = () => {
        setKeyword("");
        setStatusFilter("");
        setKategoriFilter("");
        setStartDate("");
        setEndDate("");
        setPage(1);
    };

    const handleDelete = async (id) => {
        const yakin = window.confirm("Yakin ingin menghapus pengaduan?");
        if (!yakin) return;

        try {
            await deletePengaduan(id);
            toast.success("Pengaduan berhasil dihapus");
            loadData();
        } catch (err) {
            console.error(err);
            toast.error("Gagal menghapus pengaduan");
        }
    };

    const handleEdit = (item) => {
        navigate(`/pengaduan/edit/${item._id}`);
    };

    return (
        <MainLayout>
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-3xl font-bold">Data Pengaduan</h1>
                <button
                    onClick={() => navigate("/pengaduan/tambah")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded transition"
                >
                    Tambah Pengaduan
                </button>
            </div>

            {/* Filter Panel */}
            <div className="bg-white rounded-lg shadow p-5 mb-6 flex flex-wrap gap-4 items-end">
                <div className="flex-1 min-w-[200px]">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cari</label>
                    <input
                        type="text"
                        placeholder="Cari judul..."
                        value={keyword}
                        onChange={(e) => { setKeyword(e.target.value); setPage(1); }}
                        className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                        value={statusFilter}
                        onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                        className="border rounded px-3 py-2 w-40 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                        <option value="">Semua Status</option>
                        <option value="pending">Pending</option>
                        <option value="proses">Proses</option>
                        <option value="selesai">Selesai</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                    <select
                        value={kategoriFilter}
                        onChange={(e) => { setKategoriFilter(e.target.value); setPage(1); }}
                        className="border rounded px-3 py-2 w-48 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                        <option value="">Semua Kategori</option>
                        {categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>{cat.nama}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mulai</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => { setStartDate(e.target.value); setPage(1); }}
                        className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Selesai</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => { setEndDate(e.target.value); setPage(1); }}
                        className="border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    onClick={handleResetFilters}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm transition"
                >
                    Reset
                </button>
            </div>

            {loading ? (
                <Loading />
            ) : (
                <>
                    <PengaduanTable
                        data={pengaduan}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />

                    {/* Pagination Controls */}
                    {pagination && pagination.totalPages > 1 && (
                        <div className="flex justify-between items-center mt-5 bg-white p-4 rounded-lg shadow">
                            <span className="text-sm text-gray-600">
                                Menampilkan Halaman {pagination.currentPage} dari {pagination.totalPages} ({pagination.totalItems} total data)
                            </span>
                            <div className="flex gap-2">
                                <button
                                    disabled={pagination.currentPage === 1}
                                    onClick={() => setPage(pagination.currentPage - 1)}
                                    className="px-3 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-50 text-sm font-medium transition cursor-pointer"
                                >
                                    Sebelumnya
                                </button>
                                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
                                    <button
                                        key={p}
                                        onClick={() => setPage(p)}
                                        className={`px-3 py-1 border rounded text-sm font-medium transition cursor-pointer ${
                                            pagination.currentPage === p
                                                ? "bg-blue-600 text-white border-blue-600"
                                                : "bg-white hover:bg-gray-100 text-gray-700"
                                        }`}
                                    >
                                        {p}
                                    </button>
                                ))}
                                <button
                                    disabled={pagination.currentPage === pagination.totalPages}
                                    onClick={() => setPage(pagination.currentPage + 1)}
                                    className="px-3 py-1 border rounded bg-white hover:bg-gray-100 disabled:opacity-50 text-sm font-medium transition cursor-pointer"
                                >
                                    Selanjutnya
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </MainLayout>
    );
};

export default Pengaduan;