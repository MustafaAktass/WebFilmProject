const { uploadFiles,upload } = require('../../middlewares/posterUploadMiddleware');
const Film = require('../../models/filmModel');


exports.renderAddFilmPage = async(req,res,next)=>{
    res.render('admin/addFilmPage');
}
exports.addFilm = async(req,res,next)=>{
    try{
        const files = await uploadFiles(req,res);
        const {title,description,genre,director,actors,releaseDate,rating} = req.body;
        
        const posters = files.map(file => ({
            path: file.path
          }));

        const actorsArray = actors.split('-');

        const data = new Film({
            title,
            description,
            genre,
            director,
            actors:actorsArray,
            posters,
            releaseDate: new Date(releaseDate),
            rating
        })

        const saveFilm = await data.save();
        res.redirect('/admin/films/list')        
    }
    catch(err){
        if (err.message.includes('Dosya yükleme hatası')) {
            return res.status(400).json({ message: err.message });
          }
          res.status(500).json({ message: 'Sunucu hatası: ' + err.message });
    }
}

exports.listFilms = async (req, res, next) => {
    try {
        const films = await Film.find(); 
        res.render('admin/listFilmPage',{
            films
        }); 
    } catch (err) {
        res.status(500).json({ message: 'Sunucu hatası: ' + err.message });
    }
};

exports.getUpdateFilmForm = async (req, res, next) => {
    try {
        const filmId = req.params.id; // URL'den film ID'sini alın
        const film = await Film.findById(filmId); // Veritabanından film verisini alın
        if (!film) {
            return res.status(404).json({ message: 'Film bulunamadı' });
        }
        res.render('admin/updateFilmPage',{
            film
        });  // Film verisini JSON formatında döndürün
    } catch (err) {
        res.status(500).json({ message: 'Sunucu hatası: ' + err.message });
    }
};

exports.updateFilm = async (req, res, next) => {
    try {
        const files = await uploadFiles(req, res);
        const filmId = req.params.id; // URL'den film ID'sini alın
        const existingFilm = await Film.findById(filmId);
        const { title,description,genre,director,actors,releaseDate,rating } = req.body;
        
        // Güncelleme için yeni dosyaları yükleyin (isteğe bağlı)
        
        let posters = [];
        if (files && files.length > 0) {
            posters = files.map(file => ({
                path: file.path
            }));
        }
        else {
            // Yeni resim yüklenmemişse eski resimleri kullan
            posters = existingFilm.posters;
        }
        // Film verilerini güncelleyin
        const updatedData = {
            title: title || existingFilm.title,
            description: description || existingFilm.description,
            genre: genre || existingFilm.genre,
            director: director || existingFilm.director,
            actors: actors || existingFilm.actors,
            releaseDate: releaseDate ? new Date(releaseDate) : existingFilm.releaseDate,
            posters: posters,
            rating
        };

        const updatedFilm = await Film.findByIdAndUpdate(filmId, updatedData, { new: true });
        if (!updatedFilm) {
            return res.status(404).json({ message: 'Film bulunamadı' });
        }
        res.redirect('/admin/films/list')
        // res.json(updatedFilm); // Güncellenmiş film verisini JSON formatında döndürün
    } catch (err) {
        if (err.message.includes('Dosya yükleme hatası')) {
            return res.status(400).json({ message: err.message });
        }
        res.status(500).json({ message: 'Sunucu hatası: ' + err.message });
    }
};

exports.deleteFilm = async (req, res, next) => {
    try {
        const film = await Film.findByIdAndDelete(req.params.id);
        if (!film) {
            return res.status(404).send('Film bulunamadı veya zaten silinmiş');
        }
        res.redirect('/admin/films/list')
    } catch (err) {
        res.status(500).json({ message: 'Sunucu hatası: ' + err.message });
    }
}