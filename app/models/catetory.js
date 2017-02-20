var mongoose = require('mongoose')
var CatetorySchema = require('../schemas/catetory')
var Catetoty = mongoose.model('Catetoty',CatetorySchema)

module.exports = Catetoty