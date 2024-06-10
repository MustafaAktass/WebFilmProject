const UserVisit = require('../models/userVisitModel');
const requestIp = require('request-ip');

const trackVisits = async (req, res, next) => {
  if (req.path.startsWith('/user')) { // Sadece /user yollarını izleme
    const ip = requestIp.getClientIp(req); // IP adresini alın
    const existingVisit = await UserVisit.findOne({ ip: ip });
    if (!existingVisit) {
      const userVisit = new UserVisit({ ip: ip });
      await userVisit.save();
    }
  }
  next();
};

module.exports = trackVisits;
//ip adresi filtrelemesi yapmadan toplam kullanıcı sayısı hesaplama
// const trackVisits = async (req, res, next) => {
//     if (req.path.startsWith('/admin')) { // Admin sayfası ziyaretlerini izleme
//       const userVisit = new UserVisit({ ip: req.ip });
//       await userVisit.save();
//     }
//     next();
//   };

