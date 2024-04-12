const User = require("../model/userModel.js")
const jwt = require('jsonwebtoken');
const jwtSecret = 'secret';
const bcrypt = require('bcryptjs');
const { userRegistrationSchema, userLoginSchema } = require("../validation/index.js");
const Role = require("../model/rolePermissionModel.js");

module.exports.createUser = async (req, res) => {
    console.log("req.body===>", req.body);

    const { error } = userRegistrationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { name, email, password } = req.body
    const userData = new User({
        name,
        email,
        password,
    })
    try {
        if (!userData.name || !userData.email || !userData.password || !req.body.confirmPassword) {
            return res.status(404).json("Required Payload not found");
        }
        if (userData.password !== req.body.confirmPassword) {
            return res.status(404).json("Password not match");
        }
        const fetchUser = await User.find();
        if (fetchUser.length === 0) { // If no users exist, assign a role to the first user
            userData.role = 'admin'; // Or whatever role you want to assign
        }
        if (fetchUser) {
            const emailValidation = fetchUser.filter((user) => user.email === userData.email)
            if (emailValidation.length) return res.status(403).json({ message: "Email already Exists" });
        }
        const saveUser = await userData.save();

        return res.status(200).json({ saveUser });
    } catch (error) {
        return res.status(500).json(error);
    }
}


module.exports.loginUser = async (req, res) => {
    const { error } = userLoginSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = req.body
    const fetchUser = await User.find({ email: email });

    
   const fetchRole = await Role.findOne({ name: fetchUser[0].role });

    if (!fetchRole) return res.status(403).json({ message: "Email and Password are Incorrect" });

    

    if (!fetchUser.length) return res.status(403).json({ message: "Email and Password are Incorrect" });
    // const match = await bcrypt.compare(password, fetchUser[0].password);

    // if (!match) return res.status(403).json({ message: "Email and Password are Incorrect" });

    const token = jwt.sign({ user: fetchUser[0] }, jwtSecret, { expiresIn: '1h' });

    const payload = {
        permission: fetchRole.permission,
        token: token
    }
    return res.status(200).json({ payload });
}