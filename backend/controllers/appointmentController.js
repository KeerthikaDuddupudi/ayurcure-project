const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const Notification = require("../models/Notification");
const nodemailer = require("nodemailer");

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Appointment creation + Email + Notification
exports.createAppointment = async (req, res) => {
  try {
    const { name, email, phone, date, doctorId } = req.body;

    console.log("Received appointment request:", req.body);

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      console.log("❌ Doctor not found");
      return res.status(404).json({ message: "Doctor not found" });
    }

    console.log("✅ Doctor found, proceeding to create appointment...");
    const appointment = await Appointment.create({
      name,
      email,
      phone,
      date,
      doctorId,
    });

    const timeOptions = ["Morning", "Afternoon", "Evening"];
    const timeButtons = timeOptions.map(time => `
      <a href="http://localhost:5000/api/appointments/confirm?appointmentId=${appointment._id}&time=${time}">
        <button style="margin: 10px; padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">
          ${time}
        </button>
      </a>
    `).join("");

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: doctor.email,
      subject: `New Appointment Request from ${name}`,
      html: `
        <h2>New Appointment Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Date:</strong> ${new Date(date).toDateString()}</p>
        <p>Please select a preferred time:</p>
        ${timeButtons}
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("📩 Email sent to doctor");

    // Save notification
    console.log("💾 Saving notification...");
    await Notification.create({
      email,
      message: `Your appointment request has been sent to Dr. ${doctor.name}`,
    });
    console.log("✅ Notification saved");

    // Emit notification via Socket.IO
    if (req.app.get("io")) {
      req.app.get("io").emit("newNotification", {
        email,
        message: `Your appointment with Dr. ${doctor.name} is pending confirmation.`,
      });
      console.log("📢 Notification emitted via socket");
    }

    res.status(200).json({ message: "Appointment request sent to doctor. Awaiting confirmation." });

  } catch (error) {
    console.error("❌ Error creating appointment:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Time Confirmation + Email Patient
exports.confirmAppointmentTime = async (req, res) => {
  try {
    const { appointmentId, time } = req.query;

    const appointment = await Appointment.findById(appointmentId).populate("doctorId");
    if (!appointment) return res.status(404).send("Appointment not found");

    const doctorName = appointment.doctorId.name;

    const userMail = {
      from: process.env.EMAIL_USER,
      to: appointment.email,
      subject: "Your Appointment is Confirmed",
      html: `
        <h2>Appointment Confirmed</h2>
        <p>Hi ${appointment.name},</p>
        <p>Your appointment with <strong>Dr. ${doctorName}</strong> is confirmed for <strong>${time}</strong> on <strong>${new Date(appointment.date).toDateString()}</strong>.</p>
      `,
    };

    await transporter.sendMail(userMail);
    console.log("📩 Confirmation email sent to patient");

    // Save notification
    await Notification.create({
      email: appointment.email,
      message: `Your appointment with Dr. ${doctorName} is confirmed for ${time}.`,
    });
    console.log("✅ Confirmation notification saved");

    // Emit socket event
    if (req.app.get("io")) {
      req.app.get("io").emit("newNotification", {
        email: appointment.email,
        message: `Your appointment with Dr. ${doctorName} is confirmed for ${time}.`,
      });
      console.log("📢 Confirmation notification emitted");
    }

    res.send(`
      <h2>✅ Appointment Confirmed for ${time}</h2>
      <p>Email confirmation sent to the patient.</p>
    `);

  } catch (error) {
    console.error("❌ Error confirming appointment:", error);
    res.status(500).send("Server Error");
  }
};