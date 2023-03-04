const Restaurant = require("../models/Restaurant");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");


module.exports = catchAsync(async (req, res, next) => {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant.creator.equals(req.user.userId))
        return next(new AppError("You are forbidden", 403));

    next();
});