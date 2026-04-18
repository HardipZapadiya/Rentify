const { User, Booking, Car, Review, Coupon, ContactMessage } = require('../models');
const { Op } = require('sequelize');

const includeBookingOptions = [
  { model: Car, as: 'car', attributes: ['car_id', 'name', 'brand', 'image_url'] },
  { model: User, as: 'user', attributes: ['user_id', 'name', 'email', 'phone_number'] }
];

// ================== CUSTOMERS ==================

// @desc    Get all customers
// @route   GET /api/admin/customers
const getCustomers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['created_at', 'DESC']]
    });
    res.json(users);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// ================== BOOKINGS ==================

// @desc    Get all bookings (admin view, with User & Car)
// @route   GET /api/admin/bookings
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: includeBookingOptions,
      order: [['created_at', 'DESC']]
    });
    res.json(bookings);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// @desc    Update booking status (admin)
// @route   PUT /api/admin/bookings/:id/status
const updateBookingStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    booking.booking_status = status;
    if (['Completed', 'Cancelled'].includes(status)) {
      await Car.update({ status: 'active' }, { where: { car_id: booking.car_id } });
    }
    await booking.save();
    res.json(booking);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// @desc    Update payment status (admin)
// @route   PUT /api/admin/bookings/:id/payment
const updatePaymentStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    booking.payment_status = status || 'Paid';
    await booking.save();
    res.json(booking);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// ================== COUPONS ==================

// @desc    Get all coupons
// @route   GET /api/admin/coupons
const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.findAll({ order: [['createdAt', 'DESC']] });
    res.json(coupons);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// @desc    Create coupon
// @route   POST /api/admin/coupons
const createCoupon = async (req, res) => {
  const { code, discount_percent, expiry_date, is_active } = req.body;
  try {
    const coupon = await Coupon.create({ code: code.toUpperCase(), discount_percent, expiry_date, is_active });
    res.status(201).json(coupon);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// @desc    Update coupon
// @route   PUT /api/admin/coupons/:id
const updateCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByPk(req.params.id);
    if (!coupon) return res.status(404).json({ message: 'Coupon not found' });
    await coupon.update(req.body);
    res.json(coupon);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// @desc    Delete coupon
// @route   DELETE /api/admin/coupons/:id
const deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByPk(req.params.id);
    if (!coupon) return res.status(404).json({ message: 'Coupon not found' });
    await coupon.destroy();
    res.json({ message: 'Coupon deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// Validate coupon (customer use)
const validateCoupon = async (req, res) => {
  const { code } = req.body;
  try {
    const coupon = await Coupon.findOne({
      where: {
        code: code.toUpperCase(),
        is_active: true,
        [Op.or]: [
          { expiry_date: null },
          { expiry_date: { [Op.gte]: new Date() } }
        ]
      }
    });
    if (!coupon) return res.status(404).json({ message: 'Invalid or expired coupon' });
    res.json({ discount_percent: coupon.discount_percent, code: coupon.code });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// ================== REVIEWS ==================

// @desc    Get all reviews (admin)
// @route   GET /api/admin/reviews
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      include: [
        { model: User, as: 'user', attributes: ['name'] },
        { model: Car, as: 'car', attributes: ['name', 'brand'] }
      ],
      order: [['created_at', 'DESC']]
    });
    res.json(reviews);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// @desc    Delete review (admin)
// @route   DELETE /api/admin/reviews/:id
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    await review.destroy();
    res.json({ message: 'Review deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// ================== CONTACT MESSAGES ==================

// @desc    Get all contact messages
// @route   GET /api/contact — handled in contactRoutes
// (exposed here for reuse if needed)

module.exports = {
  getCustomers, getAllBookings, updateBookingStatus, updatePaymentStatus,
  getCoupons, createCoupon, updateCoupon, deleteCoupon, validateCoupon,
  getReviews, deleteReview
};
