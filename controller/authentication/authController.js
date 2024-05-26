const User = require("../../models/userModel")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.loginPage=(req,res,next)=>{
    // res.render('auth/login',{layout:false})
}
exports.registerPage=(req,res,next)=>{
    // res.render('auth/register',{layout:false})
}

exports.register = async (req, res, next) => {
    try {
        const data = {
            email: req.body.email,
            userName: req.body.userName,
            password: req.body.password
        };
        // Kullanıcının önceden kayıtlı olup olmadığının kontrolü
        const existingUser = await User.findOne({ userName: data.userName });
        if (existingUser) {
            return res.status(400).json({ message: "Bu kullanıcı adı kullanılmaktadır. Lütfen başka kullanıcı adı giriniz." });
        }
        // Password hash
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        data.password = hashedPassword;
        const userData = await User.insertMany(data);
        console.log(userData);

        res.status(201).json({ message: "Kullanıcı başarıyla kaydedildi", user: userData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Sunucu hatası: ' + err.message });
    }
};
exports.login = async (req, res, next) => {
    try {
        const check = await User.findOne({ userName: req.body.userName });
        if (check) {
            const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
            if (isPasswordMatch) {
                // const token = createToken(check._id, check.role); // role bilgisini ekliyoruz
                res.cookie("cookieJWT", token, {
                    httpOnly: true,
                    maxAge: 1000 * 60 * 60 * 24
                });
                // res.redirect(''); //güncellenecek
            } else {
                res.send("Kullanıcı adı veya şifre hatalı");
            }
        }
    } catch {
        res.send("Hatalı Giden Bir Şeyler Oldu");
    }
};

exports.logout = (req, res) => {
    res.clearCookie('cookieJWT');
    // res.redirect('/auth/login');//güncellenecek
};

// const createToken = (userId, role) => {
//     return jwt.sign({ userId, role }, process.env.JWT_SECRET, {
//         expiresIn: "1d",
//     });
// };

