const Role = require("../model/rolePermissionModel")

module.exports.createRoles = async (req, res) => {
    const { name } = req.body;
    const role = new Role({
        name
    })
    await role.save();
    return res.status(200).json("createRoles")
}