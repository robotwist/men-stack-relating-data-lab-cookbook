const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');
const fs = require('fs');

const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');

const authController = require('./controllers/auth.js');
const foodsController = require('./controllers/foods.js');
const usersController = require('./controllers/users.js');
const addFoodController = require('./controllers/addFood.js');
const usersRouter = require('./routes/users');

const port = process.env.PORT || 3000;

function connectToMongo() {
  mongoose.connect(process.env.MONGODB_URI, {
    tls: true,
    tlsAllowInvalidCertificates: false,
    // tlsCAFile: '<path_to_CA_certificate>' // Uncomment and set the path if you have a CA certificate
  });

  mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
  });

  mongoose.connection.on('error', (err) => {
    console.error(`MongoDB connection error: ${err}`);
  });
}

connectToMongo();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(session({
  secret: process.env.SESSION_SECRET || 'yourSecretKey',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Ensure secure is false for non-HTTPS
}));

// Middleware to check user session
app.use((req, res, next) => {
  console.log('Session middleware - User in session:', req.session.userId);
  next();
});

// Middleware to pass session data to views
app.use(passUserToView);

app.use('/auth', authController);
app.use('/users', isSignedIn, usersRouter);
app.use('/', isSignedIn, addFoodController);

// Route to serve favicon
app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'favicon.ico'));
});

// Route for the root URL
app.get('/', (req, res) => {
  console.log('User in session:', req.session.userId);
  res.render('index.ejs');
});

// 404 error handler
app.use((req, res, next) => {
  res.status(404).send('Sorry, that route does not exist.');
});

// General error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});