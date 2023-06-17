const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, SECRET_KEY } = process.env;

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

const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name,
    }))
    .then((user) => {
      const userParsed = {
        email,
        name: user.name,
      };
      res.status(201).send({ data: userParsed });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('login or password incorrect');
      }
      return bcrypt.compare(password, user.password)
        .then((isValid) => {
          if (!isValid) {
            throw new UnauthorizedError('login or password incorrect');
          }
          const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? SECRET_KEY : config.SECRET_KEY, { expiresIn: '7d' });
          if (NODE_ENV === 'production') {
            return res.status(200).cookie('jwt', token, {
              maxAge: 3600000 * 24 * 7,
              httpOnly: true,
              domain: '.rekunir.diplom.nomoredomains.rocks',
            }).send({ _id: user._id });
          }

          return res.status(200).cookie('jwt', token, config.COOKIE_OPTIONS).send({ _id: user._id });
        });
    })
    .catch(next);
};

const signout = (req, res, next) => {
  try {
    return res.status(200).clearCookie('jwt').send({ message: 'cookie cleared successful' });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  getUserMe,
  patchUserMe,
  createUser,
  login,
  signout,
};
