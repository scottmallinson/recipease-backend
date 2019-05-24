const express = require('express');
const createError = require('http-errors');

const router = express.Router();

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
