const express = require('express')
const app = express()


app.get('/', (req, res) => {
  res.send('hello test')
})

app.listen(3000, () => {
  console.log('URL_shortener app.js is running')
})