import { updateUserRole } from "../../services/userService";
import toast from "react-hot-toast";

const UserTable = ({ data, onDelete, reload }) => {

  const changeRole = async (id, role) => {
    try {
      await updateUserRole(id, role);
      toast.success("Role berhasil diperbarui");
      reload();
    } catch (err) {
      toast.error("Gagal memperbarui role");
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-5 overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3 text-gray-700 font-semibold">Nama</th>
            <th className="p-3 text-gray-700 font-semibold">Email</th>
            <th className="p-3 text-gray-700 font-semibold">Role</th>
            <th className="p-3 text-gray-700 font-semibold text-center">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="p-3 text-gray-700">{user.nama}</td>
                <td className="p-3 text-gray-700">{user.email}</td>
                <td className="p-3 text-gray-700">
                  <select
                    value={user.role}
                    onChange={(e) => changeRole(user._id, e.target.value)}
                    className="border rounded px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  >
                    <option value="siswa">Siswa</option>
                    <option value="guru">Guru</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => onDelete(user._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition duration-200"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-5 text-gray-500">
                Tidak ada data pengguna.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;