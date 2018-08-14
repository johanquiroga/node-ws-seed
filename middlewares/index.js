const errors = require('boom');

const constants = require('../constants');
const errorMessages = require('../constants/errors');
const User = require('../models/user');

const authenticate = require('./authenticate');
const authorization = require('./authorization');

/*
* Search requested user and load it to request object
*/
const loadUser = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId, constants.userFields.join(' '))
      .populate('roles');

    if (!user) {
      return next(errors.notFound(errorMessages.UserNotFound.replace(':userId', userId)));
    }

    req.userResource = user;
    return next();
  } catch (err) {
    return next(errors.boomify(err));
  }
};

module.exports = {
  authenticate,
  authorization,
  misc: {
    loadUser,
  },
};
