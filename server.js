//dependencies
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const moment = require('moment');


const passport = require("passport");
const expressSession = require("express-session")({
  secret: "secret",
  resave: false,
  saveUninitialized: false
});

require('dotenv').config();

//import models
const Signup  = require('./models/signup');


//importing routes

const beanRoutes = require('./routes/beanRoutes');
const riceRoutes = require('./routes/riceRoutes');
const homeRoutes = require('./routes/homeRoutes');
const signRoutes = require('./routes/signRoutes');
const loginRoutes = require('./routes/loginRoutes');
const adminRoutes = require('./routes/adminRoutes');
const cowRoutes = require('./routes/cowRoutes');
const nutsRoutes = require('./routes/nutsRoutes');
const maizeRoutes = require('./routes/maizeRoutes');
const procurementRoutes = require('./routes/procurementRoutes');
const mineRoutes = require('./routes/mineRoutes');
const salesRoutes = require('./routes/salesRoutes');
const creditRoutes = require('./routes/creditRoutes');

// const { Manager } = require('session');

//instantiations
const app = express();
const port = 5000;

// Create HTTP server and attach Socket.io
const http = require('http').createServer(app);
const io = require('socket.io')(http);

//configurations
mongoose.connect(process.env.DATABASE_LOCAL, 
 
);

mongoose.connection
  .once("open", () => {
    console.log("Mongoose connection open");
  })
  .on("error", err => {
    console.error(`Connection error: ${err.message}`);
  });


  app.locals.moment = moment

//set view engine to pug
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

//middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// express session configs
app.use(expressSession);
app.use(passport.initialize());
app.use(passport.session());

// passport configs
passport.use(Signup.createStrategy());
passport.serializeUser(Signup.serializeUser());
passport.deserializeUser(Signup.deserializeUser());

//Routes
app.use('/', homeRoutes);
app.use('/', loginRoutes);
app.use('/', signRoutes);
app.use('/', riceRoutes);
app.use('/', adminRoutes);
app.use('/', beanRoutes);
app.use('/', cowRoutes);
app.use('/', nutsRoutes);
app.use('/', maizeRoutes);
app.use('/', procurementRoutes);
app.use('/', mineRoutes);
app.use('/', salesRoutes);
app.use('/', creditRoutes);

app.get("*", (req, res) => {
  res.send("error! page does not exist");
});

// Real-time notifications setup
io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Example of sending a notification to the client
  socket.emit('notification', { message: 'Welcome to the admin dashboard' });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

//bootstraping a server
http.listen(port, () => console.log(`listening on port ${port}`));
