const router = require('express').Router();
const { Workout, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all Workouts and JOIN with user data
    const userData = await User.findAll({
      include: [
        {
          model: Workout,
          attributes: ['workout', 'workout_time'],
        },
      ],
    });

    // Serialize data so the template can read it
    const users = userData.map((user) => user.get({ plain: true }));
    console.log(users)
    // Pass serialized data and session flag into template
    res.render('homepage', {
      users,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/workout/:id', async (req, res) => {
  try {
    const workoutData = await Workout.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const workout = workoutData.get({ plain: true });

    res.render('Workout', {
      ...workout,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Workout }],
    });

    const user = userData.get({ plain: true });
    // filter workout data to check if there is data for particular day, then plug into object array
    // const filter = function output
    //     const someData =[ {
    //       day: "Monday",
    //       data: filter,
    //       workoutL 
    //     },
    //     {
    //       day: "Tuesday",
    //       data: "data"
    //     }
    //     ]

    
    console.log(user);
    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
