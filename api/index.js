if (process.env.NODE_ENV !== "production")
    require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();

const userRouters = require("./routers/userRouters");
const restaurantsRouters = require("./routers/restaurantsRouters");

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_LINK)
    .then(() => console.log("Database connected"))
    .catch(err => console.log("Error:", err.message));

mongoose.connection.on("error", err => console.log("Error:", err.message));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    "/api/uploads/images/resized",
    express.static(path.join(__dirname, "/uploads/images/resized")));

app.use("/api", userRouters);
app.use("/api/restaurants", restaurantsRouters);

app.use((err, req, res, next) => {
    if (req.file) {
        fs.unlink(req.file.path, err => {
            if (err) next(err);
        })
    }
    const { message = "Something went wrong!", statusCode = 500 } = err;

    console.log(err.stack);

    res.status(statusCode).json({ message });
})

app.listen(process.env.PORT, () => {
    console.log("Server is running on");
});