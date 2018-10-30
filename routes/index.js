var express = require('express');
var router = express.Router();

/* GET home page. */
router.use('/admin/adminuser',require('../controller/adminUser'))
router.use('/admin/news',require('../controller/news'))
router.use('/admin/category',require('../controller/category.js'))
router.use('/admin/swiper',require('../controller/swiper.js'))

module.exports = router;
