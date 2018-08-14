const errors = require('boom');

const errorMessages = require('../constants/errors');

const isAdmin = user => user.admin;

const isUserOwner = (resource, user) => user.equals(resource);

/*
* Check if user is admin
*/
exports.verifyAdmin = (req, res, next) => (
  isAdmin(req.user)
    ? next()
    : next(errors.forbidden(errorMessages.OnlyAdminAllowedError))
);

/*
* Check user is not an admin
*/
exports.verifyNotAdmin = (req, res, next) => (
  !isAdmin(req.user)
    ? next()
    : next(new errors.Forbidden(errorMessages.AdminNotAllowedError))
);

/*
* Check if user is the same user requested as resource
*/
exports.verifyUser = (req, res, next) => (
  isAdmin(req.user) || isUserOwner(req.userResource, req.user)
    ? next()
    : next(errors.forbidden(errorMessages.ForbiddenActionError))
);
