const mongoose = require('mongoose')

const common = new mongoose.Schema({
     user:{
     type:mongoose.SchemaTypes.ObjectId,
     ref:'admin_user'
    },
    content: String,
    topic:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'topic'
    }


},{versionKey:false,timestamps:{createdAt:'create_time',updatedAt:'update_time'}})

module.exports = mongoose.model('common',common)