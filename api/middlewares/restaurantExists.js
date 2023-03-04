const Restaurant = require("../models/Restaurant");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");


module.exports = catchAsync(async (req, res, next) => {
    const restaurantExists = await Restaurant.exists({ _id: req.params.id });
    if (!restaurantExists)
        return next(new AppError("Restaurant does not exist", 400));

    next();
});