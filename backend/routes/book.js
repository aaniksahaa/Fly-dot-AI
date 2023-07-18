const router = require('express').Router()
const { body, validationResult } = require('express-validator')
const {getBooks, getBook, createBook, searchByTitle, searchByKeyword, updateBook, deleteBook} = require('../controllers/book')
const cache = require('memory-cache');

router.get('/book', async (req,res,next) => {
    console.log(req.query)
    try{
        const books = await getBooks(req.query)
        console.log(books)
        res.json(books)
    }
    catch(err){
        next(err)
    }
})
router.get('/book/:bookId', async (req,res,next) => {
    const cacheKey = req.params.bookId
    const cacheData = cache.get(cacheKey)
    if(cacheData)
    {
        console.log('Cache Hit')
        return res.json(cacheData)
    }
    console.log('Cache Miss')
    try{
        const book = await getBook(req.params)
        console.log(book)

        const ttl = 10 * 60 * 1000; // 10 minutes in milliseconds

        // Store the retrieved data in the cache with the specified TTL
        cache.put(cacheKey, book, ttl);

        res.json(book)
    }
    catch(err){
        next(err)
    }
})

router.post('/book/', async (req, res, next) => {
    const result = validationResult(req)
    console.log(req.body)
    if(result.isEmpty() === false) {
        return res.send({errors: result.array()})
    }
    try {
        var payload = req.body 
        payload.author = 'dummy'
        if(req.user !== undefined) {
            payload.author = req.user.username
        }
        const book = await createBook(req.body)
        res.json(book)
    }
    catch (error) {
        next(error)
    }
})

router.put('/book/', async (req,res,next) => {
    const result = validationResult(req)
    if(result.isEmpty() === false) {
        return res.send({errors: result.array()})
    }
    try {
        const user = await updateBook(req.body)
        res.json(user);
    }
    catch(error) {
        next(error)
    }
})

router.delete('/book/:bookId', async(req, res, next)=> {
    const result = validationResult(req)
    if(result.isEmpty() === false) {
        return res.send({errors: result.array()})
    }
    try {
        const user = await deleteBook(req.params)
        res.json(user)
    }
    catch(error) {
        next(error)
    }
})

module.exports = router