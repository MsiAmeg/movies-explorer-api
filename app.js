require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { celebrate, errors } = require('celebrate');
const config = require('./config');
const { login, createUser } = require('./controllers/user');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { signInRules, signUpRules } = require('./validationRules/auth');
const limiter = require('./middlewares/limiter');
const NotFoundError = require('./errors/NotFoundError');

const { NODE_ENV, PORT, DB_CONNECT } = process.env;

const app = express();

mongoose.connect(NODE_ENV === 'production' ? DB_CONNECT : config.DB_CONNECT);

app.use(cors(config.CORS_OPTIONS));
app.options('*', cors());

app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(limiter);

app.use(requestLogger);

app.use('/signin', celebrate(signInRules), login);
app.use('/signup', celebrate(signUpRules), createUser);

app.use(require('./middlewares/auth'));

app.use('/users', require('./routes/user'));
app.use('/movies', require('./routes/movie'));

app.use('*', ((req, res, next) => {
  const err = new NotFoundError('invalid url');
  return next(err);
}));

app.use(errorLogger);
app.use(errors());
app.use(require('./middlewares/error'));

app.listen(NODE_ENV === 'production' ? PORT : config.PORT);
