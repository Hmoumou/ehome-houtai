var express = require('express');
var router = express.Router();

/* GET home page. */
router.use('/admin/adminuser',require('../controller/adminUser'))
router.use('/admin/news',require('../controller/news'))

module.exports = router;
