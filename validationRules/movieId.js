const { Joi } = require('celebrate');

const movieIdRules = {
  params: Joi.object().keys({
    movieId: Joi.string().hex().required().length(24),
  }),
};

module.exports = movieIdRules;
