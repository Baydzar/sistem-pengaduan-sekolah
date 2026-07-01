const User = require("../models/User");

class UserController {

  async getAll(req, res) {
    try {

      const users = await User.find()
        .select("-password");

      res.json({
        success: true,
        data: users
      });

    } catch (err) {

      res.status(500).json({
        success: false,
        message: err.message
      });

    }
  }

  async updateRole(req, res) {

    try {

      const { role } = req.body;

      const user = await User.findByIdAndUpdate(
        req.params.id,
        { role },
        { new: true }
      ).select("-password");

      res.json({
        success: true,
        data: user
      });

    } catch (err) {

      res.status(500).json({
        success: false,
        message: err.message
      });

    }
  }

  async delete(req, res) {

    try {

      await User.findByIdAndDelete(
        req.params.id
      );

      res.json({
        success: true,
        message: "User berhasil dihapus"
      });

    } catch (err) {

      res.status(500).json({
        success: false,
        message: err.message
      });

    }
  }
}

module.exports = new UserController();