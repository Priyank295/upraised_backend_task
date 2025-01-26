const httpStatus = require('http-status');
const ApiError = require('../../../common/response/error');
const catchAsync = require('../../../common/response/catchAsync');
const { response } = require('../../../common/response/response');
const { isValidRefreshToken } = require('../service/token.service');

const generateAccessToken = catchAsync(async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) {
        throw new ApiError(httpStatus.BAD_REQUEST, { msg: 'token.refreshTokenReq' });
    }
    const accessToken = await isValidRefreshToken(refreshToken);
    if (!accessToken) {
        throw new ApiError(httpStatus.UNAUTHORIZED, { msg: 'token.refreshTokenInvalid' });
    }
    return response(httpStatus.OK, { msg: 'token.generated' }, { accessToken }, true, req, res);
});

module.exports = {
   generateAccessToken,
};


