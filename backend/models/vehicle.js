const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Vehicle = sequelize.define('Vehicle', {
    vehicle_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    plate_number: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    brand_model: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    tc_identity_number: {
      type: DataTypes.STRING(11),
      allowNull: false,
    },
  }, {
    tableName: 'Vehicles',
    timestamps: false,
  });
  return Vehicle;
}; 