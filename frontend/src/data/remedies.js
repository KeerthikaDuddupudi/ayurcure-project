// src/data/remedies.js
export default {
  cold: [
    {
      name: "Tulsi Tea",
      plant: "Tulsi (Holy Basil)",
      part: "Leaves",
      preparation: "Boil 5 leaves in 1 cup water for 5 minutes. Add honey.",
      dosage: "Twice daily after meals",
      caution: "Avoid during pregnancy",
      form: "Tea",
      image: "tulsitea.jpg",
      i18nKey: "remedies.details.tulsiTea" // Added unique key for i18n lookup
    },
    {
      name: "Ginger Decoction",
      plant: "Ginger",
      part: "Root",
      preparation: "Boil crushed ginger in water for 10 minutes. Add jaggery or honey.",
      dosage: "Morning and evening",
      caution: "Avoid on empty stomach",
      form: "Tea",
      image: "ginger.jpg",
      i18nKey: "remedies.details.gingerDecoction"
    }
  ],
  acne: [
    {
      name: "Neem Paste",
      plant: "Neem",
      part: "Leaves",
      preparation: "Grind neem leaves and apply paste to affected area.",
      dosage: "Once daily",
      caution: "Avoid open wounds",
      form: "Paste",
      image: "neem.jpg",
      i18nKey: "remedies.details.neemPaste"
    },
    {
      name: "Multani Mitti Mask",
      plant: "Fuller's Earth",
      part: "Clay",
      preparation: "Mix with rose water and apply to face.",
      dosage: "2-3 times a week",
      caution: "Avoid if skin is too dry",
      form: "Paste",
      image: "multani.jpg",
      i18nKey: "remedies.details.multaniMittiMask"
    }
  ],
  indigestion: [
    {
      name: "Jeera Water",
      plant: "Cumin",
      part: "Seeds",
      preparation: "Boil 1 tsp cumin seeds in 2 cups of water. Strain and drink.",
      dosage: "Twice a day after meals",
      caution: "Avoid excess during pregnancy",
      form: "Tea",
      image: "jeera.jpg",
      i18nKey: "remedies.details.jeeraWater"
    },
    {
      name: "Ajwain with Salt",
      plant: "Carom Seeds",
      part: "Seeds",
      preparation: "Roast with black salt and chew with warm water.",
      dosage: "1/2 tsp as needed",
      caution: "Avoid in case of ulcers",
      form: "Paste",
      image: "ajwain.jpg",
      i18nKey: "remedies.details.ajwainWithSalt"
    }
  ],
  headache: [
    {
      name: "Peppermint Oil Massage",
      plant: "Mint",
      part: "Oil",
      preparation: "Apply 1-2 drops on forehead and massage gently.",
      dosage: "As needed",
      caution: "Avoid near eyes",
      form: "Oil",
      image: "peppermint.jpg",
      i18nKey: "remedies.details.peppermintOilMassage"
    },
    {
      name: "Ginger Tea",
      plant: "Ginger",
      part: "Root",
      preparation: "Boil with lemon and honey.",
      dosage: "Twice daily",
      caution: "Avoid if prone to acidity",
      form: "Tea",
      image: "ginger.jpg",
      i18nKey: "remedies.details.gingerTea"
    }
  ],
  hairfall: [
    {
      name: "Amla Oil Massage",
      plant: "Indian Gooseberry",
      part: "Fruit",
      preparation: "Massage into scalp. Leave 1 hour, rinse.",
      dosage: "2-3 times per week",
      caution: "Avoid if scalp is very dry",
      form: "Oil",
      image: "amla.jpg",
      i18nKey: "remedies.details.amlaOilMassage"
    },
    {
      name: "Fenugreek Paste",
      plant: "Fenugreek",
      part: "Seeds",
      preparation: "Soak overnight, grind, apply to scalp.",
      dosage: "Once a week",
      caution: "Rinse thoroughly",
      form: "Paste",
      image: "fenugreek.jpg",
      i18nKey: "remedies.details.fenugreekPaste"
    }
  ],
  menstrual: [
    {
      name: "Cinnamon Tea",
      plant: "Cinnamon",
      part: "Bark",
      preparation: "Boil a small stick in water. Add honey.",
      dosage: "1-2 times a day during periods",
      caution: "Avoid if on blood thinners",
      form: "Tea",
      image: "cinnamon.jpg",
      i18nKey: "remedies.details.cinnamonTea"
    },
    {
      name: "Ajwain Water",
      plant: "Carom Seeds",
      part: "Seeds",
      preparation: "Boil 1 tsp in water. Drink warm.",
      dosage: "Twice daily during cramps",
      caution: "Avoid excessive use",
      form: "Tea",
      image: "ajwain.jpg",
      i18nKey: "remedies.details.ajwainWater"
    }
  ],
  constipation: [
    {
      name: "Triphala Powder",
      plant: "Triphala",
      part: "Fruits",
      preparation: "Mix 1 tsp in warm water before bed.",
      dosage: "Once daily",
      caution: "Consult for chronic issues",
      form: "Tea",
      image: "triphala.jpg",
      i18nKey: "remedies.details.triphalaPowder"
    },
    {
      name: "Flax Seeds",
      plant: "Flax",
      part: "Seeds",
      preparation: "Soak in warm water and drink.",
      dosage: "Morning before food",
      caution: "Drink enough water",
      form: "Tea",
      image: "flax.jpg",
      i18nKey: "remedies.details.flaxSeeds"
    }
  ],
  skin: [
    {
      name: "Turmeric Paste",
      plant: "Turmeric",
      part: "Root",
      preparation: "Mix with milk or aloe gel. Apply on skin.",
      dosage: "2-3 times/week",
      caution: "May stain skin temporarily",
      form: "Paste",
      image: "turmeric.jpg",
      i18nKey: "remedies.details.turmericPaste"
    },
    {
      name: "Aloe Vera Gel",
      plant: "Aloe Vera",
      part: "Gel",
      preparation: "Apply to affected area.",
      dosage: "Daily use",
      caution: "Patch test for sensitive skin",
      form: "Gel",
      image: "aloe.jpg",
      i18nKey: "remedies.details.aloeVeraGel"
    }
  ]
}