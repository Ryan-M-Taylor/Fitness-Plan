const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Workout extends Model {}

Workout.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    workout_time: {
      type: DataTypes.DECIMAL
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    monday: {
      type: DataTypes.STRING,
    },
    tuesday: {
      type: DataTypes.STRING,
    },
    wednesday: {
      type: DataTypes.STRING,
    },
    thursday: {
      type: DataTypes.STRING,
    },
    friday: {
      type: DataTypes.STRING,
    },
    saturday: {
      type: DataTypes.STRING,
    },
    sunday: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'workout',
  }
);

module.exports = Workout;
