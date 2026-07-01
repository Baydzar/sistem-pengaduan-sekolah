import MainLayout from "../../layouts/MainLayout";

const Tracking = () => {
  return (
    <MainLayout>

      <h1 className="text-3xl font-bold mb-6">
        Tracking Pengaduan
      </h1>

      <div className="bg-white rounded-xl shadow p-6">

        <input
          type="text"
          placeholder="Masukkan ID Pengaduan"
          className="w-full border rounded p-3"
        />

      </div>

    </MainLayout>
  );
};

export default Tracking;