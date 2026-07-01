import { useEffect, useState } from "react";

import MainLayout from "../../layouts/MainLayout";
import StatCard from "../../components/dashboard/StatCard";
import StatusChart from "../../components/dashboard/StatusChart";
import RecentComplaint from "../../components/dashboard/RecentComplaint";
import WelcomeCard from "../../components/dashboard/WelcomeCard";
import { getDashboardStats } from "../../services/dashboardService";

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    proses: 0,
    selesai: 0,
    kategori: 0,
  });

  const [recent, setRecent] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {

    loadDashboard();

    const userLogin = JSON.parse(
        localStorage.getItem("user")
    );

    setUser(userLogin);

}, []);

  const loadDashboard = async () => {
    try {
      const res = await getDashboardStats();
      const { totalPengaduan, pending, proses, selesai, totalKategori, pengaduanTerbaru } = res.data;
  
      setRecent(pengaduanTerbaru);
  
      setStats({
        total: totalPengaduan,
        pending: pending,
        proses: proses,
        selesai: selesai,
        kategori: totalKategori,
      });
  
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MainLayout>

    <WelcomeCard user={user} />

      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">

        <StatCard
          title="Total Pengaduan"
          value={stats.total}
          color="#2563eb"
        />

        <StatCard
          title="Pending"
          value={stats.pending}
          color="#eab308"
        />

        <StatCard
          title="Proses"
          value={stats.proses}
          color="#3b82f6"
        />

        <StatCard
          title="Selesai"
          value={stats.selesai}
          color="#22c55e"
        />

        <StatCard
          title="Kategori"
          value={stats.kategori}
          color="#8b5cf6"
        />

      </div>

      <StatusChart stats={stats} />
      <RecentComplaint data={recent} />

    </MainLayout>
  );
};

export default Dashboard;