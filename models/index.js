const User = require('./User');
const Workout = require('./Workout');

User.hasOne(Workout, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Workout.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = { User, Workout };
