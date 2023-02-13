const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");


const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: String,
    image: String,
    location: String,
    website: String,
    description: String
});

restaurantSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Restaurant", restaurantSchema);