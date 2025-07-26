const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

// Load environment variables from .env file
dotenv.config();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Base Route
app.get("/", (req, res) => {
  res.send("🩺 Doctor Appointment System API is running");
});

// Routes
const authRoutes = require("./routes/auth");
const doctorRoutes = require("./routes/doctors");
const appointmentRoutes = require("./routes/appointmentRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const userRoutes = require("./routes/userRoutes"); 
const remedyRoutes = require("./routes/remedyRoutes");
const contactRoutes = require('./routes/contact');



app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/remedies", remedyRoutes);
app.use("/api/users", userRoutes);
app.use("/api/contact", contactRoutes);

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: "*", // You can restrict this later to your frontend URL
    methods: ["GET", "POST"],
  },
});

// Make io globally available (optional)
global.io = io;

// Socket.IO Events
io.on("connection", (socket) => {
  console.log("🟢 A user connected:", socket.id);

  // Example: Listen to a custom event
  // socket.on("sendNotification", (data) => {
  //   console.log("📩 Notification received:", data);
  //   io.emit("receiveNotification", data); // Broadcast
  // });

  socket.on("disconnect", () => {
    console.log("🔴 A user disconnected:", socket.id);
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
