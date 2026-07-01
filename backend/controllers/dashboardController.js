const Pengaduan = require("../models/Pengaduan");

exports.getDashboard = async (req, res) => {
  try {
    // Total seluruh pengaduan
    const totalPengaduan = await Pengaduan.countDocuments();

    // Total berdasarkan status
    const pending = await Pengaduan.countDocuments({
      status: "Pending",
    });

    const proses = await Pengaduan.countDocuments({
      status: "Proses",
    });

    const selesai = await Pengaduan.countDocuments({
      status: "Selesai",
    });

    // 5 Pengaduan terbaru
    const pengaduanTerbaru = await Pengaduan.find()
      .populate("user", "nama")
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
        $lookup: {
          from: "kategoris",
          localField: "_id",
          foreignField: "_id",
          as: "kategori",
        },
      },
      {
        $unwind: "$kategori",
      },
      {
        $project: {
          _id: 0,
          nama: "$kategori.nama",
          jumlah: 1,
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};