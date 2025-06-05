'use strict';

import mongoose from 'mongoose';
const Schema = mongoose.Schema;

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

export default SkillsAssessment;
