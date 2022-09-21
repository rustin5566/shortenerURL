
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const DataBase = require('./models/database')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
})


//setting
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))


app.get('/', (req, res) => {
  res.render('index')
})

app.get('/outcome', (req, res) => {
  res.render('outcome')
})

app.post('/outcome', (req, res) => {
  const data = req.body.data
  return DataBase.create({ data })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(3000, () => {
  console.log('URL_shortener app.js is running')
})