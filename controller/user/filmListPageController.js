const Film = require('../../models/filmModel');
const News = require('../../models/newsModel');

const formatDate = (date) => {
  const options = { year: 'numeric', month: 'short' };
  return new Date(date).toLocaleString('en-US', options).replace(',', '');
};

exports.filmListPage = async (req, res, next) => {
  try {
    const perPage = parseInt(req.query.perPage) || 5; // Sayfa başına film sayısı, varsayılan 5
    const page = parseInt(req.query.page) || 1; // Mevcut sayfa numarası, varsayılan 1

    const totalFilms = await Film.countDocuments(); // Toplam film sayısını alır
    const films = await Film.find()
      .skip((perPage * page) - perPage)
      .limit(perPage);

    films.forEach(film => {
      film.formattedDate = formatDate(film.releaseDate);
    });

    res.render('user/filmListPage', {
      films,
      totalFilms,
      current: page,
      pages: Math.ceil(totalFilms / perPage),
      perPage
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};