var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LibrarySchema = new Schema({
    username: String,
    bookId: String,
    bookTitle: String,
    bookAuthor: String,
    issue_date: { type: Date, default: Date.now },
    renew_date: { type: Date ,default: new Date(+new Date() + 7*24*60*60*1000)} //7 days from current date
});

module.exports = mongoose.model('Library', LibrarySchema);