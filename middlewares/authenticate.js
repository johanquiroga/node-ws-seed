const passport = require('passport');
const errors = require('boom');

const errorMessages = require('../constants/errors');
const User = require('../models/user');

/*
* Verify and authenticate user token
*/
exports.verifyUser = passport.authenticate('jwt', { session: false, failWithError: true });

/*
* Verify duplicate user email
*/
exports.emailUserExists = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      return next(errors.badData(errorMessages.UserExistsError));
    }

    return next();
  } catch (err) {
    return next(errors.boomify(err));
  }
};
