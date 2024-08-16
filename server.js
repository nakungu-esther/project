//dependencies
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')



//added

const passport = require("passport");
const expressSession = require("express-session")({
secret: "secret",
resave: false,//donot save their session after login
saveUninitialized: false//the session didnot start donot save
});




require('dotenv').config();

//import models

const Signup  = require('./models/signup')

//importing routes
const homeRoutes = require('./routes/homeRoutes')
const managerRoutes = require('./routes/managerRoutes')
const signRoutes = require('./routes/signRoutes')
const loginRoutes = require('./routes/loginRoutes')

//instantiations
const app = express();
const port = 5000;




//configurations
// set db connection to mongoose
mongoose.connect(process.env.DATABASE_LOCAL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection
  .once("open", () => {
    console.log("Mongoose connection open");
  })
  .on("error", err => {
    console.error(`Connection error: ${err.message}`);
  });





//set view engine to pug

app.set("view engine", "pug");// specify the view engine
app.set("views", path.join(__dirname, "views"));// specify the view directory







//middleware
app.use(express.static(path.join(__dirname, "public")));//specify a folder for static files
app.use(express.urlencoded({ extended: true }));// helps to parse data from forms
app.use(express.json());// helps to capture data in json




//added
// express session configs
app.use(expressSession);// express session
app.use(passport.initialize());//intialize passport
app.use(passport.session());//use passport session

// passport configs
passport.use(Signup.createStrategy());// use the local strategy
passport.serializeUser(Signup.serializeUser());// assign a serial number to a user in the system
passport.deserializeUser(Signup.deserializeUser());// the serial number is destroyed on log out




//Routes
//use routes/use imported routes
app.use('/', homeRoutes)
app.use('/',managerRoutes)
app.use('/', loginRoutes)
app.use('/', signRoutes)

app.get("*", (req, res) => {
  res.send("error! page does not exist");
});


//bootstraping a server
app.listen(port, () => console.log(`listening on port ${port}`));// string interporation
