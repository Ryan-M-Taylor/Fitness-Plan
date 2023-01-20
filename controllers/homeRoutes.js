const router = require("express").Router();
const { where } = require("sequelize");
const { Workout, User } = require("../models");
const withAuth = require("../utils/auth");

// router.get('/', async (req, res) => {
//   try {
//     // Get all Workouts and JOIN with user data
//     const workoutData = await Workout.findAll({
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     // Serialize data so the template can read it
//     const workouts = workoutData.map((workout) => workout.get({ plain: true }));

//     // Pass serialized data and session flag into template
//     res.render('homepage', {
//       workouts,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

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
      );
      console.log(totalWorkoutTime);
      users[i].total_time = totalWorkoutTime;
    }

    // console.log(users[0].workouts[0].workout_time)
    // Pass serialized data and session flag into template
    res.render("homepage", {
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//presents user with workouts that match the users id
router.get("/workout/:id", async (req, res) => {
  try {
    const workoutData = await Workout.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
    });
    
    const workout = workoutData.get({ plain: true });

    res.render("Workout", {
      ...workout,
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

    const weekDays = [{ weekday: 'Monday', id: 1 }, { weekday: 'Tuesday', id: 2 },
    { weekday: 'Wednesday', id: 3 }, { weekday: 'Thursday', id: 4 }, { weekday: 'Friday', id: 5 },
    { weekday: 'Saturday', id: 6 }, { weekday: 'Sunday', id: 7 }];

    const user = userData.get({ plain: true });

    res.render('user', {
      ...user,
      weekDays,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get("/profile", withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Workout }],
    });

    const user = userData.get({ plain: true });
    // console.log(user.workouts)
    const weekDays = [{ weekday: 'Monday', id: 1 }, { weekday: 'Tuesday', id: 2 },
    { weekday: 'Wednesday', id: 3 }, { weekday: 'Thursday', id: 4 }, { weekday: 'Friday', id: 5 },
    { weekday: 'Saturday', id: 6 }, { weekday: 'Sunday', id: 7 }];

    const order = { Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6, Sunday: 7 };

    user.workouts.sort(function (a, b) {
      return order[a.weekday] - order[b.weekday];
    });
    // filter workout data to check if there is data for particular day, then plug into object array
    // const filter = function output
    // const workoutDays = user.workouts.map((workout) => workout.weekday);
    // const displayedWorkouts = [];
    
    res.render('profile', {
      ...user,
      // workoutDays,
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
