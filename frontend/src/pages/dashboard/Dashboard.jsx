import MainLayout from "../../layouts/MainLayout";

const Dashboard = () => {
  return (
    <MainLayout>

      <h2 className="text-3xl font-bold mb-6">
        Dashboard
      </h2>

      <div className="grid grid-cols-4 gap-5">

        <div className="bg-white rounded-xl shadow p-6">

          <h3>Total Pengaduan</h3>

          <p className="text-3xl font-bold mt-3">
            0
          </p>

        </div>

        <div className="bg-yellow-100 rounded-xl shadow p-6">

          <h3>Pending</h3>

          <p className="text-3xl font-bold mt-3">
            0
          </p>

        </div>

        <div className="bg-blue-100 rounded-xl shadow p-6">

          <h3>Proses</h3>

          <p className="text-3xl font-bold mt-3">
            0
          </p>

        </div>

        <div className="bg-green-100 rounded-xl shadow p-6">

          <h3>Selesai</h3>

          <p className="text-3xl font-bold mt-3">
            0
          </p>

        </div>

      </div>

    </MainLayout>
  );
};

export default Dashboard;