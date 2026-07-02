const mongoose = require("mongoose");

const pengaduanSchema = new mongoose.Schema({
  judul: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
  },
  isi: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
  },
  kategori: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ["pending", "diproses", "selesai"],
    default: "pending",
  },
  pelapor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  gambar: {
    type: String,
    default: null
  }
}, { timestamps: true });

module.exports = mongoose.model("Pengaduan", pengaduanSchema);