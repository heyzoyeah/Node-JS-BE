'use strict';
const {
  Model
} = require('sequelize');
 
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // bạn bè, hội viên, kết hợp, người phụ tá, kết giao định danh các mối quan hệ here
    }
  }
  Booking.init({
    statusId: DataTypes.STRING,
    doctorId: DataTypes.INTEGER,
    patientid: DataTypes.INTEGER,
    date: DataTypes.STRING,
    timeType: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};