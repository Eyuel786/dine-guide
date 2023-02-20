const express = require("express");
const router = express.Router();

const userAlreadyExists = require("../middlewares/userAlreadyExists");
const userExists = require("../middlewares/userExists");
const validatePerson = require("../middlewares/validatePerson");
const validateUser = require("../middlewares/validateUser");
const imageUpload = require("../utils/imageUpload");
const catchAsync = require("../utils/catchAsync");
const userControllers = require("../controllers/userControllers");


router.post("/register",
    imageUpload.single("image"),
    validatePerson,
    userAlreadyExists,
    catchAsync(userControllers.register));

router.post("/login",
    validateUser,
    userExists,
    catchAsync(userControllers.login));

module.exports = router;