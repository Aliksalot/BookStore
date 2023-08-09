const express = require('express')
const router = express.Router();

const path = require('path')

const serveHome = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/home.html'));
}

const serveHeader = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/header.html'))
}

const serveCart = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/cart.html'))
}

router.get('/home', serveHome)
router.get('/header', serveHeader)
router.get('/cart', serveCart)

module.exports = router