'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.set('useCreateIndex', true);

const skillsAssessmentSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  instructions: [],
  levels: [{
    name: { type: String, unique: true },
    duration: { type: Number, required: true, min: 0 }
  }]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const SkillsAssessment = mongoose.model('SkillsAssessment', skillsAssessmentSchema);

module.exports = SkillsAssessment;
