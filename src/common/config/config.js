const dotenv = require("dotenv");

dotenv.config();

const config = {
  get port() {
    return process.env.PORT;
  },
  get url() {
    return process.env.URL;
  },
  get hashRound() {
    return process.env.HASH_ROUNDS;
  },
  jwt: {
    get secret() {
      return process.env.JWT_SECRET;
    },
    get refreshSecret() {
      return process.env.JWT_REFRESH_SECRET;
    },
    get accessExpirationMinutes() {
      return process.env.JWT_ACCESS_EXPIRATION_MINUTES;
    },
    get refreshExpirationDays() {
      return process.env.JWT_REFRESH_EXPIRATION_DAYS;
    },
    get resetPasswordExpirationMinutes() {
      return process.env.JWT_RESET_PASSWORD_EXPIRATION_MINUTES;
    },
    get verifyEmailExpirationMinutes() {
      return process.env.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES;
    },
  },
  get aesEncryptDcryptKey() {
    return process.env.ENCRYPTION_KEY;
  },

  typeorm: {
    host: process.env.SQL_DB_HOST,
    port: process.env.SQL_DB_PORT,
    username: process.env.SQL_DB_USER,
    password: process.env.SQL_DB_PASS,
    database: process.env.SQL_DB_NAME,
  },

  
};

module.exports = config;