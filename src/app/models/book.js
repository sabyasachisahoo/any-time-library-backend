var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var BookSchema = new Schema({
    isbn: String,
    title: String,
    author: String,
    description: String,
    published_date: String,
    category: String,
    price:String,
    publisher: String,
    updated_date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Book', BookSchema);