const mongoose = require('mongoose')

const swiper = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    newsId:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'news',
        required:true
    },
    sort:{
        type:String,
        default:1
    },
    img:{
        type:String,
        required:true
    },
    states:{
        type:Number,
        default:1
    },
},{versionKey:false,timestamps:{createdAt:'create_time',updatedAt:'update_time'}})

module.exports = mongoose.model('swiper',swiper)