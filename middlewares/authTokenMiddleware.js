const User = require('../models/userModel');
const jwt = require('jsonwebtoken')

exports.authToken = async (req, res, next) => {
    try {
        const token = req.cookies.cookieJWT;
        //console.log(token);
        if (token) {
            jwt.verify(token, process.env.JWT_SECRET, async(err, decoded) => {
                if (err) {
                    console.log(err.message);
                    res.redirect("/auth/login");
                } else { 
                    req.user = decoded;
                    next();
                }
            });
        } else {
            res.redirect("/auth/login");
        }
    } catch (error) {
        res.json({
            succeeded: false,
            error: "Not authorized"
        });
    }
};