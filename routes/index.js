var express = require('express');
var getNavData = require('../data/navData').getNavData;


var router = express.Router();

router.use(function (req, res, next) {
    res.locals.partials = {
        header: 'header',
        bottom: 'bottom',
    };
    res.locals.scripts = [];
    res.locals.links = [];
    next();
})

/* GET home page. */
router.get('/', function(req, res, next) {
    res.locals.partials.content = 'index';
    res.locals.title = '尚木网';
    res.locals.navIndex = '0';
    res.locals.links = ["css/idangerous.swiper.css"];
    res.locals.scripts = ["js/idangerous.swiper.min.js"];
    res.locals.navData1 = getNavData(1).list;
    res.locals.navData2 = getNavData(2).list;
    res.locals.navData3 = getNavData(3).list;
    res.locals.navData4 = getNavData(4).list;
    res.render('layout');
    // res.render('index', { title: 'Express' });
});

router.get('/buyresource',function (req, res, next) {
	res.locals.partials.content = 'buyresource';
	res.locals.title = '求购资源';
	res.locals.navIndex = '1';
	res.locals.scripts = ["js/jquery.page.js"];
	res.locals.navData1 = getNavData(1).list;
    res.locals.navData2 = getNavData(2).list;
    res.locals.navData3 = getNavData(3).list;
    res.locals.navData4 = getNavData(4).list;
	res.render('layout');
})

router.get('/spotgoods',function (req, res, next) {
	res.locals.partials.content = 'spotgoods';
	res.locals.title = '现货资源';
	res.locals.navIndex = '2';
	res.locals.scripts = ["js/jquery.page.js"];
	res.locals.navData1 = getNavData(1).list;
    res.locals.navData2 = getNavData(2).list;
    res.locals.navData3 = getNavData(3).list;
    res.locals.navData4 = getNavData(4).list;
	res.render('layout');
})

router.get('/details',function (req, res, next) {
	res.locals.partials.content = 'details';
	res.locals.title = '查看详情';
	res.locals.navIndex = '2';
	res.locals.links = ["css/details.css"];
	res.locals.scripts = ["js/jquery.1.4.2-min.js","js/details.js"];
	res.locals.navData1 = getNavData(1).list;
    res.locals.navData2 = getNavData(2).list;
    res.locals.navData3 = getNavData(3).list;
    res.locals.navData4 = getNavData(4).list;
	res.render('layout');
})

router.get('/encyclopedia',function (req, res, next) {
	res.locals.partials.content = 'encyclopedia';
	res.locals.title = '木材百科';
	res.locals.navIndex = '4';
	res.locals.navData1 = getNavData(1).list;
    res.locals.navData2 = getNavData(2).list;
    res.locals.navData3 = getNavData(3).list;
    res.locals.navData4 = getNavData(4).list;
	res.render('encyclopedia');
})

module.exports = router;
