const express = require('express');
const createError = require('http-errors');

const router = express.Router();

const Recipe = require('../models/recipe');

const {
  isLoggedIn
} = require('../helpers/middlewares');

router.get(
  '/search',
  async (req, res, next) => {
    const { s: name } = req.query;
    try {
      const recipe = await Recipe.find({ name: { '$regex': name, '$options': 'i' } });
      res.status(200).json(recipe);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/create',
  isLoggedIn(),
  async (req, res, next) => {
    const { creatorId, name, description, photoUrl, duration, ingredients, instructions, servings } = req.body;
    try {
      const recipe = await Recipe.create({ creatorId, name, description, photoUrl, duration, ingredients, instructions, servings });
      res.status(200).json(recipe);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/update',
  isLoggedIn(),
  async (req, res, next) => {
    const { creatorId, name, description, photoUrl, duration, ingredients, instructions, servings } = req.body;
    try {
      const recipe = await Recipe.findOneAndUpdate({ creatorId, name, description, photoUrl, duration, ingredients, instructions, servings });
      res.status(200).json(recipe);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  isLoggedIn(),
  async (req, res, next) => {
    const { id: _id } = req.params;
    try {
      const recipe = await Recipe.deleteOne({ _id });
      if (!recipe) {
        next(createError(404));
      } else {
        return res.status(204).send();
      }
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/:id',
  async (req, res, next) => {
    const { id: _id } = req.params;
    try {
      const recipe = await Recipe.findById({ _id });
      res.status(200).json(recipe);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/',
  async (req, res, next) => {
    try {
      const recipe = await Recipe.find();
      res.status(200).json(recipe);
    } catch (error) {
      next(error);
    }
  }
);

// router.post('/logout', isLoggedIn(), (req, res, next) => {
//   req.session.destroy();
//   return res.status(204).send();
// });

// router.get('/private', isLoggedIn(), (req, res, next) => {
//   res.status(200).json({
//     message: 'This is a private message'
//   });
// });

module.exports = router;
