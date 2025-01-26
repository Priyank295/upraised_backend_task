const express = require('express');
const { generateAccessToken } = require('../controller/token.controller');
const validate = require('../../../common/middlewares/validate');
const { accessToken } = require('../validator/token.validator');
const router = express.Router();

router.post('/', validate(accessToken), generateAccessToken);

const tokenRoute = {
  path: '/token',
  router,
};

module.exports = tokenRoute;
