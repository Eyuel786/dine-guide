const sharp = require('sharp');
const fs = require('fs');

const Restaurant = require("../models/Restaurant");
const Review = require("../models/Review");


module.exports.findAllRestaurants = async (req, res) => {
    const restaurants = await Restaurant.find({})
        .populate("creator", "-password")
        .populate({
            path: "reviews",
            populate: {
                path: "creator",
                model: "User",
                select: "-password"
            }
        })
        .sort({ createdAt: -1 });

    res.json(restaurants.map(r => r.toObject({ getters: true })));
}

module.exports.createRestaurant = async (req, res) => {

    const path = `uploads/images/resized/${req.file.filename}`;

    await sharp(req.file.path)
        .resize({ width: 1800 })
        .toFile(path);

    fs.unlink(req.file.path, err => {
        if (err) next(err);
    })

    let restaurant = await Restaurant.create({
        ...req.body,
        image: path,
        creator: req.user.userId
    });

    restaurant = await Restaurant.findById(restaurant._id)
        .populate("creator", "-password")
        .populate({
            path: "reviews",
            populate: {
                path: "creator",
                model: "User",
                select: "-password"
            }
        })

    res.json(restaurant.toObject({ toObject: true }));
}

module.exports.findRestaurant = async (req, res) => {

    const restaurant = await Restaurant.findById(req.params.id)
        .populate("creator", "-password")
        .populate({
            path: "reviews",
            populate: {
                path: "creator",
                model: "User",
                select: "-password"
            }
        });

    res.json(restaurant.toObject({ getters: true }));
}

module.exports.updateRestaurant = async (req, res) => {

    const { name, type, location, website, description } = req.body;

    const path = `uploads/images/resized/${req.file.filename}`;

    await sharp(req.file.path)
        .resize({ width: 1800 })
        .toFile(path);

    fs.unlink(req.file.path, err => {
        if (err) next(err);
    });

    const restaurant = await Restaurant.findByIdAndUpdate(
        req.params.id,
        { name, type, location, website, description },
        { new: true, runValidators: true })
        .populate("creator", "-password")
        .populate({
            path: "reviews",
            populate: {
                path: "creator",
                model: "User",
                select: "-password"
            }
        });

    if (req.file) {
        fs.unlink(restaurant.image, err => {
            if (err) next(err);
        });
        restaurant.image = path;
        await restaurant.save();
    }

    res.json(restaurant.toObject({ getters: true }));
}

module.exports.deleteRestaurant = async (req, res) => {

    await Restaurant.findByIdAndDelete(req.params.id);

    res.json({ message: "Restaurant deleted" });
}

module.exports.addReview = async (req, res) => {

    let restaurant = await Restaurant.findById(req.params.id);
    const newReview = new Review({
        ...req.body,
        creator: req.user.userId
    });

    restaurant.reviews.push(newReview);
    await restaurant.save();
    await newReview.save();

    restaurant = await Restaurant.findById(req.params.id)
        .populate("creator", "-password")
        .populate({
            path: "reviews",
            populate: {
                path: "creator",
                model: "User",
                select: "-password"
            }
        });

    res.json(restaurant.toObject({ getters: true }));
}

module.exports.deleteReview = async (req, res) => {

    const restaurant = await Restaurant.findByIdAndUpdate(
        req.params.id,
        { $pull: { reviews: req.params.reviewId } },
        { new: true, runValidators: true })
        .populate("creator", "-password")
        .populate({
            path: "reviews",
            populate: {
                path: "creator",
                model: "User",
                select: "-password"
            }
        });

    res.json(restaurant.toObject({ getters: true }));
}