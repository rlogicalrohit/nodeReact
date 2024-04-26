const express = require("express");
const create = require("../controller/productController.js");
const { auth } = require("../controller/authentication.js");
const route = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Define the destination folder where files will be stored
        const destinationFolder = 'public/storage/';
        // Check if the destination folder exists, if not create it
        if (!fs.existsSync(destinationFolder)) {
            fs.mkdirSync(destinationFolder, { recursive: true });
        }
        cb(null, destinationFolder);
    },
    filename: function (req, file, cb) {
        // Use the original file name as the name of the stored file
        // cb((null, file.originalname);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Initialize Multer with the storage configuration
const upload = multer({ storage: storage, limits: { fileSize: 2 * 1024 * 1024 } });
// / Middleware to handle file upload errors
function handleUploadErrors(err, req, res, next) {
    if (err instanceof multer.MulterError) {
        // A Multer error occurred during file upload
        return res.status(400).json({ message: 'File upload error: ' + err.message });
    } else if (err) {
        // An unknown error occurred
        return res.status(500).json({ message: 'Internal server error: ' + err.message });
    }
    next(); // Proceed to the next middleware
}

route.post("/create", auth, upload.single('image'), handleUploadErrors, create.createProduct);
route.get("/fetchAll", auth, create.fetchAllProducts);
route.get("/fetch/:id", auth, create.fetchProductByid);
route.put("/update/:id", auth, upload.single('image'), handleUploadErrors, create.updateProductById);
route.delete("/delete/:id", auth, create.deleteProductById);

module.exports = route; 