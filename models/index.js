const User = require('./User');
const Weekday = require('./Weekday');
const Workout = require('./Workout');

User.hasMany(Workout, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// Weekday.hasOne('Workout', {
//   foreignKey: 'weekday_id',
//   onDelete: 'CASCADE'
// })

Workout.belongsTo(User, {
  foreignKey: 'user_id'
});

// Workout.belongsTo(Weekday, {
//   foreignKey: 'weekday_id'
// });



module.exports = { User, Workout };
