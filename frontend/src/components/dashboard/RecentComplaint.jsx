import { useNavigate } from "react-router-dom";
const RecentComplaint = ({ data }) => {
    const navigate = useNavigate();

    const getStatusBadge = (status) => {
  
      switch (status) {
        case "pending":
          return "bg-yellow-100 text-yellow-700";
        case "proses":
          return "bg-blue-100 text-blue-700";
        case "selesai":
          return "bg-green-100 text-green-700";
        default:
          return "bg-gray-100 text-gray-700";
      }
  
    };
  
    return (
      <div className="bg-white rounded-xl shadow p-5 mt-8">
  
        <h2 className="text-xl font-semibold mb-4">
          Pengaduan Terbaru
        </h2>
  
        <div className="overflow-x-auto">
  
          <table className="w-full">
  
            <thead>
              <tr className="border-b">
  
                <th className="text-left py-3">
                  Judul
                </th>
  
                <th className="text-center">
                  Status
                </th>
  
                <th className="text-center">
                  Tanggal
                </th>
                <th className="text-center">
                 Aksi
                </th>
  
              </tr>
            </thead>
  
            <tbody>
  
              {data.length > 0 ? (
  
                data.map((item) => (
  
                  <tr
                    key={item._id}
                    className="border-b hover:bg-gray-50"
                  >
  
                    <td className="py-3">
                      {item.judul}
                    </td>
  
                    <td className="text-center">
  
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(item.status)}`}
                      >
                        {item.status}
                      </span>
  
                    </td>
  
                    <td className="text-center">
  
                      {new Date(
                        item.createdAt
                      ).toLocaleDateString("id-ID")}
  
                    </td>
                    <td className="text-center">
                    <button
                        onClick={() =>
                        navigate(`/pengaduan/detail/${item._id}`)
                        }
                        className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                        Detail
                    </button>

                    </td>
  
                  </tr>
  
                ))
  
              ) : (
  
                <tr>
  
                  <td
                    colSpan="3"
                    className="text-center py-5 text-gray-500"
                  >
                    Belum ada pengaduan
                  </td>
  
                </tr>
  
              )}
  
            </tbody>
  
          </table>
  
        </div>
  
      </div>
    );
  };
  
  export default RecentComplaint;