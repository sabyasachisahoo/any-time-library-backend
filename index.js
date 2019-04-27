const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
var passport = require('passport');

const app = express();

//Configuring the database
const dbConfig = require('./src/config/database.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url)
.then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

//to handle json request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./src/config/passport')(passport); 

app.use(cors());

//user routes
const authRoute = require('./src/app/routes/auth.route.js');
app.use('/auth',authRoute);

//admin book routes
const bookRoute = require('./src/app/routes/book.route.js');
app.use('/auth/book',bookRoute);

const port = 5000;
app.listen(port, () =>{
    console.log("server is running on "+port)
})
