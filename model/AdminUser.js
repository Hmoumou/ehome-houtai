const mongoose = require('mongoose')//引入mongoose

const AdminUser = new mongoose.Schema({//创建表结构
    username:{
        type:String,
        required:true,
        unique:true
    },
    nickname:String,
    avatar:String,
    desc:String,
    job:Number,
    phone:String,
    sex:Number,
    password:{
        type:String,
        required:true
    },

},
{versionKey:false,timestamps:{createdAt:'create_time',updatedAt:'update_time'}}
//表选项 版本Key 时间戳  （创建的时候会自动帮你添加 create_time 和 update_time）
)

module.exports = mongoose.model('admin_user', AdminUser)
//导出表模型,第一个参数是表名，第二个参数是指你创建的表架构的名字