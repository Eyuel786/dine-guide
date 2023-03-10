const AppError = require("../utils/AppError");
const { reviewSchema } = require("../utils/schemas")



module.exports = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);

    if (error) {
        const errMsg = error.details.map(el => el.message).join(", ");
        return next(new AppError(errMsg, 400));
    }

    next();
}