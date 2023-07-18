const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')

const getToken = async (username, password) => {
    console.log('login.js getToken',username,password)
    
    const user = await prisma.user.findUnique({
        where: {
            username: username
        }
    })
    if(user === null) return null
    if(user.password !== password) return null    
    const accessToken = jwt.sign({ username: user.username, id: user.id }, process.env.SECRET);
    return {user,accessToken}
}
module.exports = {getToken}