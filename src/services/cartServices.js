const collectionName = 'carts'

const {getCollection} = require("./createClient")
const bookServices = require('./bookServices')

const createCart = async(book) => {
    console.log(JSON.stringify(book))
    const collection = await getCollection(collectionName)
    const cartId = await collection.countDocuments() + 1;
    const cart = {}
    cart.id = cartId
    cart.created = Date.now()     
    cart.last_updated = Date.now();
    cart.books = []
    book.qty -= 1;
    cart.books.push(book.name)
    if(await bookServices.changeQuantity(book, -1)){
        await collection.insertOne(cart)
        console.log(`cart ${JSON.stringify(cart)} created successfully! `)
        return true;
    }  
    return false;
}

const getCartById = async(cartId) => {
    try{
        const collection = getCollection(collectionName)
        return await collection.findOne({cartId: cartId})
    }catch(e){
        return null
    }
}

const addBookToCart = async(cartId, bookName) => {
    try{
        const collection = getCollection
        const cart = awa
    }catch(e){
        return null;
    }
}

module.exports = {
    createCart,
    getCartById
}