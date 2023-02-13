const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/User");


module.exports = catchAsync(async (req, res, next) => {

    const { username, email } = req.body;

    let userExists = await User.exists({ username });
    if (userExists)
        return next(new AppError("User by that username already exists", 400));

    userExists = await User.exists({ email });
    if (userExists)
        return next(new AppError("User by that email already exists", 400));

    next();
});