// src/composables/savedRemedies.js
import { ref } from 'vue';

// Create a reactive array to store saved remedies
const savedRemedies = ref([]);

// Function to save a remedy
const saveRemedy = (remedy) => {
  // Check if remedy already exists (by title)
  const exists = savedRemedies.value.some(r => r.title === remedy.title);
  
  if (!exists) {
    savedRemedies.value.push(remedy);
    alert('Remedy saved successfully!');
  } else {
    alert('This remedy is already saved!');
  }
};

// Function to remove a remedy
const removeRemedy = (index) => {
  savedRemedies.value.splice(index, 1);
};

// Export the functions and state
export function useSavedRemedies() {
  return { 
    savedRemedies,
    saveRemedy,
    removeRemedy
  };
}