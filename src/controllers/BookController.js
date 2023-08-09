const express = require('express')
const router = express.Router();

const bookServices = require('../services/bookServices')

const path = require('path')

const getBookPage = (req, res) => {
    const book_name = req.params.book_name;
    console.log(`req for ${book_name}`)
    res.sendFile(path.join(__dirname, '../public/html/book.html'))
}

router.get('/:book_name', getBookPage)

module.exports = router