const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');

const getUserMe = (req, res, next) => {
  const { _id } = req.user;

  User.findById({ _id })
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        throw new NotFoundError('user not found');
      }
    })
    .catch(next);
};

const patchUserMe = (req, res, next) => {
  const { _id } = req.user;

  User.findByIdAndUpdate(
    _id,
    req.body,
    { new: true, runValidators: true },
  )
    .orFail(new NotFoundError('user not found'))
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports = { getUserMe, patchUserMe };
