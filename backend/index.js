require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')
const morgan = require('morgan')

const cache = require('memory-cache');

const cors = require('cors')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const rateLimit = require('express-rate-limit')
const limiter = rateLimit({
  windowMs : 60 * 1000,
  max : 500
})

// routes 
const userRouter = require('./routes/user')
const loginRouter = require('./routes/login')
const regRouter = require('./routes/reg')
const bookRouter = require('./routes/book')
const chatRouter = require('./routes/chat')

// middlewares

const isAuthorized = require('./middlewares/auth')
const errorHandler = require('./middlewares/errorhandler.js')

const app = express()

app.use(morgan('dev'))

app.use(express.json())
app.use(limiter)
 
app.use(
    cors({
      origin: '*',
      methods: "GET,POST,PUT,DELETE, PATCH",
      credentials: true,
      maxAge: 36000,
    })
);
  
app.use('/api/v1', loginRouter)
app.use('/api/v1', regRouter)

//app.use(isAuthorized)

app.use('/api/v1', userRouter)
app.use('/api/v1', bookRouter)
app.use('/api/v1', chatRouter)

app.use(errorHandler)

const port = process.env.PORT || 3000

app.listen(port, () => console.log('running'))

