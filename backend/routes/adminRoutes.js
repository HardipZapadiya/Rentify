const express = require('express');
const router = express.Router();
const {
  getCustomers, getAllBookings, updateBookingStatus, updatePaymentStatus,
  getCoupons, createCoupon, updateCoupon, deleteCoupon, validateCoupon,
  getReviews, deleteReview
} = require('../controllers/AdminController');
const { protect, admin } = require('../middlewares/auth');

// All admin routes require authentication + admin role
router.use(protect, admin);

// Customers
router.get('/customers', getCustomers);

// Bookings
router.get('/bookings', getAllBookings);
router.put('/bookings/:id/status', updateBookingStatus);
router.put('/bookings/:id/payment', updatePaymentStatus);

// Coupons
router.route('/coupons').get(getCoupons).post(createCoupon);
router.route('/coupons/:id').put(updateCoupon).delete(deleteCoupon);

// Reviews
router.route('/reviews').get(getReviews);
router.delete('/reviews/:id', deleteReview);

module.exports = router;
