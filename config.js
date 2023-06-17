const config = {
  DB_CONNECT: 'mongodb://localhost:27017/bitfilmsdb',
  PORT: 3000,
  URL_PATTERN: "^https?:\\/\\/(www.)?[\\da-zA-Z\\-\\.\\_\\~\\:\\/\\?\\#\\[\\]@\\!\\$\\&\\'\\(\\)\\*\\,\\;\\=]{2,}#?$",
  SECRET_KEY: '8924c2c6c6792d5e3355ee3f6a6b5a817b9d00b8',
  DEFAULT_ALLOWED_METHODS: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  ALLOWED_CORS: [
    'https://api.rekunir.diplom.nomoredomains.rocks',
    'https://rekunir.diplom.nomoredomains.rocks',
    'http://localhost:3000',
  ],
  CORS_OPTIONS: {
    origin: [
      'https://api.rekunir.diplom.nomoredomains.rocks',
      'https://rekunir.diplom.nomoredomains.rocks',
      'http://localhost:3000',
    ],
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    credentials: true,
    optionsSuccessStatus: 204,
  },
  COOKIE_OPTIONS: {
    maxAge: 3600000 * 24 * 7,
    httpOnly: false,
  },
};

module.exports = config;
