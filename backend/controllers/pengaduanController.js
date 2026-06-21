const Pengaduan = require('../models/Pengaduan');

class PengaduanController {
  // 1. POST /data (Input Pengaduan Baru)
  async createPengaduan(req, res) {
    try {
      const { user, judul, kategori, isi } = req.body;

      // Validasi sederhana (Kriteria JavaScript Dasar & Backend)
      if (!user || !judul || !kategori || !isi) {
        return res.status(400).json({ message: 'Semua fields wajib diisi!' });
      }

      // PERBAIKAN: Menghapus spasi pada nama variabel menjadi camelCase (pengaduanBaru)
      const pengaduanBaru = await Pengaduan.create({ user, judul, kategori, isi });
      
      // PERBAIKAN: Mengembalikan variabel yang benar (pengaduanBaru)
      res.status(201).json({ success: true, data: pengaduanBaru });
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  }

  // 2. GET /data (Ambil Semua Data + Query Pencarian)
  async getAllPengaduan(req, res) {
    try {
      const { search } = req.query;
      let query = {};

      // Implementasi Query Pencarian (Kriteria Database)
      if (search) {
        query.judul = { $regex: search, $options: 'i' }; // 'i' artinya case-insensitive
      }

      // Memakai .populate('user', 'nama') jika ingin mengambil data user sekalian (Relasi)
      const data = await Pengaduan.find(query).populate('user', 'nama'); 
      res.status(200).json({ success: true, data });
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  }

  // 3. GET /data/:id (Detail Pengaduan)
  async getPengaduanById(req, res) {
    try {
      const pengaduan = await Pengaduan.findById(req.params.id);
      if (!pengaduan) {
        return res.status(404).json({ message: 'Data pengaduan tidak ditemukan' });
      }
      res.status(200).json({ success: true, data: pengaduan });
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  }

  // 4. PUT /data/:id (Update Status/Isi Pengaduan)
  async updatePengaduan(req, res) {
    try {
      const updatedData = await Pengaduan.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
      );
      if (!updatedData) {
        return res.status(404).json({ message: 'Data tidak ditemukan' });
      }
      res.status(200).json({ success: true, data: updatedData });
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  }

  // 5. DELETE /data/:id (Hapus Pengaduan)
  async deletePengaduan(req, res) {
    try {
      const deleted = await Pengaduan.findByIdAndDelete(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: 'Data tidak ditemukan' });
      }
      res.status(200).json({ success: true, message: 'Pengaduan berhasil dihapus' });
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  }
}

module.exports = new PengaduanController();