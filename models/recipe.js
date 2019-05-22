const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

const recipeSchema = new Schema({
  creatorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  photoUrl: { type: String },
  duration: { type: Number, required: true, min: 0 },
  ingredients: [ {
    name: { type: String, unique: true },
    quantity: { type: Number }
  } ],
  instructions: [],
  yield: { type: Number, required: true, min: 0 },
  nutritionalInfo: [{
    name: { type: String },
    value: { type: Number }
  }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
