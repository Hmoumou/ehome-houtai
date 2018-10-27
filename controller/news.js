const { Router } = require('express')
const router = Router()
const newsModel = require('../model/news')
const auth = require('./auth.js')

router.post('/',auth, async (req,res, next)=>{
   try{
        let {
            title,type,look_num,content,contentText,img,author
        } = req.body
        let data = await newsModel.create({
            title,type,look_num,content,contentText,img,author
        })
        res.json({
            code:200,
            msg:'新闻添加成功',
            data
        })
   }catch(err){
        next(err)
   }
})
router.get('/',async (req, res, next)=>{
    try{
        let { page=1, page_size=5 } = req.query
        page = parseInt(page)
        page_size = parseInt(page_size)
        let newList = newsModel
        .find()
        .sort({_id:-1})
        .skip((page-1)*page_size)
        .limit(page_size)
        .populate({ path:'admin_user',select:'-password'})
        .populate({ path:'category'})
        res.json({
            code:200,
            msg:'success',
            data:newList
        })
    }catch(err){
        next(err)
    }
})

router.get('/:id',async (req, res, next)=>{
    try{
       let { id }= req.query
        let data = newsModel
        .findById(id)
        .populate({ path:'admin_user',select:'-password'})
        .populate({ path:'category'})
        res.json({
            code:200,
            msg:'success',
            data:data
        })
    }catch(err){
        next(err)
    }
})


module.exports = router