const Contact = require('../models/contact');
const nodemailer = require('nodemailer');
require('dotenv').config();

const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validate fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Save to MongoDB
    const newContact = new Contact({ name, email, subject, message });
    await newContact.save();

    // Configure transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL || 'ayurcure63@gmail.com',
      replyTo: email,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: 'Message saved and email sent successfully!' });
  } catch (error) {
    console.error('Error in contact submission:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { submitContact };
