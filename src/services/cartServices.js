const collectionName = 'carts'
const bookCollectionName = 'books'

const minutes30 = 1000 * 30 * 60;

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
        return cartId;
    }  
    return -1;
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
        await collection.updateOne({id: id}, {$set: {last_updated: Date.now()}})
        console.log('succesfully removed book from cart')
        return true;
    }catch(e){
        console.log("couldn't remove book from cart: ", e)
        return false;
    }
}

const addBookToCart = async(id, bookName) => {
    console.log(`Trying to add book ${bookName} to cart ${id}`)
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
        return false
    }
}

const getBooks = async(cartId) => {
    try{
        console.log('Trying to get books from cart ', cartId)
        const collection = await getCollection(collectionName);

        const cart = await collection.findOne({id: cartId})

        if(cart === null)
            return false;

        const bookCollection = await getCollection(bookCollectionName)
        const books = await bookCollection.find({title: {$in: cart.books}}).toArray()

        if(books !== null){
            console.log('Got books succesfully: ' + JSON.stringify(books))
            return books;
        }
            

        return false;

    }catch(e){
        console.log('Error when getting books from cart #', cartId)
    }
}

const deleteCart = async(cartId) => {
    try{
        console.log('Deleting cart ', cartId)

        const cartCollection = await getCollection(collectionName)
    
        const booksInCart = await cartCollection.findOne({id: cartId}).books
        await booksInCart.forEach(async bookName => {
            await bookServices.changeQuantity({name: bookName})
        })
        
        cartCollection.deleteOne({id: cartId}).then(result => {
            console.log(`Deleting success! `)
        })
    }catch(e){
        console.log(`Error when deleting cart ${e}`)
    }
}

const isCartAlive = async(cartId) => {
    try{
        const collection = await getCollection(collectionName)

        const cart = await collection.findOne({id: cartId})
        
        return Date.now - cart.last_updated > minutes30;
    }catch(e){
        return false;
    }
}

const sanitize = async() => {
    console.log(`Trying to sanitize at ${Date.now()}`)

    try{
        const collection = await getCollection(collectionName)
        
        const carts = await collection.find().toArray()

        carts.forEach(cart => {
            if(Date.now() - cart.last_updated > minutes30){
                deleteCart(cart.id)
            }
        })
    }catch(e){
        console.log(`Error when sanitizing: ${e}`)
    }finally{
        console.log('Sanitizing done at ', Date.now())
    }
}
 
module.exports = {
    createCart,
    getCartById,
    addBookToCart,
    removeBookFromCart,
    getBooks,
    sanitize,
    deleteCart,
    isCartAlive
}