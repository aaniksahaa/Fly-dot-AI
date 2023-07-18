const router = require('express').Router()
const { body, validationResult } = require('express-validator')
const { getTextResponse, getPdfResponse } = require('../controllers/chat')

router.get('/chat/text', async (req,res,next) => {
    console.log(req.query)
    try{
        const response = await getTextResponse(req.query)
        console.log(response)
        res.json(response)
    }
    catch(err){
        next(err)
    }
})

router.get('/chat/pdf', async (req,res,next) => {
    console.log(req.query)
    try{
        const response = await getPdfResponse(req.query)
        console.log(response)
        res.json(response)
    }
    catch(err){
        next(err)
    }
})

module.exports = router