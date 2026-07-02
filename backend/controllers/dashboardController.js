const Pengaduan = require("../models/Pengaduan");

exports.getDashboard = async (req, res) => {
  // Total seluruh pengaduan
  const totalPengaduan = await Pengaduan.countDocuments();

  // Total berdasarkan status
  const pending = await Pengaduan.countDocuments({
    status: "pending",
  });

  const proses = await Pengaduan.countDocuments({
    status: "diproses",
  });

  const selesai = await Pengaduan.countDocuments({
    status: "selesai",
  });

  // 5 Pengaduan terbaru
  const pengaduanTerbaru = await Pengaduan.find()
    .populate("pelapor", "name")
    .populate("kategori", "nama")
    .sort({ createdAt: -1 })
    .limit(5);

  // Statistik kategori
  const kategoriStatistik = await Pengaduan.aggregate([
    {
      $group: {
        _id: "$kategori",
        jumlah: {
          $sum: 1,
        },
      },
    },
    {
      $sort: {
        jumlah: -1,
      },
    },
  ]);

  res.status(200).json({
    success: true,
    data: {
      totalPengaduan,
      pending,
      proses,
      selesai,
      kategoriStatistik,
      pengaduanTerbaru,
    },
  });
};