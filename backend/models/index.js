const User = require('./User');
const Car = require('./Car');
const Booking = require('./Booking');
const Review = require('./Review');
const Coupon = require('./Coupon');
const Notification = require('./Notification');
const ContactMessage = require('./ContactMessage');
const UserDocument = require('./UserDocument');
const CityPoint = require('./CityPoint');


// User - Booking Association
User.hasMany(Booking, { foreignKey: 'user_id', as: 'bookings' });
Booking.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// Car - Booking Association
Car.hasMany(Booking, { foreignKey: 'car_id', as: 'bookings' });
Booking.belongsTo(Car, { foreignKey: 'car_id', as: 'car' });

// User - Review Association
User.hasMany(Review, { foreignKey: 'user_id', as: 'reviews' });
Review.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// Car - Review Association
Car.hasMany(Review, { foreignKey: 'car_id', as: 'reviews' });
Review.belongsTo(Car, { foreignKey: 'car_id', as: 'car' });

// User - Notification Association
User.hasMany(Notification, { foreignKey: 'user_id', as: 'notifications' });
Notification.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

// User - UserDocument Association
User.hasOne(UserDocument, { foreignKey: 'user_id', as: 'documents' });
UserDocument.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = {
  User,
  Car,
  Booking,
  Review,
  Coupon,
  Notification,
  ContactMessage,
  UserDocument,
  CityPoint
};

