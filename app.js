
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')

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

app.listen(3000, () => {
  console.log('URL_shortener app.js is running')
})