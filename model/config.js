var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/ehome',{ useNewUrlParser: true })//数据库名字

var db = mongoose.connection
db.on('error',console.error.bind(console,'connect-error:'))
db.on('open',function(){
    console.log('connect mongoose success!')
})

module.exports = db
