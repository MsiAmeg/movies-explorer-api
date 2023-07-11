const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 450,
  message: () => {
    const err = { message: 'Too many requests, please try again later' };
    return err;
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = limiter;
