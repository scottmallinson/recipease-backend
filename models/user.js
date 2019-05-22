const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  displayName: { type: String },
  biography: { type: String },
  photoUrl: { type: String },
  createdRecipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }],
  savedRecipes: [{ type: Schema.Types.ObjectId, ref: 'Recipe' }],
  measurements: { type: String, enum: ['Imperial', 'Metric'], default: 'Metric' },
  ability: [{ type: Schema.Types.ObjectId, ref: 'SkillsAssessment' }],
  pantry: [{
    item: { type: String },
    quantity: { type: Number, min: 0 }
  }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
