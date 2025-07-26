const mongoose = require('mongoose');

const remedySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    enum: [
      'cold and cough',
      'indigestion',
      'menstrual pain',
      'constipation',
      'acne',
      'skin',
      'DarkCircles',
      'hair fall',
      'weightgain',
      'weightloss',
      'Diabetes',
      'BloodPressure',
      'Thyroid',
      'EyeHealth',
      'StressAndAnxiety',
      'HeadacheAndMigraine',
      'CosmeticTreatment',
      'LiverProblem',
      'MenSexualHealth',
      'RespiratoryIssues',
      'PsychologicalIssues',
      'HeartHealth',
      'EyeSight',
      'Tumors',
      'Cancer'
    ]
  },
  subcategory: {
    type: String,
    enum: ['Anxiety', 'Depression', 'Insomnia', 'OCD', 'Stress']
  },
  title: {
    type: String,
    required: true
  },
  plant: {
    type: String,
  },
  partUsed: {
    type: String
  },
  practice: {
    type: String
  },
  ingredients: {
    type: [String]
  },
  preparation: {
    type: String
  },
  dosage: {
    type: String
  },
  usage: {
    type: String
  },
  caution: {
    type: String
  },
  benefits: {
    type: [String]
  },
  note: {
    type: String
  },
  bestRemedy: {
    type: {
      title: String,
      preparation: String,
      usage: String,
      benefit: String
    }
  },
  duration: {
    type: String
  },
  frequency: {
    type: String
  },
  method: {
    type: String
  }
}, { 
  collection: 'remedies', // Explicitly set collection name
  timestamps: true // Automatically add createdAt and updatedAt
});

// Indexes for better query performance
remedySchema.index({ category: 1 });
remedySchema.index({ subcategory: 1 });
remedySchema.index({ title: 1 });
remedySchema.index({ plant: 1 });

const Remedy = mongoose.model('Remedy', remedySchema);

module.exports = Remedy;