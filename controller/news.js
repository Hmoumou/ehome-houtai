const { Router } = require('express')
const router = Router()
const newsModel = require('../model/news')
const auth = require('./auth.js')

router.post('/',auth, async (req,res, next)=>{
   try{
        let {
            title,
            type,
            look_num,
            content,
            contentText,
            img,
            author
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
        const count = await newsModel.count()
        const newList = await newsModel
        .find()
        .sort({_id:-1})
        .skip((page-1)*page_size)
        .limit(page_size)
        // .populate({ path:'author',select:'-password'})
        .populate({ path:'type'})
        res.json({
            code:200,
            msg:'success',
            data:newList,
            count
        })
    }catch(err){
        next(err)
    }
})

router.get('/:id',async (req, res, next)=>{
    try{
       let { id }= req.params
        const data = await  newsModel
        .findById(id)
        res.json({
            code:200,
            msg:'success',
            data:data
        })
    }catch(err){
        next(err)
    }
})
router.patch('/:id',auth, async(req, res, next)=>{
    try {
        let { id } = req.params
        let {
            title,
            type,
            look_num,
            content,
            contentText,
            img,
        } = req.body
        const data = await newsModel.findById(id)
        const EditData = await data.update({
            $set:{
                title,
                type,
                look_num,
                content,
                contentText,
                img,
            }
        })
        res.json({
            code:200,
            msg:'修改成功',
            data:EditData
        })
    } catch (error) {
        next(error)
    }
})

router.delete('/:id',auth, async(req, res, next)=>{
    try {
        let { id } = req.params
       await  newsModel.deleteOne({_id:id})
        res.json({
            code:200,
            msg:'成功删除一条新闻'
        })
    } catch (error) {
        next(error)
    }
})


module.exports = router