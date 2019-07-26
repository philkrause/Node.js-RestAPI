const mongoose = require('mongoose')

const Scheme = mongoose.Schema

const BearSchema = new Scheme({
  name: String
})

module.exports = mongoose.model('Bear', BearSchema)
