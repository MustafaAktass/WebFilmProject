const User = require('../models/userModel');
const jwt = require('jsonwebtoken')

exports.roleDefinition = async (req, res, next) => {
    try {
        // authToken middleware'i zaten user bilgilerini eklemiş olacak
        if (req.user) {
            req.user.role = req.user.role || 'user';
        } else {
            req.user = { role: 'user' };
        }
        next();
    } catch (err) {
        req.user = { role: 'user' };
        next();
    }
};

