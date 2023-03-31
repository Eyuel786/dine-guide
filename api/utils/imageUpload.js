const multer = require("multer");
const { v4: uuid } = require("uuid");


const MIMETYPE = {
    "image/jpeg": "jpeg",
    "image/jpg": "jpg",
    "image/png": "png"
}

module.exports = multer({
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const imgIsValid = !!MIMETYPE[file.mimetype];
        const error = imgIsValid ? null : new Error("Image is invalid");
        cb(error, imgIsValid);
    },
    storage: multer.diskStorage({
        filename: (req, file, cb) => {
            const ext = MIMETYPE[file.mimetype];
            cb(null, `${uuid()}.${ext}`);
        },
        destination: (req, file, cb) => {
            cb(null, "uploads/images");
        }
    })
});