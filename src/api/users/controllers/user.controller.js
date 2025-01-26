const httpStatus = require('http-status');
const catchAsync = require('../../../common/response/catchAsync');
const userService = require('../services/user.service');
const { generateTokens } = require('../../token/service/token.service');

const signup = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const existingUser = await userService.getUserByUsername(username);
        if (existingUser) {
                return res.status(httpStatus.status.CONFLICT).json({ message: 'User already exists' });
        }
  const user = await userService.createUser(username, password);
  const token = await generateTokens({id:user.id});
  res.status(httpStatus.status.CREATED).json({ user, token });
});

const login = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const user = await userService.getUserByUsername(username);
  if (!user || !(await userService.validatePassword(password, user.password))) {
    return res.status(httpStatus.status.UNAUTHORIZED).json({ message: 'Invalid username or password' });
  }
  const token = await generateTokens({id:user.id});
  res.status(httpStatus.status.OK).json({ user, token });
});

module.exports = {
  signup,
  login,
};