const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const createCounter = async () => {
    const data = await prisma.counter.create({
        data:{
            bookCount : 0,
            identifier: 111
        }
    })
    console.log(data)
}

const getBookCount = async () => {
    const count = await prisma.counter.findFirst()
    return count['bookCount']
}

const incrementBookCount = async () => {
    const count = await prisma.counter.findFirst()
    const cnt = count['bookCount']+1
    const newcount = await prisma.counter.update({
        where : { 
            identifier : 111 
        },
        data : { 
            bookCount : cnt 
        }
    })
    //console.log(newcount)
}

const createBook = async (payload) => {
    try{
        const cnt = await getBookCount() + 1
        console.log(cnt)
        const book = await prisma.book.create({
            data : {
                bookId : cnt,
                author : payload.author, 
                link : payload.link,
                title : payload.title,
                keywords : payload.keywords,
                description : payload.description
            }
        });
        incrementBookCount()
        console.log(book)
        return book
    }
    catch(err){
        console.log(err)
    }
}

const searchByTitle = async (payload) => {
    try{
        const books = await prisma.book.findMany({
            where : { 
                title : { 
                    contains : payload.title, 
                    mode : 'insensitive'
                } 
            }
        })
        console.log(books)
    }
    catch(err){
        console.log(err)
    }
}

const searchByKeyword = async (payload) => {
    try{
        const books = await prisma.book.findMany({
            where: {
                keywords: {
                  has: payload.keyword
                }
            }
        })
        console.log(books)
    }
    catch(err){
        console.log(err)
    }
}

const getBooks = async (payload) => {
    var query = {}
    var page = 1
    var per_page = 10
    console.log(payload)
    if(payload.author !== undefined || payload.author !== '') query.author = { 
        contains : payload.author,
        mode : 'insensitive'
    } 
    if(payload.title !== undefined || payload.title !== '') query.title = { 
        contains : payload.title, 
        mode : 'insensitive'
    } 
    if(payload.keyword !== undefined || payload.keyword !== '') query.keywords = { 
        contains : payload.keyword, 
        mode : 'insensitive'
    } 
    if(payload.page !== undefined) page = parseInt(payload.page)
    if(payload.per_page !== undefined) per_page = parseInt(payload.per_page)
    console.log(query)
    try{
        const books = await prisma.book.findMany({
            take : per_page,
            skip: (page-1) * per_page,
            // cursor : {
            //     bookId : (page - 1)*per_page + 1
            // },
            where : query
        })
        console.log(books)
        return books
    }
    catch(err){
        console.log(err)
    }
}

const getBook = async (payload) => {
    try{
        const book = await prisma.book.findUnique({
            where : {
                bookId : parseInt(payload.bookId)
            }
        })
        console.log(book)
        return book
    }
    catch(err){
        console.log(err)
    }
}

const updateBook = async (payload) => {
    console.log(payload)
    const book = await prisma.book.update({
        where: {
            bookId : parseInt(payload.bookId)
        }, 
        data: {
            link : payload.link,
            title : payload.title,
            keywords : payload.keywords,
            description : payload.description
        }
    })
    console.log(book)
    return book
}

const deleteBook = async (payload) => {
    console.log(payload)
    const book = await prisma.book.delete({
        where: {
            bookId : parseInt(payload.bookId)
        }
    })
    return book
}

module.exports = {getBooks, getBook, createBook, searchByKeyword, searchByTitle, updateBook, deleteBook}