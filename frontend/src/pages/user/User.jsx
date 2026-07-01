import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import MainLayout from "../../layouts/MainLayout";

import {
  getAllUsers,
  deleteUser,
} from "../../services/userService";

import UserTable from "../../components/user/UserTable";

const User = () => {

  const [users, setUsers] = useState([]);

  const loadData = async () => {

    const res =
      await getAllUsers();

    setUsers(res.data);

  };

  useEffect(() => {

    loadData();

  }, []);

  const handleDelete = async (id) => {
    const yakin = window.confirm("Hapus user?");
    if (!yakin) return;
  
    try {
      await deleteUser(id);
      toast.success("User berhasil dihapus");
      loadData();
    } catch (err) {
      toast.error("Gagal menghapus user");
      console.error(err);
    }
  };

  return (

    <MainLayout>

      <h1 className="text-3xl font-bold mb-5">

        Kelola Pengguna

      </h1>

      <UserTable
        data={users}
        onDelete={handleDelete}
        reload={loadData}
      />

    </MainLayout>

  );

};

export default User;