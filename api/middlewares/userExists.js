const bcrypt = require("bcryptjs");

const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const User = require("../models/User");


module.exports = catchAsync(async (req, res, next) => {

    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user)
        return next(new AppError("Invalid credentials", 400));

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches)
        return next(new AppError("Invalid credentials", 400));

    next();
});