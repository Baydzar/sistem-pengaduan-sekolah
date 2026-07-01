import {FaCheckCircle,FaClock,FaSpinner,} from "react-icons/fa";

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
                    <span
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-white text-sm font-medium
                        ${
                            item.status === "Pending"
                            ? "bg-yellow-500"
                            : item.status === "Proses"
                            ? "bg-blue-500"
                            : "bg-green-500"
                        }`}
                    >
                        {item.status === "Pending" && <FaClock />}
                        {item.status === "Proses" && <FaSpinner />}
                        {item.status === "Selesai" && <FaCheckCircle />}

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