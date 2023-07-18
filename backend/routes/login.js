const router = require('express').Router()
const { body, validationResult } = require('express-validator')
const { getToken } = require('../controllers/login')

router.post('/login', [
    body('username').notEmpty(),
    body('password').notEmpty()
], async (req, res) => {
    console.log(req.body)
    const result = validationResult(req)
    if(result.isEmpty() === false) {
        return res.send({errors: result.array()})
    }
    console.log(__filename)
    try {
        const {user,accessToken} = await getToken(req.body.username, req.body.password)
        
        if(accessToken === null) {
            res.send('unauthorized')
        }
        else {
            console.log(accessToken,user)
            res.json({
                token: accessToken,
                user : user
            });
        }
    }
    catch(error) {
        // not recommended :)
        res.json({
            error: error,
            asda: 123
        })
    }
});

module.exports = router;