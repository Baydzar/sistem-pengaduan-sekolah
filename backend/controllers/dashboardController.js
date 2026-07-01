const Pengaduan = require("../models/Pengaduan");
const Kategori = require("../models/Kategori");

exports.getDashboard = async (req, res) => {
  try {
    let filter = {};

    if (req.user.role === "siswa") {
      filter.user = req.user.id;
    }

    // Total seluruh pengaduan
    const totalPengaduan = await Pengaduan.countDocuments(filter);

    // Total seluruh kategori
    const totalKategori = await Kategori.countDocuments();

    // Total berdasarkan status
    const pending = await Pengaduan.countDocuments({
      ...filter,
      status: "pending",
    });

    const proses = await Pengaduan.countDocuments({
      ...filter,
      status: "proses",
    });

    const selesai = await Pengaduan.countDocuments({
      ...filter,
      status: "selesai",
    });

    // 5 Pengaduan terbaru
    const pengaduanTerbaru = await Pengaduan.find(filter)
      .populate("user", "nama")
      .populate("kategori", "nama")
      .sort({ createdAt: -1 })
      .limit(5);

    // Statistik kategori
    const kategoriStatistik = await Pengaduan.aggregate([
      {
        $match: filter.user ? { user: filter.user } : {},
      },
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
        totalKategori,
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