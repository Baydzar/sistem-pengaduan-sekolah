import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">

      <h1 className="text-7xl font-bold text-blue-600">
        404
      </h1>

      <h2 className="text-2xl font-semibold mt-4">
        Halaman Tidak Ditemukan
      </h2>

      <p className="text-gray-500 mt-2">
        URL yang kamu akses tidak tersedia.
      </p>

      <Link
        to="/dashboard"
        className="mt-6 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
      >
        Kembali ke Dashboard
      </Link>

    </div>
  );
};

export default NotFound;