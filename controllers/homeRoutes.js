const router = require("express").Router();
const { where } = require("sequelize");
const { Workout, User } = require("../models");
const withAuth = require("../utils/auth");
const sortDays = require("../utils/sort");

router.get("/", async (req, res) => {
  try {
    // Get all Workouts and JOIN with user data
    const userData = await User.findAll({
      include: [
        {
          model: Workout,
          attributes: ["workout_time"],
        },
      ],
    });
    // Serialize data so the template can read it
    const users = userData.map((user) => user.get({ plain: true }));

    for (let i = 0; i < users.length; i++) {
      let totalWorkoutTime = 0;
      const workouts = users[i].workouts.map((workout) => workout.workout_time);
      // console.log(workouts)
      totalWorkoutTime = workouts.reduce(
        (a, b) => parseInt(a) + (parseInt(b) || 0),
        0
      ) / 60;

      const totalTimeRounded = Math.round(totalWorkoutTime * 100) / 100

      console.log(totalTimeRounded);
      users[i].total_time = totalTimeRounded;
    }

    // Pass serialized data and session flag into template
    res.render("homepage", {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      include: [
        {
          model: Workout,
          attributes: ['workout', 'workout_time', 'weekday'],
        },
      ],
    });

    const user = userData.get({ plain: true });

    const weekDays = [{ weekday: 'Monday', id: 1 }, { weekday: 'Tuesday', id: 2 },
    { weekday: 'Wednesday', id: 3 }, { weekday: 'Thursday', id: 4 }, { weekday: 'Friday', id: 5 },
    { weekday: 'Saturday', id: 6 }, { weekday: 'Sunday', id: 7 }];

    sortDays(user);

    res.render('user', {
      ...user,
      weekDays,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Workout }],
    });

    const user = userData.get({ plain: true });
    const weekDays = [{ weekday: 'Monday', id: 1 }, { weekday: 'Tuesday', id: 2 },
    { weekday: 'Wednesday', id: 3 }, { weekday: 'Thursday', id: 4 }, { weekday: 'Friday', id: 5 },
    { weekday: 'Saturday', id: 6 }, { weekday: 'Sunday', id: 7 }];

    sortDays(user);
    res.render('profile', {
      ...user,
      weekDays,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

module.exports = router;
