const express = require('express')
const router = express.Router();

const path = require('path')

const serveHome = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/home.html'));
}

const serveHeader = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/header.html'))
}

const serveBookTemp = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/book.html'))
}

router.get('/book', serveBookTemp)
router.get('/home', serveHome)
router.get('/header', serveHeader)

module.exports = router