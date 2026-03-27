// src/composables/savedRemedies.js

import { ref, onMounted } from 'vue';
import axios from 'axios';

// ✅ FIX: Use environment variable
const API = import.meta.env.VITE_API_URL;

export function useSavedRemedies() {
  const savedRemedies = ref([]);
  const userEmail = ref('');

  const loadEmailFromStorage = () => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      userEmail.value = storedEmail;
      console.log('✅ Loaded userEmail:', storedEmail);
    } else {
      console.warn("⚠️ No userEmail found");
    }
  };

  // ✅ Fetch saved remedies
  const fetchSavedRemedies = async () => {
    if (!userEmail.value) loadEmailFromStorage();
    if (!userEmail.value) return;

    try {
      const res = await axios.get(`${API}/api/saved/get`, {
        params: { userEmail: userEmail.value }
      });

      savedRemedies.value = res.data;
      console.log("✅ Remedies fetched:", res.data);

    } catch (error) {
      console.error("❌ Error fetching remedies:", error.message);
    }
  };

  // ✅ Save remedy
  const saveRemedy = async (remedy) => {
    if (!userEmail.value) loadEmailFromStorage();
    if (!userEmail.value) return;

    try {
      await axios.post(`${API}/api/saved/save`, {
        userEmail: userEmail.value,
        remedy
      });

      console.log("✅ Remedy saved");
      await fetchSavedRemedies();

    } catch (error) {
      console.error("❌ Error saving remedy:", error.message);
    }
  };

  // ✅ Delete remedy
  const removeRemedy = async (id) => {
    if (!userEmail.value) loadEmailFromStorage();
    if (!userEmail.value) return;

    try {
      await axios.post(`${API}/api/saved/delete`, {
        userEmail: userEmail.value,
        id
      });

      console.log("🗑️ Remedy deleted");
      await fetchSavedRemedies();

    } catch (error) {
      console.error("❌ Error removing remedy:", error.message);
    }
  };

  onMounted(() => {
    loadEmailFromStorage();
  });

  return {
    savedRemedies,
    userEmail,
    fetchSavedRemedies,
    saveRemedy,
    removeRemedy
  };
}