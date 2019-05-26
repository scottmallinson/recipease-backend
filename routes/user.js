const express = require('express');
const createError = require('http-errors');

const router = express.Router();

const User = require('../models/user');

router.delete(
  '/delete',
  async (req, res, next) => {
    const { id: _id } = req.body;
    try {
      const user = await User.deleteOne({ _id });
      console.log('delete user', user);
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
      const user = await User.findOneAndUpdate({ _id }, { $set: { pantry } }, { new: true });
      console.log('update user\'s pantry', user);
      res.status(200).json(user);
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
      const user = await User.findOneAndUpdate({ _id }, { $set: { password, displayName, biography, photoUrl, measurements } }, { new: true });
      console.log('update user', user);
      res.status(200).json(user);
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
      await User.findOne({ _id }).populate('createdRecipes').populate('savedRecipes').exec(function (err, user) {
        console.log('get users\' recipes', user);
        if (err) console.log(err);
        else res.status(200).json(user);
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
      const user = await User.findById({ _id });
      console.log('get user by ID', user);
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
