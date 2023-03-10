const Review = require("../models/Review");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");


module.exports = catchAsync(async (req, res, next) => {
    const reviewExists = await Review.exists({ _id: req.params.reviewId });
    if (!reviewExists)
        return next(new AppError("Review does not exist", 400));

    next();
});