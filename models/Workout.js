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
    // name: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    workout: {
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
    weekday: {
      type: DataTypes.STRING
    }
    // monday: {
    //   type: DataTypes.STRING,
    // },
    // tuesday: {
    //   type: DataTypes.STRING,
    // },
    // wednesday: {
    //   type: DataTypes.STRING,
    // },
    // thursday: {
    //   type: DataTypes.STRING,
    // },
    // friday: {
    //   type: DataTypes.STRING,
    // },
    // saturday: {
    //   type: DataTypes.STRING,
    // },
    // sunday: {
    //   type: DataTypes.STRING,
    // },
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


/**
 * {
 *    id: 1,
 *    name: string,
 *     monday: {
 *        time: date-string;
 *         description: string;

 *    },
        tues: {

        }
 * 
 * }
 * 
 */

/**
 * workouts: [
 *   {
 *      workout_id: 1,
 *     user_id: 99,
 *      weekday: Monday,
 *      duration: 599s
 *      description: 
 *   },
 *   {
 *     weekday:: Sunday,
 *     workout_id: 4,
 *     user_id: 99,
 *   }
 * ]
 */

// const weekdays = ['Monday', 'Tuesday', 'Wednesday']

// weekdays.forEach(() => {


