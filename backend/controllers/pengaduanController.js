const Pengaduan = require("../models/Pengaduan");

class PengaduanController {

  // ==========================
  // 1. Tambah Pengaduan
  // ==========================
  async createPengaduan(req, res) {
    try {
      const { judul, kategori, isi } = req.body;

      // Debug (boleh dihapus setelah selesai)
      console.log("User Login :", req.user);
      console.log("Body :", req.body);

      // Validasi
      if (!judul || !kategori || !isi) {
        return res.status(400).json({
          success: false,
          message: "Semua field wajib diisi!",
        });
      }

      // Simpan ke database
      const pengaduanBaru = await Pengaduan.create({
        user: req.user.id, // Ambil user dari JWT
        judul,
        kategori,
        isi,
      });

      return res.status(201).json({
        success: true,
        message: "Pengaduan berhasil ditambahkan",
        data: pengaduanBaru,
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // ==========================
  // 2. Ambil Semua Pengaduan
  // ==========================
  async getAllPengaduan(req, res) {
    try {
      const { search } = req.query;

      let query = {};

      if (search) {
        query.judul = {
          $regex: search,
          $options: "i",
        };
      }

      const data = await Pengaduan.find(query)
        .populate("user", "nama")
        .populate("kategori", "nama")
        .sort({
          createdAt: -1,
        });

      return res.status(200).json({
        success: true,
        data,
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // ==========================
  // 3. Detail Pengaduan
  // ==========================
  async getPengaduanById(req, res) {
    try {
      const data = await Pengaduan.findById(req.params.id)
        .populate("user", "nama")
        .populate("kategori", "nama");

      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Pengaduan tidak ditemukan",
        });
      }

      return res.status(200).json({
        success: true,
        data,
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // ==========================
  // 4. Update Pengaduan
  // ==========================
  async updatePengaduan(req, res) {
    try {

      const data = await Pengaduan.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Pengaduan tidak ditemukan",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Pengaduan berhasil diupdate",
        data,
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  // ==========================
  // 5. Hapus Pengaduan
  // ==========================
  async deletePengaduan(req, res) {
    try {

      const data = await Pengaduan.findByIdAndDelete(req.params.id);

      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Pengaduan tidak ditemukan",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Pengaduan berhasil dihapus",
      });

    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async trackPengaduan(req, res) {

    try {
  
      const data = await Pengaduan.findById(
        req.params.id
      )
        .populate("kategori", "nama")
        .populate("user", "nama");
  
      if (!data) {
        return res.status(404).json({
          success: false,
          message: "Pengaduan tidak ditemukan",
        });
      }
  
      res.status(200).json({
        success: true,
        data,
      });
  
    } catch (error) {
  
      res.status(500).json({
        success: false,
        message: error.message,
      });
  
    }
  
  }
  
}


module.exports = new PengaduanController();