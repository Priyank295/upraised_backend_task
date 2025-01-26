const jwt = require('jsonwebtoken');
const { decryptToken } = require('./encrypt_decrypt');

exports.validate_token = async (token, secret) => {
  try {
    let jwtToken = token;
    if (jwtToken.includes('Bearer')) {
      jwtToken = jwtToken.split(' ')[1];
    }
    const decrypt = decryptToken(jwtToken);
    const data = jwt.verify(decrypt, secret);
    return Promise.resolve(data);
  } catch (error) {
    console.log('====================================');
    console.log('Error in validate_token', error);
    console.log('====================================');
    return Promise.reject(error);
  }
};
