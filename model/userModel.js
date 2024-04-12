const mongoose = require("mongoose");

 

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'

    }
},
{
    timestamps: true // This option adds createdAt and updatedAt fields automatically
});

module.exports = mongoose.model("User", userSchema);
//  module.exports = userSchema
// export default mongoose.model("User", userSchema)