const jwt = require('jsonwebtoken');
const jwtSecret = 'secret';

module.exports.auth = (req, res, next) => {

    let token = req.headers.authorization; // Assuming the token is sent in the Authorization header

    if (!token) {
        return res.status(401).json({ message: 'Token is required' });
    }
    try {
        token = token.split(" ")[1];
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded.user; // Assigning the decoded user details to the request object
        console.log("req.user", req.user);
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid token' });
    }
}