const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: messages.join(", ") });
  }

  // Mongoose cast error (invalid ObjectId, etc.)
  if (err.name === "CastError") {
    return res.status(400).json({ message: "ID tidak valid" });
  }

  const status = err.statusCode || 500;
  res.status(status).json({ message: err.message || "Server error" });
};

module.exports = { errorHandler }; 