const {Router} = require('express')
const router =  Router()
const auth = require('./auth.js')
const categoryModel = require('../model/category.js')

router.post('/',auth ,async (req, res, next)=>{
   try{
    let { title,icon} = req.body
    const data = await categoryModel.create({
        title, icon
    })
    res.json({
        code:200,
        msg:'添加分类成功',
        data
    })
   }catch(err){
    next(err)
   }
})

router.get('/',async (req, res, next)=>{
   try{
    const data = await categoryModel
    .find()
    .sort({_id:-1})//排序
    res.json({
        code:200,
        msg:'success',
        data
    })
   }catch(err){
       next(err)
   }
})

router.delete('/:id',auth, async (req, res, next)=>{
    try{
        let { id } = req.params
        await categoryModel.deleteOne({_id:id})
        res.json({
            code:200,
            msg:'分类删除成功'
        })
    }catch(err){
        next(err)
    }
})

module.exports = router