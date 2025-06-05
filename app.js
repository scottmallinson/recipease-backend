'use strict';

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cors from 'cors';
import dotenv from 'dotenv';

// ES module compatibility for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Set mongoose strictQuery option to suppress deprecation warning
mongoose.set('strictQuery', false);

import auth from './routes/auth.js';
import user from './routes/user.js';
import recipe from './routes/recipe.js';

// Only connect to MongoDB if not in test environment
if (process.env.NODE_ENV !== 'test') {
  mongoose
    .connect(process.env.MONGODB_URI, {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log(`Connected to database`);
    })
    .catch(error => {
      console.error(error);
    });
}

const app = express();

app.use(
  cors({
    credentials: true,
    origin: [process.env.PUBLIC_DOMAIN]
  })
);

// Configure session with appropriate store based on environment
const sessionConfig = {
  secret: process.env.SESSION_SECRET || 'defaultSecret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000
  }
};

// Only use MongoStore if not in test environment
if (process.env.NODE_ENV !== 'test') {
  sessionConfig.store = MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  });
}

app.use(session(sessionConfig));

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
    const statusError = err.status || 500;
    res.status(statusError).json(err);
  }
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.PUBLIC_DOMAIN);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

export default app;
