const Movie = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .orFail(new NotFoundError('movies not found'))
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => res.status(201).send({ data: movie }))
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const { movieId } = req.params;
  const { _id } = req.user;

  Movie.findById({ _id: movieId })
    .then((movie) => {
      if (!movie) throw new NotFoundError('movies not found');
      if (!(movie.owner.toString() === _id)) throw new ForbiddenError('access to delete card denied');
      return movie.deleteOne({})
        .then((result) => {
          res.send({ data: result });
        });
    })
    .catch(next);
};

module.exports = { getMovies, createMovie, deleteMovie };
