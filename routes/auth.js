import express from 'express';
import createError from 'http-errors';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import { isLoggedIn, isNotLoggedIn, validationLoggin } from '../helpers/middlewares.js';

const router = express.Router();

router.get('/me', isLoggedIn(), (req, res, next) => {
  res.json(req.session.currentUser);
});

router.post(
  '/login',
  isNotLoggedIn(),
  validationLoggin(),
  async (req, res, next) => {
    const { username, password } = req.body;
    try {
      const user = await User.findOne({ username });
      if (!user) {
        next(createError(404));
      } else if (bcrypt.compareSync(password, user.password)) {
        req.session.currentUser = user;
        return res.status(200).json(user);
      } else {
        next(createError(401));
      }
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/signup',
  isNotLoggedIn(),
  validationLoggin(),
  async (req, res, next) => {
    const { username, password } = req.body;

    try {
      const user = await User.findOne({ username }, 'username');
      if (user) {
        return next(createError(422));
      } else {
        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);
        const newUser = await User.create({ username, password: hashPass });
        req.session.currentUser = newUser;
        res.status(200).json(newUser);
      }
    } catch (error) {
      next(error);
    }
  }
);

router.post('/logout', isLoggedIn(), (req, res, next) => {
  req.session.destroy();
  return res.status(204).send();
});

router.get('/private', isLoggedIn(), (req, res, next) => {
  res.status(200).json({
    message: 'This is a private message'
  });
});

export default router;
