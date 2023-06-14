const router = require('express').Router();
const { celebrate } = require('celebrate');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movie');
const movieRules = require('../validationRules/createMovie');
const movieIdRules = require('../validationRules/movieId');

router.get('/', getMovies);
router.post('/', celebrate(movieRules), createMovie);
router.delete('/:movieId', celebrate(movieIdRules), deleteMovie);

module.exports = router;
