require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const pengaduanController = require('./controllers/pengaduanController');
const authRoutes = require("./routes/authRoutes");
const pengaduanRoutes = require("./routes/pengaduanRoutes");
const kategoriRoutes = require("./routes/kategoriRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const userRoutes =
require("./routes/userRoutes");
const app = express();

// Hubungkan ke MongoDB Atlas
connectDB();

// Middleware (Kriteria Backend)
app.use(cors());
app.use(express.json()); // Supaya express bisa membaca req.body berupa JSON


// Pemetaan Routing REST API Langsung sesuai spesifikasi minimum:
app.use("/api/auth", authRoutes);
app.use("/api/pengaduan", pengaduanRoutes);
app.use("/api/kategori", kategoriRoutes);
app.use("/api/user", userRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.get('/api/data/:id', (req, res) => pengaduanController.getPengaduanById(req, res));
app.put('/api/data/:id', (req, res) => pengaduanController.updatePengaduan(req, res));
app.delete('/api/data/:id', (req, res) => pengaduanController.deletePengaduan(req, res));

// Jalankan Server
const PORT = process.env.PORT || 5000;
// Tambahkan ini di server.js untuk test halaman utama
app.get('/', (req, res) => {
  res.send('Server Sistem Pengaduan Sekolah Aktif!');
});
app.listen(PORT, () => {
  console.log(`Server berjalan di port http://localhost:${PORT}`);
});