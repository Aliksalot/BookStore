const collectionName = 'books'

const {getCollection} = require("./createClient")

const addBook = async(book) => {
    
    try{
        const collection = await getCollection(collectionName)

        book.qty = +book.qty

        const exits = await collection.findOne({name: book.name}) !== null
        return !exits ? await collection.insertOne(book) : null
    }catch(e){
        return null;
    }
    
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



//PROBLEMA E CHE QTY V BAZATA DANNI SE PAZI KATO STRING
const changeQuantity = async(book, change) => {
    const collection = await getCollection(collectionName)
    const bookOld = await collection.findOne({name: book.name})
    console.log(JSON.stringify(bookOld), book)
    change = Number(change)
    if(bookOld.qty + change < 0){
        return false;
    }
    await collection.updateOne({name: book.name}, {$inc: {qty: change}})
    return true
}

const deleteAllBooks = async() => {
    const collection = await getCollection(collectionName);
    collection.deleteMany();   
}


module.exports = {
    addBook,
    deleteBook,
    getBooks,
    deleteAllBooks,
    changeQuantity
}