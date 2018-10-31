const { Router }  = require('express')
const router = Router()
const swiperModel = require('../model/swiper')
const auth = require('./auth')

router.post('/',auth, async (req, res,next)=>{
   try{
    let {
        title,
        newsId,
        sort,
        img,
        states
    } = req.body
    let data = await swiperModel.create({
        title,
        newsId,
        sort,
        img,
        states
    })
    res.json({
        code:200,
        msg:'轮播图添加成功',
        data
    })
   }catch(err){
       next(err)
   }
})
router.get('/',async (req, res, next)=>{
    try{
        let { page = 1, page_size = 5 }  = req.query
        page = parseInt( page )
        page_size = parseInt( page_size )
        
        let data = await swiperModel
        .find()     
        .skip((page-1)*page_size)
        .limit(page_size)
        .populate({path:'newsId'})
        .sort({sort:1})
        res.json({
            code:200,
            msg:'success',
            data
        })
    }catch(err){
        next(err)
    }
})

router.get('/:id', async (req, res ,next)=>{
    try{
        let { id } = req.params
        let data = await swiperModel.findById(id)
        res.json({
            code:200,
            msg:'success',
            data
        })
    }catch(err){
        next(err)
    }
})

router.delete('/:id', auth, async (req, res, next)=>{
    try{
        let {id} = req.params
        await swiperModel.deleteOne({_id:id})
       
        res.json({
            code:200,
            msg:'success',
        })
    }catch(err){
        next(err)
    }

})

router.patch('/:id',auth,async (req,res, next)=>{
        try{
            let { id } = req.params
            let {
                title,
                newsId,
                sort,
                img,
                states
            } = req.body
            const data = await swiperModel.findById(id)
            const updateData = await data.update({
               $set:{
                title,
                newsId,
                sort,
                img,
                states
               }
            })
            res.json({
                code:200,
                msg:'修改成功',
                data:updateData
            })
        }catch(err){
            next(err)
        }
})



module.exports = router