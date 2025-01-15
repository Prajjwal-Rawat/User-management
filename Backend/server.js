require("dotenv").config();
const express = require("express");
const {DbConnection} = require("./config/Db");
const userRoutes = require("./routes/route");

const app = express();
const PORT = process.env.PORT || 4000;
const cors = require("cors");

// Middleware
app.use(express.json());
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))

// Routes
app.use("/api/users", userRoutes);

// 404 handler for non-existing endpoints
app.use((req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "An error occurred", error: err.message });
});

// Start server
DbConnection();
app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});