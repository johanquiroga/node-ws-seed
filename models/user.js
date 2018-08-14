const mongoose = require('mongoose');
const validate = require('mongoose-validator');
const validator = require('validator');
const sanitizerPlugin = require('mongoose-sanitizer-plugin');
const moment = require('moment');
const { isValidNumber } = require('libphonenumber-js');
const { namePattern, passwordPattern } = require('../constants');

const { Schema } = mongoose;

const firstNameValidator = [
  validate({
    validator: 'matches',
    arguments: [namePattern, 'g'],
    message: 'First name must not contain numbers',
    httpStatus: 422,
  }),
];

const lastNameValidator = [
  validate({
    validator: 'matches',
    arguments: [namePattern, 'g'],
    message: 'Last name must not contain numbers',
    httpStatus: 422,
  }),
];

const emailValidator = [
  validate({
    validator: 'isEmail',
    message: 'Please enter a valid E-mail',
    httpStatus: 422,
  }),
];

const passwordValidator = (password, cb) => {
  if (validator.isEmpty(password)) {
    return cb({
      code: 422,
      message: 'Password is required to register',
    });
  }

  if (!validator.isLength(password, { min: 8 })) {
    return cb({
      code: 422,
      message: 'Password must be at least 8 characters long',
    });
  }

  if (!validator.matches(password, passwordPattern, 'g')) {
    return cb({
      code: 422,
      message: 'Enter a valid password: Must have at least an upper case letter and a number',
    });
  }

  return cb(null);
};

const phoneNumberValidator = [
  validate({
    validator(val) {
      return isValidNumber(val, 'CO');
    },
    message: 'Please enter a valid Phone Number',
    httpStatus: 422,
  }),
];

const birthdateValidator = [
  validate({
    validator(val) {
      const birthdate = moment(val);
      return moment().diff(birthdate, 'years') >= 18;
    },
    message: 'You must be at least 18 years old',
    httpStatus: 422,
  }),
];

const User = new Schema({
  firstName: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
    validate: firstNameValidator,
  },
  lastName: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
    validate: lastNameValidator,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    validate: emailValidator,
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: phoneNumberValidator,
  },
  birthdate: {
    type: Date,
    required: true,
    validate: birthdateValidator,
  },
  passwordReset: {
    type: String,
    select: false,
  },
}, {
  timestamps: true,
});

User.plugin(sanitizerPlugin, {
  mode: 'sanitize',
});

module.exports = mongoose.model('User', User);
