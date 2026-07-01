const mongoose = require('mongoose');

const PengaduanSchema = new mongoose.Schema({
  // Relasi ke model User
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID wajib diisi']
  },
  judul: {
    type: String,
    required: [true, 'Judul pengaduan tidak boleh kosong'],
    trim: true
  },
  kategori: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Kategori",
    required: true,
  },
  isi: {
    type: String,
    required: [true, 'Isi pengaduan tidak boleh kosong']
  },
  status: {
    type: String,
    enum: ['Pending', 'Proses', 'Selesai'],
    default: 'Pending'
  }
}, {
  timestamps: true // Otomatis membuat createdAt dan updatedAt
});

module.exports = mongoose.model('Pengaduan', PengaduanSchema);