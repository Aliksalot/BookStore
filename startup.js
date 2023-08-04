
const express = require('express')
const app = express()

const path = require('path')

const port = 3000
//const ip = '192.168.1.9'

app.use(express.static(path.join(__dirname, './src/public')))

const page_sever = require('./src/controllers/serve_pages')

app.use('/', page_sever)

app.listen(port, () => {
    console.log(`Server starting on ${port}`)
})

module.exports = app
