const { Booking, Car, User, Review } = require('../models');
const { Op } = require('sequelize');
const sendEmail = require('../utils/sendEmail');

const includeOptions = [
  { model: Car, as: 'car', attributes: ['car_id', 'name', 'brand', 'image_url', 'price_per_day', 'car_type', 'seats', 'model_year', 'address', 'delivery_fee'] },
  { model: User, as: 'user', attributes: ['user_id', 'name', 'email', 'phone_number'] }
];

// @desc    Create a booking
// @route   POST /api/bookings
// @access  Private
const createBooking = async (req, res) => {
  const { car_id, start_date, end_date, total_days, pickup_location, drop_location,
    total_price, discount_amount, final_price, coupon_code, payment_method } = req.body;
  try {
    const car = await Car.findByPk(car_id);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    if (car.status === 'Maintenance') return res.status(400).json({ message: 'Car is currently under maintenance' });

    // Check for overlapping bookings
    const overlapping = await Booking.findOne({
      where: {
        car_id,
        booking_status: { [Op.ne]: 'Cancelled' },
        [Op.and]: [
          { start_date: { [Op.lte]: end_date } },
          { end_date: { [Op.gte]: start_date } }
        ]
      }
    });

    if (overlapping) {
      return res.status(400).json({ 
        message: `Already booked on date ${overlapping.start_date} to ${overlapping.end_date}` 
      });
    }

    const booking = await Booking.create({
      user_id: req.user.user_id, car_id, start_date, end_date,
      total_days: total_days || 1,
      pickup_location, drop_location,
      is_permanent_location: req.body.is_permanent_location || false,
      delivery_fee: req.body.delivery_fee || 0,
      total_price, discount_amount: discount_amount || 0,
      final_price: final_price || total_price,
      coupon_code, payment_method: payment_method || 'Cash',
      payment_status: 'Unpaid', booking_status: 'Pending'
    });

    // car.status = 'Booked'; // Removed to allow multiple bookings on different dates
    // await car.save();

    // Send confirmation email
    try {
      await sendEmail({
        email: req.user.email,
        subject: 'Booking Confirmed — Rentify',
        html: `<h2>Booking Confirmed!</h2><p>Your booking for <strong>${car.brand} ${car.name}</strong> has been received.</p>
               <p>Pickup: ${start_date} | Return: ${end_date}</p>
               <p>Total: Rs. ${final_price || total_price}</p>
               <p>Thank you for choosing Rentify!</p>`
      });
    } catch (mailErr) { console.error('Email send failed:', mailErr.message); }

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged-in user's bookings
// @route   GET /api/bookings/my
// @access  Private
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      where: { user_id: req.user.user_id },
      include: includeOptions,
      order: [['created_at', 'DESC']]
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a single booking by ID
// @route   GET /api/bookings/:id
// @access  Private
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      where: { booking_id: req.params.id },
      include: includeOptions
    });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    // Allow owner or admin
    if (booking.user_id !== req.user.user_id && req.user.role !== 'Admin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Cancel booking (customer)
// @route   PUT /api/bookings/:id/cancel
// @access  Private
const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      where: { booking_id: req.params.id, user_id: req.user.user_id }
    });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    if (!['Pending', 'Confirmed'].includes(booking.booking_status)) {
      return res.status(400).json({ message: 'Cannot cancel this booking' });
    }
    booking.booking_status = 'Cancelled';
    await booking.save();
    // Free up the car logic removed to support multi-booking by dates
    // await Car.update({ status: 'Available' }, { where: { car_id: booking.car_id } });
    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Submit a review for a completed booking
// @route   POST /api/bookings/review
// @access  Private
const submitReview = async (req, res) => {
  const { bookingId, rating, comment } = req.body;
  try {
    const booking = await Booking.findOne({
      where: { booking_id: bookingId, user_id: req.user.user_id, booking_status: 'Completed' }
    });
    if (!booking) return res.status(404).json({ message: 'Booking not found or not eligible for review' });

    const existing = await Review.findOne({ where: { booking_id: bookingId } });
    if (existing) return res.status(400).json({ message: 'Review already submitted for this booking' });

    const review = await Review.create({
      user_id: req.user.user_id,
      car_id: booking.car_id,
      booking_id: bookingId,
      rating,
      comment
    });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all bookings (Admin)
// @route   GET /api/bookings
// @access  Admin
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: includeOptions,
      order: [['created_at', 'DESC']]
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update booking status (Admin)
// @route   PUT /api/bookings/:id/status
// @access  Admin
const updateBookingStatus = async (req, res) => {
  const { status } = req.body;
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    booking.booking_status = status || booking.booking_status;
    // car.status update logic removed
    await booking.save();
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get admin dashboard stats
// @route   GET /api/bookings/admin/stats
// @access  Admin
const getAdminStats = async (req, res) => {
  try {
    const totalBookings = await Booking.count();
    const totalUsers = await User.count({ where: { role: 'Customer' } });
    const paidBookings = await Booking.findAll({ where: { payment_status: 'Paid' } });
    const totalRevenue = paidBookings.reduce((sum, b) => sum + parseFloat(b.final_price || 0), 0);
    const totalCars = await Car.count();
    const activeCars = await Car.count({ 
      where: { 
        status: { [Op.notIn]: ['Maintenance', 'Service'] } 
      } 
    });
    res.json({ totalBookings, totalUsers, totalRevenue, totalCars, activeCars });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get recent bookings for dashboard
// @route   GET /api/bookings/admin/recent
// @access  Admin
const getRecentBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: includeOptions,
      order: [['created_at', 'DESC']],
      limit: 10
    });
    // Flatten for dashboard table
    const result = bookings.map(b => ({
      booking_id: b.booking_id,
      user_name: b.user?.name,
      car_name: `${b.car?.brand} ${b.car?.name}`,
      start_date: b.start_date,
      end_date: b.end_date,
      total_price: b.final_price,
      status: b.booking_status
    }));
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBooking, getMyBookings, getBookingById, cancelBooking,
  submitReview, getAllBookings, updateBookingStatus,
  getAdminStats, getRecentBookings
};
