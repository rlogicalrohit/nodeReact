const mongoose = require("mongoose");
const { defaultPermissions } = require("../validation/const");
const rolesSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    permission: {
        type: Array,
        required: true,
        default: defaultPermissions
    },
    isActive: {
        type: Boolean,
        default: true
    }
},
{
    timestamps: true // This option adds createdAt and updatedAt fields automatically
});

module.exports = mongoose.model("Role", rolesSchema);