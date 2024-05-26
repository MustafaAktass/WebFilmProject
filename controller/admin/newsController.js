const News = require('../../models/newsModel');

exports.renderAddNewsPage = async(req,res,next)=>{

}

exports.addNews = async(req,res,next)=>{
    try{
        const files = await uploadFiles(req,res);
        const {title,content,tags} = req.body;

        const images = files.map(file => ({
            path: file.path
          }));

        const data = new Film({
            title,
            content,
            tags,
            images,
        })

        const saveNews = await data.save();
        res.json(saveNews);        
    }
    catch(err){
        if (err.message.includes('Dosya yükleme hatası')) {
            return res.status(400).json({ message: err.message });
          }
          res.status(500).json({ message: 'Sunucu hatası: ' + err.message });
    }
}

exports.listNews = async (req, res, next) => {
    try {
        const news = await News.find(); 
        res.json(news); 
    } catch (err) {
        res.status(500).json({ message: 'Sunucu hatası: ' + err.message });
    }
};

exports.getUpdateNewsForm = async (req, res, next) => {
    try {
        const newsId = req.params.id; // URL'den haber ID'sini alın
        const news = await News.findById(newsId); // Veritabanından haber verisini alın
        if (!film) {
            return res.status(404).json({ message: 'Haber bulunamadı' });
        }
        res.json(film); // Haber verisini JSON formatında döndürün
    } catch (err) {
        res.status(500).json({ message: 'Sunucu hatası: ' + err.message });
    }
};

exports.updateNews = async (req, res, next) => {
    try {
        const newsId = req.params.id; // URL'den film ID'sini alın
        const { title,content,tags } = req.body;

        // Güncelleme için yeni dosyaları yükleyin (isteğe bağlı)
        const files = await uploadFiles(req, res);
        let images = [];
        if (files && files.length > 0) {
            images = files.map(file => ({
                path: file.path
            }));
        }

        // Film verilerini güncelleyin
        const updatedData = {
            title,
            content,
            tags,
        };
        if (images.length > 0) {
            updatedData.images = images; // Yeni posterler varsa güncelleyin
        }

        const updatedNews = await Film.findByIdAndUpdate(newsId, updatedData, { new: true });
        if (!updatedNews) {
            return res.status(404).json({ message: 'Haber bulunamadı' });
        }
        res.json(updatedNews); // Güncellenmiş film verisini JSON formatında döndürün
    } catch (err) {
        if (err.message.includes('Dosya yükleme hatası')) {
            return res.status(400).json({ message: err.message });
        }
        res.status(500).json({ message: 'Sunucu hatası: ' + err.message });
    }
};

exports.deleteNews = async (req, res, next) => {
    try {
        const news = await News.findByIdAndDelete(req.params.id);
        if (!news) {
            return res.status(404).send('Haber bulunamadı veya zaten silinmiş');
        }
        res.json()
    } catch (err) {
        res.status(500).json({ message: 'Sunucu hatası: ' + err.message });
    }
}