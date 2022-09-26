const mongoose = require('mongoose')
const Schema = mongoose.Schema

const databaseSchema = new Schema({
  originalURL: {
    type: String,
    required: true
  },
  shortenerURL: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('DataBase', databaseSchema)