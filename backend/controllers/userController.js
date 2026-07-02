const User = require("../models/User");

// GET semua user
exports.getAll = async (req, res) => {
  const users = await User.find().select("-password").sort({ createdAt: -1 });
  res.json(users);
};

// PUT update role user
exports.updateRole = async (req, res) => {
  const { role } = req.body;
  const user = await User.findByIdAndUpdate(
    req.params.id, { role }, { returnDocument: "after" }
  ).select("-password");
  if (!user) return res.status(404).json({ message: "User tidak ditemukan" });
  res.json(user);
};

// DELETE user
exports.remove = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "User berhasil dihapus" });
};