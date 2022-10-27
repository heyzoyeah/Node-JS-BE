'use strict';
const {
  Model
} = require('sequelize');
 
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // bạn bè, hội viên, kết hợp, người phụ tá, kết giao định danh các mối quan hệ here
    }
  }
  History.init({
    patientid: DataTypes.INTEGER,
    doctorid: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    files: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'History',
  });
  return History;
};