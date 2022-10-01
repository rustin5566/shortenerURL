
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const DataBase = require('./models/database')
const bodyParser = require('body-parser')
const shortener = require('./URLfunction/shortener')

// use bodyparser
app.use(bodyParser.urlencoded({ extended: true }))

// mongoose
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
})


//setting handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


app.use(express.static('public'))


app.get('/', (req, res) => {
  res.render('index')
})

app.post('/outcome', (req, res) => {
  const host = req.get('host')
  const originalURL = req.body.data
  DataBase.findOne({ originalURL })
    .lean()
    .then(data => data ? data : DataBase.create({ originalURL, shortenerURL: shortener() }))
    .then(data => res.render('index', { originalURL, shortenerURL: data.shortenerURL, host }))
    .catch(error => console.log(error))

})

app.get('/:shortenerURL', (req, res) => {
  
  const host = req.get('host')
  const shortener = req.params.shortenerURL
  const errorMsg = `${host}/${shortener} is not exist `
  DataBase.findOne( req.params )
    .then(data => data ? res.redirect(data.originalURL) : res.render('error', {errorMsg}) )
    .catch(error => console.log(error))

})



app.listen(3000, () => {
  console.log('URL_shortener app.js is running')
})