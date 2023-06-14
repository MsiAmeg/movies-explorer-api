const { Joi } = require('celebrate');
const config = require('../config');

const createMovieRules = {
  body: Joi.object().keys({
    country: Joi.string().required().min(2).max(30),
    director: Joi.string().required().min(2).max(30),
    duration: Joi.number().required(),
    year: Joi.string().required().min(2).max(30),
    description: Joi.string().required().min(2).max(300),
    image: Joi.string().required().pattern(new RegExp(config.URL_PATTERN)),
    trailerLink: Joi.string().required().pattern(new RegExp(config.URL_PATTERN)),
    thumbnail: Joi.string().required().pattern(new RegExp(config.URL_PATTERN)),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().min(2).max(30),
    nameEN: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(new RegExp(config.URL_PATTERN)),
  }),
};
module.exports = createMovieRules;
