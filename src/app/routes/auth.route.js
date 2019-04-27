const express = require('express');
const passport = require('passport');

var router = express.Router();
//set the contoller exports
const authController = require('../controllers/auth.controller');
const bookController = require('../controllers/book.controller');
const libraryController = require('../controllers/library.controller');

router.post('/register', authController.registerUser);

router.post('/login',authController.loginUser);

router.get('/profile/:username',passport.authenticate('jwt',{session:false}),authController.profileInfo);

router.get('/profile',passport.authenticate('jwt',{session:false}),authController.allProfileInfo);

router.get('/admin',passport.authenticate('jwt',{session:false}),authController.adminInfo);

// user logged in so show book details 
router.get('/books',passport.authenticate('jwt',{session:false}),bookController.getAllBooks);

//issue book routes
router.post('/issue',passport.authenticate('jwt',{session:false}),libraryController.issueBooks);

//get all  issuebook routes
router.get('/issuedbooks',passport.authenticate('jwt',{session:false}),libraryController.getAllIssuedBooks);

//get all issuebook by username 
router.get('/issuedbooks/:username',passport.authenticate('jwt',{session:false}),libraryController.getIssuedBookByUsername);

// remove issued book from list on return of book
router.delete('/issuedbooks/:id',passport.authenticate('jwt',{session:false}),libraryController.deleteIssuedBook);

// remove issued book from list on return of book
router.put('/issuedbooks/:id',passport.authenticate('jwt',{session:false}),libraryController.updateIssuedBook);

 module.exports = router;

