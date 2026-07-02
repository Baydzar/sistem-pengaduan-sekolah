import { Download, FileSpreadsheet, Search } from "lucide-react";
import { exportExcel, exportPDF } from "../utils/exportHelper";

export default function FilterBar({ search, setSearch, kategori, setKategori, status, setStatus, kategoriList, fetchData, data }) {
  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Cari judul laporan..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && fetchData()}
        className="field"
      />
      <select value={kategori} onChange={(e) => setKategori(e.target.value)}
        className="field">
        <option value="">Semua Kategori</option>
        {kategoriList.map(k => (
          <option key={k._id} value={k.nama}>{k.nama}</option>
        ))}
      </select>
      <select value={status} onChange={(e) => setStatus(e.target.value)}
        className="field">
        <option value="">Semua Status</option>
        <option value="pending">Menunggu</option>
        <option value="diproses">Diproses</option>
        <option value="selesai">Selesai</option>
      </select>
      <button onClick={fetchData} className="btn btn-primary">
        <Search size={16} />
        Cari
      </button>
      <button onClick={() => exportPDF(data)} className="btn btn-danger">
        <Download size={16} />
        PDF
      </button>
      <button onClick={() => exportExcel(data)} className="btn btn-secondary">
        <FileSpreadsheet size={16} />
        Excel
      </button>
    </div>
  );
}
