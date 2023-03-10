const Joi = require("joi");


const emailPattern = new RegExp("^[a-zA-Z0-9]+@[a-z]+\\.[a-z]{2,3}$");
const passwordPattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).{7,16}$");

module.exports.personSchema = Joi.object({
    username: Joi.string().min(3).max(40).required(),
    email: Joi.string().pattern(emailPattern).required(),
    password: Joi.string().pattern(passwordPattern).required()
});

module.exports.userSchema = Joi.object({
    username: Joi.string().min(3).max(40).required(),
    password: Joi.string().pattern(passwordPattern).required()
});

module.exports.restaurantSchema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    type: Joi.string().required(),
    location: Joi.string().required(),
    website: Joi.string().required(),
    description: Joi.string().min(40).max(1000).required(),
    image: Joi.string()
});

module.exports.reviewSchema = Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().min(40).max(500).required()
});