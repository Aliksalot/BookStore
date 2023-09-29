const collectionName = 'books'

const {getCollection} = require("./createClient")

const addBook = async(book) => {
    const collection = await getCollection(collectionName)
    return await collection.insertOne(book)
}

const deleteBook = async(bookName) => {
    const collection = await getCollection(collectionName)
    return await collection.deleteMany({name: bookName})
}

const getBooks = async(filter) => {
    const collection = await getCollection(collectionName);
    return new Promise(async(resolve, reject) => {
        resolve(await collection.find(filter).toArray())
    })
} 

const deleteAllBooks = async() => {
    const collection = await getCollection(collectionName);
    collection.deleteMany();   
}


module.exports = {
    addBook,
    deleteBook,
    getBooks,
    deleteAllBooks
}