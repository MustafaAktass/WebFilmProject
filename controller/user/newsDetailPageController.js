const Film = require('../../models/filmModel');
const News = require('../../models/newsModel');


const formatDate = (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit' };
    return new Date(date).toLocaleString('en-US', options).replace(',', '');
  };


exports.newsDetailPage = async (req, res, next) => {
    try{
        const newsId = req.params.id;
        const news = await News.findById(newsId); // Veritabanından haber verisini alın
        if (!news) {
            return res.status(404).json({ message: 'Duyuru bulunamadı' });
        }
        news.formattedDate = formatDate(news.createdAt)
        res.render('user/newsDetailPage',{
            news
        })
    }
    catch (err) {
        res.status(500).json({ message: err.message }); 
    }

}