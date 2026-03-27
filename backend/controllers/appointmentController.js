const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const Notification = require("../models/Notification");
const nodemailer = require("nodemailer");

// ✅ UPDATED Nodemailer setup (IMPORTANT)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 1. Book appointment, notify doctor
exports.createAppointment = async (req, res) => {
  try {
    const { name, email, phone, date, doctorId, concern } = req.body;

    if (!name || !email || !phone || !date || !doctorId) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    console.log("📥 New appointment request:", req.body);

    const doctor = await Doctor.findById(doctorId);

if (!doctor) {
  console.log("❌ Doctor not found");
  return res.status(404).json({ message: "Doctor not found" });
}

console.log("Doctor email from DB:", doctor.email);

    const appointment = await Appointment.create({
      name,
      email,
      phone,
      date,
      doctorId,
      concern,
      status: "pending",
    });

    const timeOptions = ["Morning", "Afternoon", "Evening"];
    const timeButtons = timeOptions
      .map(
        (time) => `
        <a href="https://ayurcure-project.onrender.com/api/appointments/confirm?appointmentId=${appointment._id}&time=${time}">
          <button style="margin: 10px; padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 5px;">
            ${time}
          </button>
        </a>`
      )
      .join("");

    console.log("📤 Sending email to doctor:", doctor.email);

    const mailOptions = {
      from: `"AyurCure" <${process.env.EMAIL_USER}>`,
      to: doctor.email,
      subject: `New Appointment Request from ${name}`,
      html: `
        <h2>New Appointment Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Concern:</strong> ${concern || "N/A"}</p>
        <p><strong>Date:</strong> ${new Date(date).toDateString()}</p>
        <p>Please select a time:</p>
        ${timeButtons}
      `,
    };

    try {
      const info = await transporter.sendMail(mailOptions);
      console.log("✅ Email sent:", info.response);
    } catch (err) {
      console.error("❌ Email error:", err);
    }

    await Notification.create({
      email,
      message: `Your appointment request has been sent to Dr. ${doctor.name}`,
    });

    req.app.get("io")?.emit("newNotification", {
      email,
      message: `Your appointment with Dr. ${doctor.name} is pending.`,
    });

    res.status(200).json({ message: "Appointment request sent." });

  } catch (error) {
    console.error("❌ Error creating appointment:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 2. Confirm appointment
exports.confirmAppointmentTime = async (req, res) => {
  try {
    const { appointmentId, time } = req.query;

    const appointment = await Appointment.findById(appointmentId).populate("doctorId");
    if (!appointment) return res.status(404).send("Appointment not found");

    const doctorName = appointment.doctorId.name;

    console.log("📤 Sending confirmation to:", appointment.email);

    const userMail = {
      from: `"AyurCure" <${process.env.EMAIL_USER}>`,
      to: appointment.email,
      subject: "Appointment Confirmed",
      html: `
        <h2>Appointment Confirmed</h2>
        <p>Hi ${appointment.name},</p>
        <p>Your appointment with <strong>Dr. ${doctorName}</strong> is confirmed.</p>
        <p><strong>Time:</strong> ${time}</p>
        <p><strong>Date:</strong> ${new Date(appointment.date).toDateString()}</p>
      `,
    };

    try {
      const info = await transporter.sendMail(userMail);
      console.log("✅ Confirmation email sent:", info.response);
    } catch (err) {
      console.error("❌ Email error:", err);
    }

    await Appointment.findByIdAndUpdate(appointmentId, {
      status: "confirmed",
      timeOfDay: time,
    });

    res.send(`
      <h2>✅ Appointment Confirmed</h2>
      <p>Email sent to patient.</p>
    `);

  } catch (error) {
    console.error("❌ Error confirming appointment:", error);
    res.status(500).send("Server Error");
  }
};

// 3. Cancel appointment
exports.deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate("doctorId");
    if (!appointment) return res.status(404).json({ message: "Not found" });

    console.log("📤 Sending cancellation email to:", appointment.doctorId.email);

    const cancelMailOptions = {
      from: `"AyurCure" <${process.env.EMAIL_USER}>`,
      to: appointment.doctorId.email,
      subject: "Appointment Cancelled",
      html: `<p>Appointment cancelled by ${appointment.name}</p>`,
    };

    try {
      await transporter.sendMail(cancelMailOptions);
      console.log("✅ Cancellation email sent");
    } catch (err) {
      console.error("❌ Email error:", err);
    }

    await Appointment.findByIdAndDelete(req.params.id);

    res.json({ message: "Cancelled successfully" });

  } catch (error) {
    console.error("❌ Cancel error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 3. Get appointments by email
exports.getAppointmentsByEmail = async (req, res) => {
  try {
    const email = req.params.email;

    const appointments = await Appointment.find({
      email,
      status: "confirmed",
    }).populate("doctorId");

    if (!appointments.length) {
      return res.status(404).json({ message: "No appointments found" });
    }

    res.status(200).json(appointments);

  } catch (error) {
    console.error("❌ Error fetching appointments:", error);
    res.status(500).json({ message: "Server Error" });
  }
};