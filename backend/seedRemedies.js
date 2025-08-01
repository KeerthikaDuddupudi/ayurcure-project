const mongoose = require('mongoose');
const Remedy = require('./models/remedy'); // Your model file
const remediesData = require('./data/rem.json'); // Your JSON data
require('dotenv').config();

const seedRemedies = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing data
    console.log('Clearing existing remedies...');
    await Remedy.deleteMany({});

    // Insert new data
    console.log('Seeding new remedies...');
    await Remedy.insertMany(remediesData);
    
    console.log('✅ Remedies seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
  }
};

seedRemedies();