const PengaduanTable = ({ data, onEdit, onDelete }) => {
    return (
      <div className="bg-white rounded-lg shadow p-5 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">No</th>
              <th className="p-3">Judul</th>
              <th className="p-3">Kategori</th>
              <th className="p-3">Status</th>
              <th className="p-3">Tanggal</th>
              <th className="p-3 text-center">Aksi</th>
            </tr>
          </thead>
  
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr
                  key={item._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="p-3">{index + 1}</td>
  
                  <td className="p-3">{item.judul}</td>
  
                  <td className="p-3">
                    {item.kategori?.nama}
                  </td>
  
                  <td className="p-3">
                    <span className="px-2 py-1 rounded bg-yellow-200">
                      {item.status}
                    </span>
                  </td>
  
                  <td className="p-3">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
  
                  <td className="p-3 flex gap-2 justify-center">
                    <button
                      onClick={() => onEdit(item)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
  
                    <button
                      onClick={() => onDelete(item._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center p-5"
                >
                  Tidak ada data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default PengaduanTable;