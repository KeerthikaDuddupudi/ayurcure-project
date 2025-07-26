const mongoose = require('mongoose');
const Remedy = require('../models/remedy');
const remediesData = require('../data/remedies.json');
require('dotenv').config();

// Seeder function
const seedRemedies = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('🗑️ Clearing existing remedies...');
    await Remedy.deleteMany();
    console.log('🌱 Seeding new remedies...');
    await Remedy.insertMany(remediesData);
    console.log('✅ Remedies seeded successfully!');
    return true;
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    return false;
  } finally {
    await mongoose.connection.close();
  }
};

// Controller functions
const getAllRemedies = async (req, res) => {
  try {
    const { category, subcategory, plant, search } = req.query;
    const filter = {};
    
    if (category) filter.category = { $regex: new RegExp(category, 'i') };
    if (subcategory) filter.subcategory = { $regex: new RegExp(subcategory, 'i') };
    if (plant) filter.plant = { $regex: new RegExp(plant, 'i') };
    if (search) {
      filter.$or = [
        { title: { $regex: new RegExp(search, 'i') } },
        { plant: { $regex: new RegExp(search, 'i') } },
        { category: { $regex: new RegExp(search, 'i') } }
      ];
    }

    const remedies = await Remedy.find(filter);
    
    res.status(200).json({
      success: true,
      count: remedies.length,
      data: remedies
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: 'Server Error',
      error: err.message 
    });
  }
};

const getRemedyById = async (req, res) => {
  try {
    const remedy = await Remedy.findById(req.params.id);
    if (!remedy) {
      return res.status(404).json({
        success: false,
        message: 'Remedy not found'
      });
    }
    res.status(200).json({
      success: true,
      data: remedy
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: err.message
    });
  }
};

const getByCategory = async (req, res) => {
  try {
    const remedies = await Remedy.find({
      category: { $regex: new RegExp(req.params.category, 'i') }
    });

    if (remedies.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No remedies found for this category'
      });
    }

    res.status(200).json({
      success: true,
      count: remedies.length,
      data: remedies
    });
  } catch (err) {
    res.status(500).json({ 
      success: false,
      message: 'Server Error',
      error: err.message 
    });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Remedy.distinct('category');
    res.status(200).json({
      success: true,
      count: categories.length,
      data: categories
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories',
      error: err.message
    });
  }
};

const createRemedy = async (req, res) => {
  try {
    const newRemedy = await Remedy.create(req.body);
    res.status(201).json({
      success: true,
      data: newRemedy
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Validation Error',
      error: err.message
    });
  }
};

const updateRemedy = async (req, res) => {
  try {
    const remedy = await Remedy.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!remedy) {
      return res.status(404).json({
        success: false,
        message: 'Remedy not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: remedy
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: 'Validation Error',
      error: err.message
    });
  }
};

const deleteRemedy = async (req, res) => {
  try {
    const remedy = await Remedy.findByIdAndDelete(req.params.id);
    
    if (!remedy) {
      return res.status(404).json({
        success: false,
        message: 'Remedy not found'
      });
    }
    
    res.status(204).json({
      success: true,
      data: null
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error: err.message
    });
  }
};

module.exports = {
  seedRemedies,
  getAllRemedies,
  getRemedyById,
  getByCategory,
  getCategories,
  createRemedy,
  updateRemedy,
  deleteRemedy
};

// Seeder execution (only when run directly)
if (require.main === module) {
  seedRemedies()
    .then(success => process.exit(success ? 0 : 1))
    .catch(() => process.exit(1));
}