const  express  = require("express");
const create = require( "../controller/productController.js");
const { auth } = require("../controller/authentication.js");
const route = express.Router();

route.post("/create",auth,create.createProduct);
route.get("/fetchAll",auth,create.fetchAllProducts);
route.get("/fetch/:id",auth,create.fetchProductByid);
route.put("/update/:id",auth,create.updateProductById);
route.delete("/delete/:id",auth,create.deleteProductById);

module.exports = route;