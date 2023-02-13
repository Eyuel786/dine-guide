if (process.env.NODE_ENV !== "production")
    require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const app = express();

const Restaurant = require("./models/Restaurant");
const catchAsync = require("./utils/catchAsync");
const validatePerson = require("./middlewares/validatePerson");
const validateUser = require("./middlewares/validateUser");
const userAlreadyExists = require("./middlewares/userAlreadyExists");
const userExists = require("./middlewares/userExists");
const User = require("./models/User");

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_LINK)
    .then(() => console.log("Database connected"))
    .catch(err => console.log("Error:", err.message));

mongoose.connection.on("error", err => console.log("Error:", err.message));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/register",
    validatePerson,
    userAlreadyExists,
    catchAsync(async (req, res) => {

        const { username, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });

        const token = jwt.sign(
            { userId: user._id, username: user.username, email: user.email },
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: '7d' }
        );

        res.json({
            userId: user._id,
            username: user.username,
            email: user.email,
            token,
            tokenExpirationDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
        });
    }));

app.post("/api/login",
    validateUser,
    userExists,
    catchAsync(async (req, res) => {

        const user = await User.findOne({ username: req.body.username });

        const token = jwt.sign(
            { userId: user._id, username: user.username, email: user.email },
            process.env.JWT_PRIVATE_KEY,
            { expiresIn: '7d' }
        );

        res.json({
            userId: user._id,
            username: user.username,
            email: user.email,
            token,
            tokenExpirationDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
        });
    }));

app.use((err, req, res, next) => {
    const { message = "Something went wrong!", statusCode = 500 } = err;

    res.status(statusCode).json({ message });
})

app.listen(process.env.PORT, () => {
    console.log("Server is running");
});