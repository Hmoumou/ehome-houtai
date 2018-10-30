const mongoose = require('mongoose')//导入mongoose

const news = new mongoose.Schema({
    title:String,
    content:String,
    contentText:String,
    img:String,
    author:{
        type:String
        // type:mongoose.SchemaTypes.ObjectId,
        // ref:'admin_user'
    },
    type:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'category'
    },
    look_num:{
        type:Number,
        default:1
    }
},{versionKey:false,timestamps:{createdAt:'create_time',updatedAt:'update_time'}})//创建表结构


module.exports = mongoose.model('news',news)
//导出表模型 第一个参数是表名 第二个参数是表模型