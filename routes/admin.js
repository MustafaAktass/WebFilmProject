const express = require('express');
const filmController = require('../controller/admin/filmController');
const newsController = require('../controller/admin/newsController');
const userVisitController = require('../controller/admin/userVisitController');

router = express.Router();



//film router
router.get('/films/new',filmController.renderAddFilmPage);
router.post('/films/add',filmController.addFilm);
router.get('/films/list',filmController.listFilms);
router.get('/films/update/:id',filmController.getUpdateFilmForm);
router.post('/films/update/:id',filmController.updateFilm);
router.post('/films/delete/:id',filmController.deleteFilm);

//news router
router.get('/news/new',newsController.renderAddNewsPage);
router.post('/news/add',newsController.addNews);
router.get('/news/list',newsController.listNews);
router.get('/news/update/:id',newsController.getUpdateNewsForm);
router.post('/news/update/:id',newsController.updateNews);
router.post('/news/delete/:id',newsController.deleteNews);

//online visitors router
router.get('/total-visits', userVisitController.getTotalVisits);

module.exports = router;