const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Weekday extends Model {}

Weekday.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // name: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    day: {
      type: DataTypes.STRING,
    },
    // workout_id: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //     model: 'workout',
    //     key: 'id',
    //   },
    // },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'weekday',
  }
);

module.exports = Weekday;
