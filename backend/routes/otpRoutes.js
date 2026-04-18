const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Temporary in-memory OTP storage (In production, use Redis or DB with expiry)
const otps = {};

const sendOTPEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Rentify OTP Verification Code',
    text: `Your OTP is: ${otp}. It expires in 5 minutes.`
  };

  await transporter.sendMail(mailOptions);
};

router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: 'Email is required' });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otps[email] = { otp, expires: Date.now() + 300000 };

  try {
    await sendOTPEmail(email, otp);
    res.json({ success: true, message: 'OTP sent to your email' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to send OTP' });
  }
});

router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  const stored = otps[email];

  if (stored && stored.otp === otp && stored.expires > Date.now()) {
    delete otps[email];
    res.json({ success: true, message: 'OTP verified' });
  } else {
    res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
  }
});

module.exports = router;
