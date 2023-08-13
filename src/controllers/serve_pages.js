const express = require('express')
const router = express.Router();

const path = require('path')

const {checkIsAdmin} = require('./AdminAuth')

const serveHome = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/home.html'));
}

const serveHeader = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/header.html'))
}

const serveCart = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/cart.html'))
}

const serveLogin = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/admin-login.html'))
}

const serveAdmin = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/admin.html'))
}

router.get('/home', serveHome)
router.get('/header', serveHeader)
router.get('/cart', serveCart)
router.get('/login', serveLogin)
router.get('/admin', checkIsAdmin, serveAdmin)

module.exports = router