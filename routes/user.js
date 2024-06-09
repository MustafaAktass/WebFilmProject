const express = require('express');
const homePageController = require('../controller/user/homePageController');
const filmListPageController = require('../controller/user/filmListPageController')
const newsListPageController = require('../controller/user/newsListPageController')
const newsDetailPageController = require('../controller/user/newsDetailPageController')
const filmDetailPageController = require('../controller/user/filmDetailPageController')
const {roleDefinition} = require('../middlewares/roleDefinitionMiddleware')

router = express.Router();

router.use(roleDefinition)

router.get('/home',homePageController.homePage);
router.get('/films/list',filmListPageController.filmListPage);
router.get('/news/list',newsListPageController.newsListPage);
router.get('/news/detail/:slug',newsDetailPageController.newsDetailPage);
router.get('/film/detail/:slug',filmDetailPageController.filmDetailPage)

module.exports = router;