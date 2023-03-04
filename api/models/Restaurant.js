const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const fs = require("fs");


const restaurantSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    type: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });

restaurantSchema.post("findOneAndDelete", async restaurant => {
    try {
        if (restaurant.image) {
            fs.unlink(restaurant.image, () => { });
        }

    } catch (err) {
        console.log("Error:", err.message);
    }
});

restaurantSchema.plugin(uniqueValidator);
module.exports = mongoose.model("Restaurant", restaurantSchema);