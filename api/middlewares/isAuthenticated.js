const jwt = require("jsonwebtoken");

const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");


module.exports = catchAsync(async (req, res, next) => {
    if (!req.headers.authorization)
        return next(new AppError("You are not authorized", 401));

    const token = req.headers.authorization.split(" ")[1];
    req.user = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    next();
});