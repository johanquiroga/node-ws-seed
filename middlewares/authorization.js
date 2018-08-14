const errors = require('boom');

const errorMessages = require('../constants/errors');

const isAdmin = user => user.admin;

const isUserOwner = (resource, user) => user.equals(resource);

exports.verifyAdmin = (req, res, next) => (
  isAdmin(req.user)
    ? next()
    : next(errors.forbidden(errorMessages.OnlyAdminAllowedError))
);

exports.verifyNotAdmin = (req, res, next) => (
  !isAdmin(req.user)
    ? next()
    : next(new errors.Forbidden(errorMessages.AdminNotAllowedError))
);

exports.verifyUser = (req, res, next) => (
  isAdmin(req.user) || isUserOwner(req.userResource, req.user)
    ? next()
    : next(errors.forbidden(errorMessages.ForbiddenActionError))
);
