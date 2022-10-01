const express = require('express')
const router = express.Router()
const DataBase = require('../../models/database')
const shortener = require('../../URLfunction/shortener')

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/outcome', (req, res) => {
  const host = req.get('host')
  const originalURL = req.body.data
  DataBase.findOne({ originalURL })
    .lean()
    .then(data => data ? data : DataBase.create({ originalURL, shortenerURL: shortener() }))
    .then(data => res.render('index', { originalURL, shortenerURL: data.shortenerURL, host }))
    .catch(error => console.log(error))

})

router.get('/:shortenerURL', (req, res) => {

  const host = req.get('host')
  const shortener = req.params.shortenerURL
  const errorMsg = `${host}/${shortener} is not exist `
  DataBase.findOne(req.params)
    .then(data => data ? res.redirect(data.originalURL) : res.render('error', { errorMsg }))
    .catch(error => console.log(error))

})


module.exports = router