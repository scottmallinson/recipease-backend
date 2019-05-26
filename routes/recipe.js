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
    console.log(queryString);
    try {
      const recipe = await Recipe.find({ $text: { $search: queryString } }, { score: { $meta: 'textScore' } }).sort({ score: { $meta: 'textScore' } });
      console.log('search recipes', recipe);
      res.status(200).json(recipe);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/search',
  async (req, res, next) => {
    const { searchForItems } = req.body;
    const ingredients = searchForItems.map((items) => items.item);
    // console.log('ingredients', ingredients);
    const regex = [];
    for (var i = 0; i < ingredients.length; i++) {
      regex[i] = new RegExp(ingredients[i]);
    }
    try {
      const recipe = await Recipe.aggregate()
        .match({ 'ingredients.name': { $in: regex } })
        .unwind('$ingredients')
        .match({ 'ingredients.name': { $in: regex } })
        .group({ _id: { _id: '$_id', 'name': '$name', 'description': '$description' }, matches: { $sum: 1 } })
        .sort({ matches: -1 });
      console.log('search recipes by ingredients', recipe);
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
      console.log('create recipe', recipe);
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
      console.log('update recipe', recipe);
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
      console.log('save recipe to user', save);
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
      console.log('delete recipe by id', recipe);
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
      console.log('get recipe by ID', recipe);
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
      console.log('get all recipes', recipe);
      res.status(200).json(recipe);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
