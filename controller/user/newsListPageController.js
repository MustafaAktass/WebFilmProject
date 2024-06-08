const Film = require('../../models/filmModel');
const News = require('../../models/newsModel');

const formatDate = (date) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit' };
  return new Date(date).toLocaleString('en-US', options).replace(',', '');
};

exports.newsListPage = async (req, res, next) => {
  try {
    const perPage = parseInt(req.query.perPage) || 5; // Sayfa başına duyuru sayısı, varsayılan 5
    const page = parseInt(req.query.page) || 1; // Mevcut sayfa numarası, varsayılan 1

    const totalNews = await News.countDocuments(); // Toplam duyuru sayısını alır
    const newsList = await News.find()
      .skip((perPage * page) - perPage)
      .limit(perPage);

    newsList.forEach(news => {
      news.formattedDate = formatDate(news.createdAt);
    });

    const latestNews = await News.find().sort({ createdAt: -1 }).limit(3);
    const allTags = await News.distinct('tags');

    res.render('user/newsListPage', {
      news: newsList,
      allTags,
      latestNews,
      current: page,
      pages: Math.ceil(totalNews / perPage),
      perPage
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
