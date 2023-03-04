if (process.env.NODE_ENV !== "production")
    require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();

const userRouters = require("./routers/userRouters");
const catchAsync = require("./utils/catchAsync");
const Restaurant = require("./models/Restaurant");
const isAuthenticated = require("./middlewares/isAuthenticated");
const validateRestaurant = require("./middlewares/validateRestaurant");
const restaurantExists = require("./middlewares/restaurantExists");
const imageUpload = require("./utils/imageUpload");
const isRestaurantCreator = require("./middlewares/isRestaurantCreator");

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_LINK)
    .then(() => console.log("Database connected"))
    .catch(err => console.log("Error:", err.message));

mongoose.connection.on("error", err => console.log("Error:", err.message));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/uploads/images", express.static(path.join(__dirname, "/uploads/images")));

app.use("/api", userRouters);

app.get("/api/restaurants", catchAsync(async (req, res) => {
    const restaurants = await Restaurant.find({})
        .sort({ updatedAt: -1 });

    res.json(restaurants.map(r => r.toObject({ getters: true })));
}));

app.post("/api/restaurants",
    isAuthenticated,
    imageUpload.single("image"),
    validateRestaurant,
    catchAsync(async (req, res) => {

        let restaurant = await Restaurant.create({
            ...req.body,
            image: req.file.path,
            creator: req.user.userId
        });

        restaurant = await Restaurant.findById(restaurant._id)
            .populate("creator", "-password")

        res.json(restaurant.toObject({ toObject: true }));
    }));

app.get("/api/restaurants/:id",
    restaurantExists,
    catchAsync(async (req, res) => {

        const restaurant = await Restaurant.findById(req.params.id)
            .populate("creator", "-password");

        res.json(restaurant.toObject({ getters: true }));
    }));

app.patch("/api/restaurants/:id",
    isAuthenticated,
    restaurantExists,
    isRestaurantCreator,
    imageUpload.single("image"),
    validateRestaurant,
    catchAsync(async (req, res) => {

        const { name, type, location, website, description } = req.body;

        const restaurant = await Restaurant.findByIdAndUpdate(
            req.params.id,
            { name, type, location, website, description },
            { new: true, runValidators: true })
            .populate("creator", "-password");

        if (req.file) {
            fs.unlink(restaurant.image, () => { });
            restaurant.image = req.file.path;
            await restaurant.save();
        }

        res.json(restaurant.toObject({ getters: true }));
    }));

app.delete("/api/restaurants/:id",
    isAuthenticated,
    restaurantExists,
    isRestaurantCreator,
    catchAsync(async (req, res) => {

        await Restaurant.findByIdAndDelete(req.params.id);
        res.json({ message: "Restaurant deleted" });
    }));

app.use((err, req, res, next) => {
    if (req.file) {
        fs.unlink(req.file.path, () => { })
    }
    const { message = "Something went wrong!", statusCode = 500 } = err;

    console.log(err.stack);

    res.status(statusCode).json({ message });
})

app.listen(process.env.PORT, () => {
    console.log("Server is running");
});