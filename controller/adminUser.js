const { Router } = require('express')
const router = Router()
const AdminUserModel = require('../model/AdminUser')
const auth = require('./auth')




router.post('/login', async (req, res, next) =>{
    try{
        const {username,password} = req.body
        if(username&&password){
          const user = await AdminUserModel.findOne({username})
          if(user){//有没有这个用户 
             if(password == user.password){
                req.session.user = user//将用户的信息存到session里
                res.json({
                    code:200,
                    msg:'登录成功'
                })
             }else{
                 res.json({
                     code:401,
                     msg:'密码错误'
                 })
             }
          }else{
            res.json({
                code:402,
                msg:'用户不存在'
            })
          }
        }else{
            res.json({
                code:400,
                msg:'缺少必要参数'
            })
        }
    }catch(err){
        next(err)
    }
} )

router.post('/', auth, async (req, res, next) => {
    try{
        let {
            username,
            nickname,
            avatar,
            desc,
            job,
            phone,
            sex,
            password 
        } = req.body
        const data = await AdminUserModel.create({
            username,
            nickname,
            avatar,
            desc,
            job,
            phone,
            sex,
            password
        })
        res.json({
            code:200,
            data,
            msg:'添加管理员成功'
        })
    }catch(err){
        next(err)
    }
})
router.get('/',auth, async (req,res,next)=>{
    try{
        let {page=1, size=5} = req.query
        page = parseInt(page)
        size = parseInt(size)
        const count = await AdminUserModel.count()
        const data = await AdminUserModel
        .find()
        .skip((page-1)*size)//跳过多少条
        .limit(size)//要多少条数据
        .sort({_id:-1})//排序
        .select('-password')                                                          
        res.json({
            code:200,
            count,
            data,
            msg:'请求成功'
        })
    }catch(err){
        next(err)
    }
})
router.get('/:id',auth, async (req,res,next)=>{
    try{
       let { id }  = req.params
        const data = await AdminUserModel
        .findById(id)
        .select('-password')                                                          
        res.json({
            code:200,
            data,
            msg:'请求成功'
        })
    }catch(err){
        next(err)
    }
})
router.delete('/:id', auth, async (req, res, next)=>{
    try{
        let {id} = req.params
        await AdminUserModel.deleteOne({_id:id})
        res.json({
            code:'200',
            msg:'成功删除一位管理员'
        })
    }catch(err){
        next(err)
    }
})

module.exports = router