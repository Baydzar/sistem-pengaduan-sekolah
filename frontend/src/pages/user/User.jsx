import { useEffect, useState } from "react";

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

  const handleDelete =
    async (id) => {

      const yakin =
        window.confirm(
          "Hapus user?"
        );

      if (!yakin) return;

      await deleteUser(id);

      loadData();

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