const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const createCounter = async () => {
    const data = await prisma.counter.create({
        data:{
            bookCount : 0,
            userCount : 0,
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
}

const getUserCount = async () => {
    const count = await prisma.counter.findFirst()
    return count['userCount']
}

const incrementUserCount = async () => {
    const count = await prisma.counter.findFirst()
    const cnt = count['userCount']+1
    const newcount = await prisma.counter.update({
        where : { 
            identifier : 111 
        },
        data : { 
            userCount : cnt 
        }
    })
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

const fetchPaginated = async (page) => {
    const per_page = 5
    try{
        const books = await prisma.book.findMany({
            take : per_page,
            cursor : {
                bookId : (page - 1)*per_page + 1
            }
        })
        console.log(books)
    }
    catch(err){
        console.log(err)
    }
}

const getBook = async (payload) => {
    try{
        const book = await prisma.book.findUnique({
            where : {
                bookId : payload.bookId
            }
        })
        console.log(book)
    }
    catch{
        console.log(err)
    }
}

const deleteAllBooks = async () => {
    try{
        console.log('here')
        await prisma.book.deleteMany({
            where : {}
        })
        console.log('All entries deleted successfully.');
    }
    catch{
        console.log(err)
    }
}

const getBooks = async (payload) => {
    var query = {}
    var page = 1
    const per_page = 5
    console.log(payload)
    if(payload.author !== undefined) query.author = payload.author
    if(payload.title !== undefined) query.title = { 
        contains : payload.title, 
        mode : 'insensitive'
    } 
    if(payload.keyword !== undefined) query.keywords = { 
        contains : payload.keyword, 
        mode : 'insensitive'
    } 
    if(payload.page !== undefined) page = parseInt(payload.page)
    if(payload.per_page !== undefined) per_page = parseInt(payload.per_page)
    try{
        const books = await prisma.book.findMany({
            take : per_page,
            cursor : {
                bookId : (page - 1)*per_page + 1
            },
            where : query
        })
        console.log(books)
    }
    catch(err){
        console.log(err)
    }
}

const doNow = async () => {

    //createCounter()

    //const res = await getCount(); console.log(res+1);

    //updateCount()

    //for(let i=0; i<3;i++) { createPost(); await sleep(2000); }

    /*
    const payload = {
        author : 'b', 
        link : 'a',
        title : 'hello world',
        keywords : 'x,y',
        description : 'a'
    }
    createBook(payload)
    */
    
    

    //fetchPosts('book','2020-01-01')

    //fetchPaginated(2)

    /*
    const payload2 = {
        title : 'a'
    }
    searchByTitle(payload2)
    */

    /*
    const payload3 = {
        keyword: 'c'
    }
    searchByKeyword(payload3)
    */

    //fetchPaginated(2)

    /*
    const payload4 = {
        bookId : 2
    }
    getBook(payload4)
    */

    //deleteAllBooks()

    /*
    const payload5 = {
        title : 'a',
        keyword : 'c'
    }
    getBooks(payload5)
    */

}

doNow()

const createUser = async () => {
    const data = await prisma.user.create({
        data : {
            username : "anik",
            password : "123"
        }
    })
    console.log(data)
}

//createUser()

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

/*
const payload6 = {
    bookId : '7',
    link : 'https://www.example.com/the-lord-of-the-rings',
    title : 'The Lord of the Rings',
    keywords : 'fantasy, epic, Middle-earth',
    description : "Embark on an epic journey through the richly imagined world of Middle-earth as Frodo Baggins and his companions set out to destroy the One Ring and save Middle-earth from the dark forces of Sauron in this timeless fantasy masterpiece."
}
updateBook(payload6)
*/

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

/*
const payload7 = {
    prompt : 'how are you?'
}
const getTextResponse = async(payload) => {
    console.log('Hello')
    const completion = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		messages: [{ "role": "system", "content": "You are a helpful assistant." }, { role: "user", content: payload.prompt }],
	});

	response = { answer : completion.data.choices[0].message };
    console.log(response)
}

getTextResponse(payload7)
*/

async function fetchImage(src) {
    const image = await axios
        .get(src, {
            responseType: 'arraybuffer'
        })
    return image.data;
}

const payload8 = {
    prompt : 'A lovely illustration of Cinderella sweeping the floor, with her animal friends nearby'
}

const topic = "Cinderella"
const pagenum = "5"

const pdf_prompt = "give a page-by-page specification containing text and generate-image-prompt-for-openai-api for a child-friendly pdf book with " + pagenum + " pages about "+ topic + " with one image on every page, 2-sentence-text on every page, formatted as {pages: [{text:'',prompt:''}etc]}, no other text in front, just json with no new line, easily parsable"

const getPDFDetails = async (prompt) => {
	const completion = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
			messages: [{ role: "user", content: prompt }],
	});
	var response = completion.data.choices[0].message.content
	response = response.replace('\n','').trim()
	//console.log(response)
	json = JSON.parse(response)
    if(json.hasOwnProperty('pages')){json = json['pages']}
    //console.log(json)
    return json
}

const getImageUrl = async(img_prompt) => {
    console.log('Generating Image URL')
    const response = await openai.createImage({
		prompt: img_prompt,
		n: 1,
		size: "256x256"
	});
	url = response.data.data[0]['url'];
	console.log(url);
    return url
}

const generatePDF = async(topic,pagenum) => {
    const pdf_prompt = "give a page-by-page specification containing text and generate-image-prompt-for-openai-api for a child-friendly pdf book with " + pagenum + " pages about "+ topic + " with one image on every page, 3-sentence-text on every page, interesting text related to the topic provided, formatted as {pages: [{text:'',prompt:''}etc]}, no other text in front, just json with no new line, easily parsable"
    const json = await getPDFDetails(pdf_prompt)
    //console.log(json)

}

generatePDF("Cinderella","2")



