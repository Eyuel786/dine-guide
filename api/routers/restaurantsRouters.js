const express = require("express");
const router = express.Router();

const catchAsync = require("../utils/catchAsync");
const imageUpload = require("../utils/imageUpload");
const isAuthenticated = require("../middlewares/isAuthenticated");
const isRestaurantAuthor = require("../middlewares/isRestaurantAuthor");
const isReviewAuthor = require("../middlewares/isReviewAuthor");
const restaurantExists = require("../middlewares/restaurantExists");
const validateRestaurant = require("../middlewares/validateRestaurant");
const validateReview = require("../middlewares/validateReview");
const reviewExists = require("../middlewares/reviewExists");

const restaurantsControllers = require("../controllers/restaurantsControllers");

router.route("/")
    .get(catchAsync(restaurantsControllers.findAllRestaurants))
    .post(
        isAuthenticated,
        imageUpload.single("image"),
        validateRestaurant,
        catchAsync(restaurantsControllers.createRestaurant));

router.route("/:id")
    .get(
        restaurantExists,
        catchAsync(restaurantsControllers.findRestaurant))
    .patch(
        isAuthenticated,
        restaurantExists,
        isRestaurantAuthor,
        imageUpload.single("image"),
        validateRestaurant,
        catchAsync(restaurantsControllers.updateRestaurant))
    .delete(
        isAuthenticated,
        restaurantExists,
        isRestaurantAuthor,
        catchAsync(restaurantsControllers.deleteRestaurant))

router.post("/:id/reviews",
    isAuthenticated,
    restaurantExists,
    validateReview,
    catchAsync(restaurantsControllers.addReview));

router.delete("/:id/reviews/:reviewId",
    isAuthenticated,
    restaurantExists,
    reviewExists,
    isReviewAuthor,
    catchAsync(restaurantsControllers.deleteReview));

module.exports = router;