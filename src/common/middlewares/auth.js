const tokenService = require('../../api/token/service/token.service');
const { validate_token } = require('../utils/jwt/validate_token');
const config = require('../config/config');


const auth = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
        }
       
        const payload = await validate_token(token, config.jwt.secret);
        req.user = payload;
        await tokenService.verifyToken(payload, token);
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = auth;