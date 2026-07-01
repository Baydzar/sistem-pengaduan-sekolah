const Pengaduan = require("../models/Pengaduan");

class PengaduanController {

  // ==========================
  // 1. Tambah Pengaduan
  // ==========================
  async createPengaduan(req, res) {
    try {
      if (req.user.role !== "siswa") {
        return res.status(403).json({
          success:false,
          message:"Hanya siswa yang dapat membuat pengaduan"
        });
      }
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
      const { search, status, kategori, page, limit, startDate, endDate } = req.query;
  
      let query = {};
  
      if (req.user.role === "siswa") {
        query.user = req.user.id;
      }
  
      if (search) {
        query.judul = {
          $regex: search,
          $options: "i",
        };
      }
  
      if (status) {
        query.status = status;
      }
  
      if (kategori) {
        query.kategori = kategori;
      }
  
      if (startDate && endDate) {
        query.createdAt = {
          $gte: new Date(startDate),
          $lte: new Date(endDate + "T23:59:59.999Z"),
        };
      } else if (startDate) {
        query.createdAt = { $gte: new Date(startDate) };
      } else if (endDate) {
        query.createdAt = { $lte: new Date(endDate + "T23:59:59.999Z") };
      }
  
      let data;
      let pagination = null;
  
      if (page || limit) {
        const p = parseInt(page) || 1;
        const l = parseInt(limit) || 10;
        const skip = (p - 1) * l;
        const totalItems = await Pengaduan.countDocuments(query);
        const totalPages = Math.ceil(totalItems / l);
  
        data = await Pengaduan.find(query)
          .populate("user", "nama role")
          .populate("kategori")
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(l);
  
        pagination = {
          totalItems,
          totalPages,
          currentPage: p,
          limit: l,
        };
      } else {
        data = await Pengaduan.find(query)
          .populate("user", "nama role")
          .populate("kategori")
          .sort({ createdAt: -1 });
      }
  
      res.json({
        success: true,
        data,
        pagination,
      });
  
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message,
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

    try{
   
      const pengaduan = await Pengaduan.findById(
         req.params.id
      );
   
      if(!pengaduan){
         return res.status(404).json({
            success:false,
            message:"Data tidak ditemukan"
         });
      }
   
      // ====================
      // SISWA
      // ====================
   
      if(req.user.role === "siswa"){
   
         if(
            pengaduan.user.toString() !==
            req.user.id
         ){
            return res.status(403).json({
               success:false,
               message:"Bukan pengaduan milik anda"
            });
         }
   
         if(pengaduan.status !== "pending"){
            return res.status(403).json({
               success:false,
               message:"Pengaduan sudah diproses"
            });
         }
   
         pengaduan.judul = req.body.judul;
         pengaduan.isi = req.body.isi;
         pengaduan.kategori = req.body.kategori;
   
      }
   
      // ====================
      // GURU / ADMIN
      // ====================
   
      if(
         req.user.role === "guru" ||
         req.user.role === "admin"
      ){
         pengaduan.status = req.body.status;
      }
   
      await pengaduan.save();
   
      res.json({
         success:true,
         data:pengaduan
      });
   
    }catch(err){
   
      res.status(500).json({
         success:false,
         message:err.message
      });
   
    }
   
   };

  // ==========================
  // 5. Hapus Pengaduan
  // ==========================
  async deletePengaduan(req, res) {

    try {
  
      const pengaduan =
        await Pengaduan.findById(req.params.id);
  
      if (!pengaduan) {
        return res.status(404).json({
          success: false,
          message: "Data tidak ditemukan"
        });
      }
  
      // ADMIN
      if (req.user.role === "admin") {
  
        await pengaduan.deleteOne();
  
        return res.json({
          success: true,
          message: "Berhasil dihapus"
        });
  
      }
  
      // SISWA
      if (req.user.role === "siswa") {
  
        if (
          pengaduan.user.toString() !==
          req.user.id
        ) {
          return res.status(403).json({
            success: false,
            message: "Bukan milik anda"
          });
        }
  
        if (
          pengaduan.status !== "pending"
        ) {
          return res.status(403).json({
            success: false,
            message: "Sudah diproses"
          });
        }
  
        await pengaduan.deleteOne();
  
        return res.json({
          success: true,
          message: "Berhasil dihapus"
        });
  
      }
  
      return res.status(403).json({
        success: false,
        message: "Tidak memiliki akses"
      });
  
    } catch (err) {
  
      res.status(500).json({
        success: false,
        message: err.message
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