const Joi = require('joi');

const accessToken = {
  body: Joi.object().keys({
    refreshToken: Joi.string().label('refresh token'),
  }),
};

module.exports = {
  accessToken,
};
