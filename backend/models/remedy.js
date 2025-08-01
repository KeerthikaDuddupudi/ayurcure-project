const mongoose = require('mongoose');

// Helper function to create language fields
const createLanguageField = (required = true) => ({
  en: { type: String, required },
  hi: { type: String, required },
  te: { type: String, required }
});

// Schema for ingredients (matches your array structure)
const ingredientSchema = new mongoose.Schema({
  en: { type: String, required: true },
  hi: { type: String, required: true },
  te: { type: String, required: true }
}, { _id: false });

// Main remedy schema
const remedySchema = new mongoose.Schema({
  // Basic information
  title: createLanguageField(),
  plant: createLanguageField(false),
  partUsed: createLanguageField(false),
  
  // Category information
  category: createLanguageField(),
  
  // Ingredients list (now as array)
  ingredients: {
    type: [ingredientSchema],
    required: true,
    validate: {
  validator: array => !array || array.length > 0,
  message: 'At least one ingredient is required',
   }

  },
  
  // Preparation instructions
  preparation: createLanguageField(false),
  
  // Usage instructions
  usage: createLanguageField(false),
  
  // Optional dosage information
  dosage: createLanguageField(false),
  
  // Optional method information
  method: createLanguageField(false),
  
  // Optional frequency information
  frequency: createLanguageField(false),
  
  // Optional duration information
  duration: createLanguageField(false),
  
  // Benefits list
  benefits: {
    type: [createLanguageField()],
    default: []
  },
  
  // Optional notes
  note: createLanguageField(false),
  
  // Optional cautions
  caution: createLanguageField(false)
  
}, {
  collection: "rem",
  timestamps: true // Adds createdAt and updatedAt fields
});

// Create the model
const Remedy = mongoose.model('Remedy', remedySchema);

module.exports = Remedy;