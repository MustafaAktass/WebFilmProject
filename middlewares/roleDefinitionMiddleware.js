const User = require('../models/userModel');
const jwt = require('jsonwebtoken')

exports.roleDefinition = async (req, res, next) => {
    try {
    const token = req.cookies.cookieJWT;
    if (!token) {
        req.user = { role: 'user' };
        return next();
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    req.user = { role: user ? user.role : 'user' };
    next();
    } catch (err) {
        req.user = { role: 'user' };
        next();
    }
};