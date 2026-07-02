import { Eye, Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const statusColor = {
  pending: "badge-pending",
  diproses: "badge-diproses",
  selesai: "badge-selesai",
};

export default function PengaduanTable({ paginated, user, handleStatusChange, handleDelete }) {
  const navigate = useNavigate();
  return (
    <div className="panel table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            <th>Judul</th>
            <th>Kategori</th>
            <th>Status</th>
            <th>Tanggal</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {paginated.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center text-[color:var(--color-muted)]">Belum ada pengaduan</td>
            </tr>
          )}
          {paginated.map((item) => (
            <tr key={item._id}>
              <td>{item.judul}</td>
              <td className="capitalize">{item.kategori}</td>
              <td>
                {user?.role === "admin" || user?.role === "guru" ? (
                  <select
                    value={item.status}
                    onChange={(e) => handleStatusChange(item._id, e.target.value)}
                    className={`badge border-0 ${statusColor[item.status]}`}
                  >
                    <option value="pending">menunggu</option>
                    <option value="diproses">diproses</option>
                    <option value="selesai">selesai</option>
                  </select>
                ) : (
                  <span className={`badge ${statusColor[item.status]}`}>{item.status}</span>
                )}
              </td>
              <td>{new Date(item.createdAt).toLocaleDateString("id-ID")}</td>
              <td className="px-4 py-2">
                <div className="flex gap-2 items-center">
                  <button onClick={() => navigate(`/pengaduan/${item._id}`)}
                    title="Detail"
                    className="icon-btn">
                    <Eye size={14} />
                  </button>
                {(user?.role === "siswa" && item.status === "pending") && (
                  <button onClick={() => navigate(`/pengaduan/edit/${item._id}`)}
                    title="Edit"
                    className="icon-btn">
                    <Pencil size={14} />
                  </button>
                )}
                {(user?.role === "admin" || (user?.role === "siswa" && item.status === "pending")) && (
                  <button onClick={() => handleDelete(item._id)}
                    title="Hapus"
                    className="icon-btn icon-btn-danger">
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
