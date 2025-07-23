const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const Notification = require("../models/Notification");
const nodemailer = require("nodemailer");

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// 1. Book appointment, notify doctor
exports.createAppointment = async (req, res) => {
  try {
    const { name, email, phone, date, doctorId } = req.body;

    console.log("📥 New appointment request received:", req.body);

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const appointment = await Appointment.create({
      name,
      email,
      phone,
      date,
      doctorId,
      status: "pending",
    });

    const timeOptions = ["Morning", "Afternoon", "Evening"];
    const timeButtons = timeOptions
      .map(
        (time) => `
        <a href="http://localhost:5000/api/appointments/confirm?appointmentId=${appointment._id}&time=${time}">
          <button style="margin: 10px; padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 5px;">
            ${time}
          </button>
        </a>`
      )
      .join("");

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
        <p>Please select a time to confirm:</p>
        ${timeButtons}
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("📩 Email sent to doctor:", doctor.email);

    await Notification.create({
      email,
      message: `Your appointment request has been sent to Dr. ${doctor.name}`,
    });

    req.app.get("io")?.emit("newNotification", {
      email,
      message: `Your appointment with Dr. ${doctor.name} is pending confirmation.`,
    });

    res.status(200).json({ message: "Appointment request sent to doctor." });
  } catch (error) {
    console.error("❌ Error creating appointment:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// 2. Confirm time by doctor
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
        <p>Your appointment with <strong>Dr. ${doctorName}</strong> is confirmed for <strong>${time}</strong> on <strong>${new Date(
        appointment.date
      ).toDateString()}</strong>.</p>
      `,
    };

    await transporter.sendMail(userMail);
    console.log("📩 Confirmation sent to user:", appointment.email);

    await Appointment.findByIdAndUpdate(appointmentId, {
      status: "confirmed",
      timeOfDay: time, // ✅ match your schema field
    });

    await Notification.create({
      email: appointment.email,
      message: `Your appointment with Dr. ${doctorName} is confirmed for ${time}.`,
    });

    req.app.get("io")?.emit("newNotification", {
      email: appointment.email,
      message: `Your appointment with Dr. ${doctorName} is confirmed for ${time}.`,
    });

    res.send(`
      <h2>✅ Appointment Confirmed for ${time}</h2>
      <p>Email confirmation sent to the patient.</p>
    `);
  } catch (error) {
    console.error("❌ Error confirming appointment:", error);
    res.status(500).send("Server Error");
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
      return res.status(404).json({ message: "No confirmed appointments found." });
    }

    res.status(200).json(appointments);
  } catch (error) {
    console.error("❌ Error fetching appointments by email:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
