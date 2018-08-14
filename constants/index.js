exports.userFields = [
  '_id',
  'email',
  'firstName',
  'lastName',
  'birthdate',
  'phoneNumber',
  'createdAt',
  'updatedAt',
];

exports.passwordPattern = '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$';
exports.namePattern = '^[a-zA-ZÀ-ž][\\sa-zA-ZÀ-ž]*$';
