
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const routes = require('./routes')

require('./config/mongoose')

// use bodyparser
app.use(bodyParser.urlencoded({ extended: true }))

// use routes
app.use(routes)




//setting handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.listen(3000, () => {
  console.log('URL_shortener app.js is running')
})