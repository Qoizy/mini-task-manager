require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/database");

console.log("Environment variables:");
console.log("MONGODB_URI:", process.env.MONGODB_URI ? "Loaded" : "NOT LOADED");
console.log("PORT:", process.env.PORT);
console.log("JWT_SECRET:", process.env.JWT_SECRET ? "Loaded" : "NOT LOADED");

// Route imports
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/tasks");

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

// const corsOptions = {
//   //   origin: function (origin, callback) {
//   //     if (!origin) return callback(null, true);

//   //     const allowedOrigins = [process.env.FRONTEND_URL, "https://localhost:3000"];

//   //     if (allowedOrigins.indexOf(origin) !== -1) {
//   //       callback(null, true);
//   //     } else {
//   //       callback(new Error("Not allowed by CORS"));
//   //     }
//   //   },
//   credentials: true,
//   optionsSuccessStatus: 200,
// };

const corsOptions = {
  origin: [
    "https://mini-task-manager-phi.vercel.app",
    "http://localhost:3000",
    "https://localhost:3000",
  ],
  credentials: true,
  optionsSuccessStatus: 200,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Routes
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// 404 handler - FIXED: Use app.use instead of app.all
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
    path: req.originalUrl,
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error("Unhandled error:", error);

  if (error.message === "Not allowed by CORS") {
    return res.status(403).json({
      success: false,
      message: "CORS policy blocked this request",
    });
  }

  res.status(500).json({
    success: false,
    message: "Internal server error",
    error:
      process.env.NODE_ENV === "development"
        ? error.message
        : "Something went wrong",
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  });
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
});
