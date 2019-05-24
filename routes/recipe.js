const express = require('express');
const createError = require('http-errors');

const router = express.Router();

const User = require('../models/user');
const Recipe = require('../models/recipe');

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
    const { creatorId, name, description, photoUrl, duration, ingredients, instructions, servings } = req.body;
    try {
      const recipe = await Recipe.findOneAndUpdate({ creatorId }, { $set: { name, description, photoUrl, duration, ingredients, instructions, servings } }, { new: true });
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
    console.log(req.body);
    console.log('recipeId', recipeId);
    console.log('userId', userId);
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
      console.log(recipe);
      res.status(200).json(recipe);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
