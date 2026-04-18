const sendEmail = require('./utils/sendEmail');
require('dotenv').config();

const testEmail = async () => {
  try {
    await sendEmail({
      email: process.env.EMAIL_USER,
      subject: 'Rentify - Mail Service Test',
      message: 'This is a test email to verify the connection. If you receive this, Nodemailer is working correctly!',
      html: '<h1>Rentify Connectivity Test</h1><p>Nodemailer is working correctly!</p>'
    });
    console.log('Test email task completed successfully.');
  } catch (err) {
    console.error('Email test failed:', err);
  } finally {
    process.exit();
  }
};

testEmail();
