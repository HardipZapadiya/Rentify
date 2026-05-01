const { ContactMessage } = require('../models');

// @desc    Submit a contact message
// @route   POST /api/contact
const submitContactMessage = async (req, res) => {
  const { name, email, phone, subject, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Name, email and message are required' });
  }
  try {
    const newMessage = await ContactMessage.create({ name, email, phone, subject, message });
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all contact messages (Admin)
// @route   GET /api/contact
const getAllContactMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.findAll({ order: [['created_at', 'DESC']] });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mark message as read (Admin)
// @route   PUT /api/contact/:id/read
const markMessageRead = async (req, res) => {
  try {
    const msg = await ContactMessage.findByPk(req.params.id);
    if (!msg) return res.status(404).json({ message: 'Message not found' });
    msg.is_read = true;
    await msg.save();
    res.json({ message: 'Marked as read' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { submitContactMessage, getAllContactMessages, markMessageRead };
