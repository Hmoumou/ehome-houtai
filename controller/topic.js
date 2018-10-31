const { Router } = require('express')
const router = Router()
const auth = require('./auth.js')
const topicModel = require('../model/topic')

router.get('/',async (req, res, next)=>{
    try{
        let { page=1, page_size=5 } = req.query
        page = parseInt(page)
        page_size = parseInt(page_size)
        const count = await topicModel.count()
        const data = await topicModel
        .find()
        .sort({_id:-1})
        .skip((page-1)*page_size)
        .limit(page_size)
        .populate({
            path:'user',
            select:'-password'
        })
        res.json({
            code:200,
            msg:'success',
            data,
            count
        })
    }catch(err){
        next(err)
    }
})

router.post('/',auth, async (req, res, next)=>{
    try{
        let { content } = req.body
        const userId = req.session.user._id
        let data = await topicModel.create({
            user:userId,
            content
        })
        res.json({
            code:200,
            msg:'success',
            data
        })

    }catch(err){
        next(err)
    }
})

module.exports = router
