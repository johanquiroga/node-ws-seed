const express = require('express');
const passport = require('passport');
const errors = require('boom');
const cors = require('./cors');
const authenticate = require('../lib/authenticate');
const middlewares = require('../middlewares');

const errorMessages = require('../constants/errors');
const User = require('../models/user');

const router = express.Router();
router.use(express.json());

router.all('*', (req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  next();
});

router.options('*', cors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
});

router.post(
  '/register',
  cors.corsWithOptions,
  middlewares.authenticate.emailUserExists,
  async (req, res, next) => {
    try {
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        birthdate: req.body.birthdate,
        phoneNumber: req.body.phoneNumber,
      });

      await User.register(newUser, req.body.password);

      return passport.authenticate('local', { session: false, failWithError: true })(req, res, async () => {
        if (!req.user) {
          return next(errors.boomify(new Error(), { message: errorMessages.RegisterUserError }));
        }

        const token = authenticate.getToken({ _id: req.user._id });

        return res.json({
          success: true,
          user: req.user,
          token,
          message: 'Registration Successful',
        });
      });
    } catch (err) {
      return next(errors.badData(err.message));
    }
  },
);

router.post(
  '/login',
  cors.corsWithOptions,
  passport.authenticate('local', { session: false, failWithError: true }),
  (req, res, next) => {
    const { user } = req;
    const token = authenticate.getToken({ _id: user._id });
    return res.json({
      success: true,
      user,
      token,
      message: 'Successful log in',
    });
  },
  (err, req, res, next) => next(errors.unauthorized(errorMessages.LoginUserError)),
);

router.post(
  '/logout',
  cors.corsWithOptions,
  middlewares.authenticate.verifyUser,
  (req, res, next) => {
    if (req.user) {
      req.logout();
      return res.json({ success: true, user: {}, status: 'Successful log out' });
    }

    return next(errors.unauthorized(errorMessages.UserNotLoggedIn));
  },
);

module.exports = router;
