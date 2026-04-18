const { sequelize } = require('./config/db');
const User = require('./models/User');
const Car = require('./models/Car');
const Booking = require('./models/Booking');
const Review = require('./models/Review');
const Coupon = require('./models/Coupon');
const Notification = require('./models/Notification');
const ContactMessage = require('./models/ContactMessage');

const syncDB = async () => {
  try {
    // Relationship Mapping
    User.hasMany(Booking, { foreignKey: 'user_id' });
    Booking.belongsTo(User, { foreignKey: 'user_id' });
    Car.hasMany(Booking, { foreignKey: 'car_id' });
    Booking.belongsTo(Car, { foreignKey: 'car_id' });
    
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    
    await sequelize.sync({ alter: true });
    console.log('Database models synced and tables created.');
  } catch (err) {
    console.error('Unable to sync database:', err);
  } finally {
    process.exit();
  }
};

syncDB();
