const UserVisit = require('../../models/userVisitModel');

module.exports.getTotalVisits = async (req, res) => {
  try {
    const totalVisits = await UserVisit.countDocuments();
    res.json({ totalVisits });
  } catch (error) {
    console.error('Error fetching total visits:', error);
    res.status(500).json({ error: 'Failed to fetch total visits' });
  }
};

module.exports.getOnlineUsers = (req, res) => {
  res.json({ onlineUsers });
};