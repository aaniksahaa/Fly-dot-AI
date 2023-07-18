const router = require('express').Router()
const {getUsers, getSingleUser, deleteUser, createUser, updateUser} = require('../controllers/user')
const { body, validationResult } = require('express-validator')
const cache = require('memory-cache');

router.get('/user', async (req, res, next) => {
    try {
      const data = await getUsers()
      res.json(data)
    }
    catch (error) {
        next(error)
    }
})

router.post('/user/', [
    body('username').notEmpty(),
    body('password').notEmpty()
], async (req, res, next) => {
    const result = validationResult(req)
    console.log(req.body)
    if(result.isEmpty() === false) {
        return res.send({errors: result.array()})
    }
    try {
        const temp = await getSingleUser(req.body.username)
        if(temp === null) {
            const user = await createUser(req.body)
            res.json(user)
        }
        else {
            next({message: 'username already exists!'})
        }
    }
    catch (error) {
        next(error)
    }
})

router.put('/user/', [
    body('username').notEmpty()
], async (req,res,next) => {
    const result = validationResult(req)
    if(result.isEmpty() === false) {
        return res.send({errors: result.array()})
    }

    try {
        const temp = await getSingleUser(req.body.username)
        if(temp == null) {
            next({message: 'username does not exist'})
        }
        else {
            console.log(req.body)
            const user = await updateUser(req.body)
            res.json(user);
        }
    }
    catch(error) {
        next(error)
    }
})

router.get('/user/:userName', async (req, res, next) => {
    const cacheKey = req.params.username
    const cacheData = cache.get(cacheKey)
    if(cacheData)
    {
        console.log('Cache Hit')
        return res.json(cacheData)
    }
    console.log('Cache Miss')
    try {
        const data = await getSingleUser(req.params.userName)
        const ttl = 5 * 60 * 1000; // 5 minutes in milliseconds
        // Store the retrieved data in the cache with the specified TTL
        cache.put(cacheKey, data, ttl);
        res.json(data)
    }
    catch (error) {
        next(error)
    }
})

router.delete('/user/:username', async(req, res, next)=> {
    const result = validationResult(req)
    if(result.isEmpty() === false) {
        return res.send({errors: result.array()})
    }
    try {
        const user = await deleteUser(req.params)
        res.json(user)
    }
    catch(error) {
        next(error)
    }
})
module.exports = router;