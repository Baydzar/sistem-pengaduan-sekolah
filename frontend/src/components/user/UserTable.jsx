import {
    updateUserRole,
  } from "../../services/userService";
  
  const UserTable = ({
    data,
    onDelete,
    reload,
  }) => {
  
    const changeRole =
      async (id, role) => {
  
        await updateUserRole(
          id,
          role
        );
  
        reload();
  
      };
  
    return (
  
      <div className="bg-white rounded-lg shadow p-5">
  
        <table className="w-full">
  
          <thead>
  
            <tr>
  
              <th>Nama</th>
  
              <th>Email</th>
  
              <th>Role</th>
  
              <th>Aksi</th>
  
            </tr>
  
          </thead>
  
          <tbody>
  
            {
              data.map((user) => (
  
                <tr key={user._id}>
  
                  <td>{user.nama}</td>
  
                  <td>{user.email}</td>
  
                  <td>
  
                    <select
                      value={user.role}
                      onChange={(e) =>
                        changeRole(
                          user._id,
                          e.target.value
                        )
                      }
                    >
  
                      <option value="siswa">
                        Siswa
                      </option>
  
                      <option value="guru">
                        Guru
                      </option>
  
                      <option value="admin">
                        Admin
                      </option>
  
                    </select>
  
                  </td>
  
                  <td>
  
                    <button
                      onClick={() =>
                        onDelete(user._id)
                      }
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Hapus
                    </button>
  
                  </td>
  
                </tr>
  
              ))
            }
  
          </tbody>
  
        </table>
  
      </div>
  
    );
  
  };
  
  export default UserTable;