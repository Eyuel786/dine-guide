const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");


module.exports.register = async (req, res) => {

    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
        image: req.file.path
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
        image: user.image,
        token,
        tokenExpirationDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
    });
}

module.exports.login = async (req, res) => {

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
        image: user.image,
        token,
        tokenExpirationDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000)
    });
}