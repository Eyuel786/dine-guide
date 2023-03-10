const Review = require("../models/Review");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");


module.exports = catchAsync(async (req, res, next) => {
    const review = await Review.findById(req.params.reviewId);
    if (!review.creator.equals(req.user.userId))
        return next(new AppError("You are forbidden", 403));

    next();
});