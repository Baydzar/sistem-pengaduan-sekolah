const Kategori = require("../models/Kategori");

exports.getAll = async (req, res) => {
  const data = await Kategori.find().sort({ createdAt: 1 });
  res.json(data);
};

exports.create = async (req, res) => {
  const { nama } = req.body;
  const exists = await Kategori.findOne({ nama });
  if (exists) return res.status(400).json({ message: "Kategori sudah ada" });
  const data = await Kategori.create({ nama });
  res.status(201).json(data);
};

exports.remove = async (req, res) => {
  await Kategori.findByIdAndDelete(req.params.id);
  res.json({ message: "Kategori dihapus" });
};