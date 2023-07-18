const router = require('express').Router()
const {getUsers, getSingleUser, deleteUser, createUser, updateUser} = require('../controllers/user')
const { body, validationResult } = require('express-validator')

router.post('/reg/', [
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

module.exports = router 