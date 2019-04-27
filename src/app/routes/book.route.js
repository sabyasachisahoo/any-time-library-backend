const express = require('express');
const passport = require('passport');

var router = express.Router();
//set the contoller exports
const bookController = require('../controllers/book.controller');

router.get('/books',passport.authenticate('jwt',{session:false}),bookController.getAllBooks);

//search book by title 
router.get('/search',passport.authenticate('jwt',{session:false}),
  bookController.getBookByAuthorOrTitle
);

router.post('/books',passport.authenticate('jwt',{session:false}),bookController.addBook);

router.put('/books/:id',passport.authenticate('jwt',{session:false}),bookController.updateBook);

router.delete('/books/:id',passport.authenticate('jwt',{session:false}),bookController.deleteBook)

module.exports = router;

