const Remedy = require('../models/remedy');

// Get remedies by category with language support (default = English)
const getRemediesByCategory = async (req, res) => {
  const { category } = req.params;
  const { lang = 'en' } = req.query;

  try {
   const remedies = await Remedy.find({
  $or: [
    { 'category.en': new RegExp(category, 'i') },
    { 'category.hi': new RegExp(category, 'i') },
    { 'category.te': new RegExp(category, 'i') }
  ]
});


    const transformed = remedies.map((remedy) => ({
      title: remedy.title?.[lang] || remedy.title?.en || '',
      plant: remedy.plant?.[lang] || remedy.plant?.en || '',
      partUsed: remedy.partUsed?.[lang] || remedy.partUsed?.en || '',
      ingredients: remedy.ingredients?.map(ing => ing[lang] || ing.en) || [],
      preparation: remedy.preparation?.[lang] || remedy.preparation?.en || '',
      dosage: remedy.dosage?.[lang] || remedy.dosage?.en || '',
      caution: remedy.caution?.[lang] || remedy.caution?.en || '',
      note: remedy.note?.[lang] || '',
      subcategory: remedy.subcategory?.[lang] || '',
      benefits: remedy.benefits?.map(ben => ben[lang] || ben.en) || [],
      bestRemedy: remedy.bestRemedy
        ? {
            title: remedy.bestRemedy.title?.[lang] || remedy.bestRemedy.title?.en || '',
            preparation: remedy.bestRemedy.preparation?.[lang] || remedy.bestRemedy.preparation?.en || '',
            usage: remedy.bestRemedy.usage?.[lang] || remedy.bestRemedy.usage?.en || '',
            benefit: remedy.bestRemedy.benefit?.[lang] || remedy.bestRemedy.benefit?.en || ''
          }
        : null
    }));

    res.json(transformed);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error fetching remedies by category' });
  }
};

module.exports = {
  getRemediesByCategory
};