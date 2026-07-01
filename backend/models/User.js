const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["admin", "guru", "siswa"],
      default: "siswa",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);