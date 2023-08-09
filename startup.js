
const express = require('express')
const app = express()

const path = require('path')

const port = 3000
//const ip = '192.168.1.9'

app.use(express.static(path.join(__dirname, './src/public')))

const page_sever = require('./src/controllers/serve_pages')

app.use('/', page_sever)

const home_controller = require('./src/controllers/HomeController')
app.use('/home/', home_controller)

const book_controller = require('./src/controllers/BookController')
app.use('/book/', book_controller)

app.listen(port, () => {
    console.log(`Server starting on ${port}`)
})

module.exports = app
