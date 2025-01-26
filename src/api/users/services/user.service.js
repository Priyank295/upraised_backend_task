const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const { dataSource } = require('../../../common/config/db-config');
const User = require('../model/user.model');

const userRepository = dataSource.getRepository('User');

const createUser = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = userRepository.create({
    id: uuidv4(),
    username,
    password: hashedPassword,
  });
  await userRepository.save(user);
  return user;
};

const getUserByUsername = async (username) => {
  return await userRepository.findOneBy({ username });
};

const validatePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = {
  createUser,
  getUserByUsername,
  validatePassword,
};