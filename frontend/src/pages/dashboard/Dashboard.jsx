import MainLayout from "../../layouts/MainLayout";
import StatCard from "../../components/dashboard/StatCard";
import StatusChart from "../../components/dashboard/StatusChart";

const Dashboard = () => {
  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-5 mb-8">
        <StatCard title="Total Pengaduan" total={25} color="blue" />
        <StatCard title="Pending" total={5} color="yellow" />
        <StatCard title="Proses" total={10} color="red" />
        <StatCard title="Selesai" total={10} color="green" />
      </div>

      <StatusChart />
    </MainLayout>
  );
};

export default Dashboard;