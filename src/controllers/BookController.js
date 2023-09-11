const express = require('express')
const router = express.Router();

const bookServices = require('../services/bookServices')

const path = require('path')

const serveBookPage = (req, res) => {
    const book_name = req.params.book_name;
    console.log(`req for ${book_name}`)
    res.sendFile(path.join(__dirname, '../public/html/book.html'))
}

const getBookData = async(req, res) => {
    const name = req.params.book_name
    const books = await bookServices.getBooks({name: name})
    const book = books[0]
    console.log(book)
    res.send(book)
}

router.get('/:book_name', serveBookPage)
router.get('/getBookData/:book_name', getBookData)

module.exports = router