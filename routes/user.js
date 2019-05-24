const express = require('express');
const createError = require('http-errors');

const router = express.Router();

const User = require('../models/user');
const Recipe = require('../models/recipe');

router.delete(
  '/delete',
  async (req, res, next) => {
    const { id: _id } = req.body;
    try {
      const user = await User.deleteOne({ _id });
      if (!user) {
        next(createError(404));
      } else {
        req.session.destroy();
        return res.status(204).send();
      }
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/pantry',
  async (req, res, next) => {
    const { _id, pantry } = req.body;
    try {
      const recipe = await User.findOneAndUpdate({ _id }, { $set: { pantry } }, { new: true });
      res.status(200).json(recipe);
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:id',
  async (req, res, next) => {
    const { _id, password, displayName, biography, photoUrl, measurements } = req.body;
    try {
      const recipe = await User.findOneAndUpdate({ _id }, { $set: { password, displayName, biography, photoUrl, measurements } }, { new: true });
      res.status(200).json(recipe);
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  '/profile/:id',
  async (req, res, next) => {
    const { id: _id } = req.params;
    try {
      await User.findOne({ _id }).populate('createdRecipes').populate('savedRecipes').exec(function (err, users) {
        if (err) console.log(err);
        else res.status(200).json(users);
      });
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
      const recipe = await User.findById({ _id });
      res.status(200).json(recipe);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
