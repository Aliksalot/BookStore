const express = require('express')
const router = express.Router();
const path = require('path')
const bodyParser = require('body-parser')

const adminServices = require('../services/adminServices')

router.use(bodyParser.json())

const {checkIsAdmin, changeToAdmin} = require('./AdminAuth')

const loginAttempt = async(req, res) => {
    const username = req.body.username
    const password = req.body.password
    console.log(`request to login: username: ${username}, password: ${password}`)
    
    const loginSuccess = await adminServices.tryLogin(username, password);
    loginSuccess && changeToAdmin(req)

    console.log('login success: ', loginSuccess)
    res.send(JSON.stringify(loginSuccess))
}


router.post('/login_attempt', loginAttempt)

router.use(checkIsAdmin);

const newUserAttempt = async(req, res) => {
    const username = req.body.username
    const password = req.body.password
    
    const success = await adminServices.newUser({username: username, password: password})
 
    res.send(JSON.stringify(success))
}

router.post('/new_user_attempt', newUserAttempt)

module.exports = router
