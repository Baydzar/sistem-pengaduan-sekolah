const statusColor = {
  pending: "badge-pending",
  diproses: "badge-diproses",
  selesai: "badge-selesai",
};

export default function DashboardRecent({ recent }) {
  return (
    <div className="panel table-wrap">
      <div className="panel-header">
        <h2 className="section-title">5 Pengaduan Terbaru</h2>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Judul</th>
            <th>Kategori</th>
            <th>Status</th>
            <th>Pelapor</th>
          </tr>
        </thead>
        <tbody>
          {recent.length === 0 && (
            <tr>
              <td colSpan={4} className="text-center text-[color:var(--color-muted)]">Belum ada pengaduan terbaru</td>
            </tr>
          )}
          {recent.map((item) => (
            <tr key={item._id}>
              <td>{item.judul}</td>
              <td className="capitalize">{item.kategori}</td>
              <td>
                <span className={`badge ${statusColor[item.status]}`}>{item.status}</span>
              </td>
              <td>{item.pelapor?.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
