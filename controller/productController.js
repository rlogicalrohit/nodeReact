const Product = require("../model/productModel.js");
const { createProductSchema, updateProductSchema } = require("../validation/index.js");

module.exports.createProduct = async (req, res) => {

    const { error } = createProductSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }
    const { name, price, brand, category, itemWeight, description, color } = req.body
    console.log("req.body", req.body);
    const productData = new Product({
        name,
        price,
        brand,
        category,
        itemWeight,
        description,
        color
    })

    try {
        const fetchProducts = await Product.find();
        if (fetchProducts) {
            const productDuplicate = fetchProducts.filter((product) => product.name.toLowerCase() === productData.name.toLowerCase());
            if (productDuplicate.length) return res.status(403).json({ message: "Product already Exists" });
        }
        const saveProduct = await productData.save();
        return res.status(200).json(saveProduct);
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports.fetchAllProducts = async (req, res) => {
    try {
        const fetchProducts = await Product.find();
        console.log("fetchUser FETCHED", fetchProducts)
        return res.status(200).json(fetchProducts);
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports.fetchProductByid = async (req, res) => {
    try {
        const fetchOneProduct = await Product.find({ _id: req.params.id });
        console.log("fetchUser FETCHED", fetchOneProduct)
        return res.status(200).json(fetchOneProduct);
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports.deleteProductById = async (req, res) => {
    try {
        const fetchProduct = await Product.findByIdAndDelete({ _id: req.params.id });
        console.log("fetchUser FETCHED", fetchProduct)
        return res.status(200).json(fetchProduct);
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports.updateProductById = async (req, res) => {
    try {
        const { error } = updateProductSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const fetchAllProducts = await Product.find();
        const productValidation = fetchAllProducts.filter((product) => (product.name.toLowerCase() === req.body.name.toLowerCase() && product._id.toString() !== req.params.id))
        console.log("emailValidation===>", productValidation);
        console.log("req.params.id===>", req.params.id);
        if (productValidation.length > 0) return res.status(403).json({ message: "Product already Exists" });
        const fetchProduct = await Product.findByIdAndUpdate({ _id: req.params.id }, req.body);
        // console.log("fetchUser FETCHED",fetchUser)
        return res.status(200).json(fetchProduct);
    } catch (error) {
        return res.status(500).json(error);
    }
}