import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use 'gmail' or another service provider
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail ID from .env
        pass: process.env.EMAIL_PASS, // Your App Password from .env
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "your_target_email@example.com", // Change this to the recipient email
      subject: "New Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);
    res.json({ message: "Email sent successfully!" });

  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email." });
  }
});

export default router;
