const express = require('express')
const router = express.Router();

const bookServices = require('../services/bookServices')

const path = require('path')

const getAllBooks = (req, res) => {
    bookServices.getBooks().then(books => {
        res.send(books)
    })
}

router.get('/getAllBooks', getAllBooks)

module.exports = router