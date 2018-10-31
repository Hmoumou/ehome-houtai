var express = require('express');
var router = express.Router();

const adminUserModel = require('../model/AdminUser')
const newsModel = require('../model/news.js')
const jwt = require('jsonwebtoken')
const cert = require('../utils/cert')
/* GET home page. */
router.use('/admin/adminuser',require('../controller/adminUser'))
router.use('/admin/news',require('../controller/news'))
router.use('/admin/category',require('../controller/category.js'))
router.use('/admin/swiper',require('../controller/swiper.js'))
router.use('/admin/topic',require('../controller/topic.js'))


router.post('/demo/login', async (req,res,next)=>{
    const {
        username,
        password
    } = req.body
    const user = await adminUserModel.findOne({username})
    if(user){
        if(user.password == password){
            //第一个参数 携带的内容
            // 第二个参数 携带的密钥
            //第三个参数 过期时间
            const token = jwt.sign({userId:user._id},cert,{expiresIn:60*60*7})
            res.json({
                code:200,
                token,
                msg:'登录成功',
                data:user
            })
        }else{
            res.json({
                code:400,
                msg:'密码不正确'
            })
        }

    }else{
        res.json({
            code:403,
            msg:'此用户名不存在'
        })
    }
})

router.get('/demo/getNews1',async (req, res, next)=>{
   try{
    let data = await newsModel.find()
    res.json({
        code:200,
        data
    })
   }catch(err){
       next(err)
   }
})
router.get('/demo/getNews2', (req, res, next)=>{
    let token = req.headers.token || req.query.token || req.body.token 
    if(token){
         //解码
        jwt.verify(token,cert,function(err,decode){
            if(err){
                res.json({
                    code:403,
                    msg:'登录状态失效'
                })
                return
            }
           adminUserModel.findOne({_id:decode.userId})
           .then(user=>{
                newsModel.find().then(data=>{
                    res.json({
                        code:200,
                        msg:'success',
                        data:{
                            news:data,
                            user:user
                        }
                    })
                })
           })
        })
    }else{
        res.json({
            code:404,
            msg:'缺少必要参数token'
        })
    }

   

})
module.exports = router;
