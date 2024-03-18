const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    itemWeight: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
},
    {
        timestamps: true // This option adds createdAt and updatedAt fields automatically
    });

module.exports = mongoose.model("Product", productSchema);
//  module.exports = userSchema
// export default mongoose.model("User", userSchema)