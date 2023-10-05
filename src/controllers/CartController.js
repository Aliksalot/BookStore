const express = require('express')
const router = express.Router();

const cartServices = require('../services/cartServices')

const path = require('path')


const addProductToCart = async(req, res) => {
    try{
        const cartID = req.body.cartId
        const bookName = req.body.name
        if(cartID === null || cartId === undefined || cartID === ''){
            console.log('No valid cart exits, creating new cart. ')
            const newCartId = await cartServices.createCart({name: bookName})
            res.send(newCartId)
            return
        }
        
        if(bookName === null ||  bookName === undefined){
            console.log('invalid book name')
            res.send(-1);
        }

        await cartServices.addBookToCart(cartID, bookName)
        res.send(cartID)

    }catch(e){
        console.log('err: ', e)
        res.send(-1)
    }
}

const requestCart = async(req, res) => {
    try{
        const cartId = req.body.cartId
        console.log('requesting cart with id: ', cartId)
        if(!await cartServices.isCartAlive(cartId)){
            res.send(null)
            return
        }
        const cart = await cartServices.getCartById(cartId)
        res.send(cart)
    }catch(e){
        console.log(`err with cart request: ${e}`)
        return null;
    }
}

router.post('/add-to-cart', addProductToCart)
router.get('/get-cart', requestCart)

module.exports = router