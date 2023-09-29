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
    cart.books.push(book.name)
    if(await bookServices.changeQuantity({name: book.name}, -1)){
        await collection.insertOne(cart)
        console.log(`cart ${JSON.stringify(cart)} created successfully! `)
        return true;
    }  
    return false;
}

const getCartById = async(id) => {
    try{
        const collection = getCollection(collectionName)
        return await collection.findOne({id: id})
    }catch(e){
        return null
    }
}

const removeBookFromCart = async(id, bookName) => {
    console.log(`trying to remove book ${bookName} from cart ${id}`)

    try{
        const collection = getCollection(collectionName)

        const cart = await collection.findOne({id: id})

        await bookServices.changeQuantity({name: bookName}, 1)

        cart.books.splice(cart.books.indexOf(bookName), 1);
        await collection.updateOne({id: id}, {$set: {books: cart.books}});
        console.log('succesfully removed book from cart')
        return true;
    }catch(e){
        console.log("couldn't remove book from cart: ", e)
        return false;
    }
}

const addBookToCart = async(id, bookName) => {
    console.log(`Tryign to add book ${bookName} to cart ${id}`)
    try{
        const collection = await getCollection(collectionName)
        const cart = await collection.findOne({id: id})

        console.log(JSON.stringify(cart))

        if(cart.books.indexOf(bookName) === -1){
            const newbooks = cart.books
            bookServices.changeQuantity({name: bookName}, -1)
            newbooks.push(bookName)
            await collection.updateOne({id: id}, {$set: {books: newbooks}})
            console.log(JSON.stringify(await collection.findOne({id: id})))    
            console.log('book added to cart succesfully!')
            return true
        }
        console.log('book already in cart')
        
        return false;
        
    }catch(e){
        console.log(`error when adding book ${bookName} to cart ${id}, ${e}`)
        return false;
    }
}

module.exports = {
    createCart,
    getCartById,
    addBookToCart,
    removeBookFromCart
}