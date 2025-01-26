const httpStatus = require('http-status');
const config = require('../../../common/config/config');
const { create_jwt_token } = require('../../../common/utils/jwt/create_token');
const { validate_token } = require('../../../common/utils/jwt/validate_token');


exports.generateTokens = async (payload) => {
  const accessToken = await create_jwt_token(config.jwt.secret, config.jwt.accessExpirationMinutes + 'h', payload);
  return {accessToken};
};

exports.isValidRefreshToken = async (refreshToken) => {
  let payload;
  try {
    payload = await validate_token(refreshToken, config.jwt.refreshSecret);
  } catch (err) {
    return false;
  }
  if (!token) return false;
  if (token.expiry < Date.now()) {
    return false;
  }

  let newPayload = {
    id: payload.id,
  };
  const accessToken = await create_jwt_token(config.jwt.secret, config.jwt.accessExpirationMinutes + 'm', newPayload);
  token.accessToken = accessToken;
  await tokenRepository.save(token);
  return accessToken;
};

exports.verifyToken = async (payload, token) => {
  const expiry = payload.exp * 1000;
  if (expiry < Date.now()) {
    throw new Error('Token expired');
  }

};
