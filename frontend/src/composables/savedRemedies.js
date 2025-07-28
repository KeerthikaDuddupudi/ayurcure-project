// src/composables/savedRemedies.js

import { ref, onMounted } from 'vue';
import axios from 'axios';

export function useSavedRemedies() {
  const savedRemedies = ref([]);
  const userEmail = ref('');

  // Load user email from localStorage
  const loadEmailFromStorage = () => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      userEmail.value = storedEmail;
      console.log('✅ Loaded userEmail from localStorage:', storedEmail);
    } else {
      console.warn("⚠️ No userEmail found in localStorage");
    }
  };

  // Fetch saved remedies
  const fetchSavedRemedies = async () => {
    if (!userEmail.value) loadEmailFromStorage();
    if (!userEmail.value) {
      console.error("⚠️ Cannot fetch remedies. User email is not set.");
      return;
    }

    try {
      const res = await axios.get('http://localhost:5000/api/saved/get', {
        params: { userEmail: userEmail.value }

      });
      savedRemedies.value = res.data;
      console.log("✅ Remedies fetched:", savedRemedies.value);
    } catch (error) {
      console.error("❌ Error fetching remedies:", error.message);
    }
  };

  // Save remedy
  const saveRemedy = async (remedy) => {
    if (!userEmail.value) loadEmailFromStorage();
    if (!userEmail.value) {
      console.error("❌ Error saving remedy: User email not set.");
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/saved/save', {
        userEmail: userEmail.value,
        remedy
      });
      console.log("✅ Remedy saved");
      await fetchSavedRemedies(); // refresh after save
    } catch (error) {
      console.error("❌ Error saving remedy:", error.message);
    }
  };

  // Delete remedy
  const removeRemedy = async (id) => {
    if (!userEmail.value) loadEmailFromStorage();
    if (!userEmail.value) {
      console.error("❌ Error removing remedy: User email not set.");
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/saved/delete', {
        userEmail: userEmail.value,
        id
      });
      console.log("🗑️ Remedy deleted");
      await fetchSavedRemedies(); // refresh after delete
    } catch (error) {
      console.error("❌ Error removing remedy:", error.message);
    }
  };

  // Load email on composable mount
  onMounted(() => {
    loadEmailFromStorage();
  });

  return {
    savedRemedies,
    userEmail,
    loadEmailFromStorage,
    fetchSavedRemedies,
    saveRemedy,
    removeRemedy
  };
}
