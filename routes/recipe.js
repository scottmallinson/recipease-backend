const express = require('express');
const createError = require('http-errors');

const router = express.Router();

const User = require('../models/user');
const Recipe = require('../models/recipe');

router.get(
  '/search',
  async (req, res, next) => {
    const { s: query } = req.query;
    var queryString = '\"' + query.split(' ').join('\" \"') + '\"';
    try {
      const recipe = await Recipe.find({ $text: { $search: queryString } }, { score: { $meta: 'textScore' } }).sort({ score: { $meta: 'textScore' } });
      res.status(200).json(recipe);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/create',
  async (req, res, next) => {
    let recipeId = '';
    const { creatorId, name, description, photoUrl, duration, ingredients, instructions, servings } = req.body;
    try {
      const recipe = await Recipe.create({ creatorId, name, description, photoUrl, duration, ingredients, instructions, servings });
      recipeId = recipe._id;
      res.status(200).json(recipe);
    } catch (error) {
      next(error);
    }
    try {
      await User.findOneAndUpdate({ _id: creatorId }, { $push: { createdRecipes: recipeId } }, { new: true });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/update',
  async (req, res, next) => {
    const { _id, name, description, photoUrl, duration, ingredients, instructions, servings } = req.body;
    try {
      const recipe = await Recipe.findOneAndUpdate({ _id }, { $set: { name, description, photoUrl, duration, ingredients, instructions, servings } }, { new: true });
      res.status(200).json(recipe);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/save',
  async (req, res, next) => {
    const { recipeId, userId } = req.body;
    try {
      const save = await User.findOneAndUpdate({ _id: userId }, { $push: { savedRecipes: recipeId } }, { new: true });
      res.status(200).json(save);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
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

module.exports = router;
