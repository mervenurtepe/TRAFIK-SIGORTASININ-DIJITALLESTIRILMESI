const { Sequelize } = require('sequelize');
require('dotenv').config();
const mysql = require('mysql2/promise');

// Veritabanı yoksa oluştur
async function ensureDatabaseExists() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
  await connection.end();
}

function getSequelizeInstance() {
  return new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      logging: false,
    }
  );
}

function loadModels(sequelize) {
  const User = require('./user')(sequelize);
  const Vehicle = require('./vehicle')(sequelize);
  const Quote = require('./quote')(sequelize);
  const Payment = require('./payment')(sequelize);
  const Policy = require('./policy')(sequelize);
  const Feedback = require('./feedback')(sequelize);

  // İlişkiler
  User.hasMany(Vehicle, { foreignKey: 'user_id' });
  Vehicle.belongsTo(User, { foreignKey: 'user_id' });

  Vehicle.hasMany(Quote, { foreignKey: 'vehicle_id' });
  Quote.belongsTo(Vehicle, { foreignKey: 'vehicle_id' });

  User.hasMany(Payment, { foreignKey: 'user_id' });
  Payment.belongsTo(User, { foreignKey: 'user_id' });

  Quote.hasMany(Payment, { foreignKey: 'quote_id' });
  Payment.belongsTo(Quote, { foreignKey: 'quote_id' });

  Payment.hasOne(Policy, { foreignKey: 'payment_id' });
  Policy.belongsTo(Payment, { foreignKey: 'payment_id' });

  User.hasMany(Feedback, { foreignKey: 'user_id' });
  Feedback.belongsTo(User, { foreignKey: 'user_id' });

  return { User, Vehicle, Quote, Payment, Policy, Feedback };
}

module.exports = {
  ensureDatabaseExists,
  getSequelizeInstance,
  loadModels,
}; 