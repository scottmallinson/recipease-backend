'use strict';

const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
require('dotenv').config();

const auth = require('./routes/auth');
const user = require('./routes/user');
const recipe = require('./routes/recipe');

mongoose
  .connect(process.env.MONGODB_URI, {
    keepAlive: true,
    useNewUrlParser: true,
    reconnectTries: Number.MAX_VALUE,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log(`Connected to database`);
  })
  .catch(error => {
    console.error(error);
  });

const app = express();

app.use(
  cors({
    credentials: true,
    origin: [process.env.PUBLIC_DOMAIN, 'https://recipease-frontend.vercel.app']
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'defaultSecret',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    }),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000
    }
  })
);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', auth);
app.use('/api/user', user);
app.use('/api/recipes', recipe);

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.status(404).json({ code: 'not found' });
});

app.use((err, req, res, next) => {
  // always log the error
  console.error('ERROR', req.method, req.path, err);

  // only render if the error ocurred before sending the response
  if (!res.headersSent) {
    const statusError = err.status || '500';
    res.status(statusError).json(err);
  }
});

module.exports = app;
