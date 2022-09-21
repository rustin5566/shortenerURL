const mongoose = require('mongoose')
const Schema = mongoose.Schema
const databaseSchema = new Schema({
  data: {

    type: String, 
    required: true 
  }
 
})
module.exports = mongoose.model('DataBase', databaseSchema)