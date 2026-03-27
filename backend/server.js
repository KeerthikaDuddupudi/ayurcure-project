const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);

// =====================
// Middleware
// =====================
app.use(express.json());

// CORS (allow all for now, later restrict to frontend URL)
app.use(
  cors({
    origin: "https://ayurcure-project.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.options("*", cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://ayurcure-project.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// =====================
// MongoDB Connection
// =====================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // stop server if DB fails
  });

// =====================
// Base Route
// =====================
app.get("/", (req, res) => {
  res.send("🩺 AyurCure API is running");
});

// =====================
// Routes
// =====================
const authRoutes = require("./routes/auth");
const doctorRoutes = require("./routes/doctors");
const appointmentRoutes = require("./routes/appointmentRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const userRoutes = require("./routes/userRoutes");
const remedyRoutes = require("./routes/remedyRoutes");
const contactRoutes = require("./routes/contact");
const savedRemedyRoutes = require("./routes/savedRemedyRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/remedies", remedyRoutes);
app.use("/api/users", userRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/saved", savedRemedyRoutes);

// =====================
// Socket.IO Setup
// =====================
const io = new Server(server, {
  cors: {
    origin: "https://ayurcure-project.vercel.app",
    methods: ["GET", "POST"],
  },
});

global.io = io;

// Socket events
io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

// =====================
// Start Server
// =====================
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});