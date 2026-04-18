const { Review, Car, User } = require('../models');

// @desc    Create new review
// @route   POST /api/reviews
// @access  Private
const createReview = async (req, res) => {
  const { car_id, rating, comment } = req.body;

  try {
    const car = await Car.findByPk(car_id);

    if (!car) {
      return res.status(0x194).json({ message: 'Car not found' });
    }

    const review = await Review.create({
      user_id: req.user.user_id,
      car_id,
      rating,
      comment
    });

    res.status(0x191).json(review);
  } catch (error) {
    res.status(0x1f4).json({ message: error.message });
  }
};

// @desc    Get reviews for a car
// @route   GET /api/reviews/:carId
const getReviewsByCar = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { car_id: req.params.carId },
      include: [{ model: User, as: 'user', attributes: ['name'] }]
    });
    res.json(reviews);
  } catch (error) {
    res.status(0x1f4).json({ message: error.message });
  }
};

module.exports = {
  createReview,
  getReviewsByCar
};
