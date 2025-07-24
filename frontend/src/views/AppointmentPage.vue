<template>
  <div class="appointment-wrapper">
    <button class="back-btn" @click="goBack">← Back</button>
    <h2 class="appointment-title">Book Your Appointment</h2>

    <form @submit.prevent="submitForm" class="appointment-form">
      <div class="form-grid">
        <div class="form-group">
          <label for="name">Name</label>
          <input v-model="form.name" type="text" id="name" :readonly="isNamePrefilled" required />
        </div>

        <div class="form-group">
          <label for="age">Age</label>
          <input v-model="form.age" type="number" id="age" min="1" max="120" required />
        </div>

        <div class="form-group">
          <label for="gender">Gender</label>
          <select v-model="form.gender" id="gender" required>
            <option disabled value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>

        <div class="form-group">
          <label for="phone">Phone Number</label>
          <input v-model="form.phone" type="tel" id="phone" required />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input v-model="form.email" type="email" id="email" :readonly="isEmailPrefilled" required />
        </div>

        <div class="form-group">
          <label for="date">Appointment Date</label>
          <input v-model="form.date" type="date" id="date" required />
        </div>

        <div class="form-group">
          <label for="doctor">Doctor</label>
          <input v-model="form.doctor" type="text" id="doctor" readonly />
        </div>

        <div class="form-group">
          <label for="doctorEmail">Doctor Email</label>
          <input v-model="form.doctorEmail" type="email" id="doctorEmail" readonly />
        </div>

        <div class="form-group full-width">
          <label for="concern">Describe Your Concern</label>
          <textarea v-model="form.concern" id="concern" rows="3" required></textarea>
        </div>
      </div>

      <button type="submit" class="submit-btn">📅 Book Appointment</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const route = useRoute();
const router = useRouter();

const form = ref({
  name: '',
  age: '',
  gender: '',
  phone: '',
  email: '',
  date: '',
  doctor: '',
  concern: '',
  doctorId: '',
  doctorEmail: '',
});

const isNamePrefilled = ref(false);
const isEmailPrefilled = ref(false);

onMounted(async () => {
  const storedName = localStorage.getItem("userName");
  const storedEmail = localStorage.getItem("userEmail");

  if (storedName) {
    form.value.name = storedName;
    isNamePrefilled.value = true;
  }

  if (storedEmail) {
    form.value.email = storedEmail;
    isEmailPrefilled.value = true;
  }

  const doctorIdFromRoute = route.query.doctorId;

  if (doctorIdFromRoute) {
    form.value.doctorId = doctorIdFromRoute;

    try {
      const res = await fetch(`${API_BASE}/api/doctors/${doctorIdFromRoute}`);
      if (!res.ok) {
        throw new Error(`Doctor not found (HTTP ${res.status})`);
      }

      const data = await res.json();
      form.value.doctor = data.name || 'Unknown';
      form.value.doctorEmail = data.email || 'Not Available';
    } catch (err) {
      console.error('Error fetching doctor details:', err);
      alert('Could not load doctor details. Please go back and try again.');
    }
  }
});

const goBack = () => {
  router.go(-1);
};

const submitForm = async () => {
  try {
    const res = await fetch(`${API_BASE}/api/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value),
    });

    if (!res.ok) throw new Error('Appointment booking failed');

    localStorage.setItem("userName", form.value.name);
    localStorage.setItem("userEmail", form.value.email);

    alert('✅ Appointment booked successfully!');
    router.push('/home');
  } catch (err) {
    console.error(err);
    alert('❌ Something went wrong. Please try again.');
  }
};
</script>

<style scoped>
.appointment-wrapper {
  max-width: 750px;
  margin: 50px auto;
  background: #ffffff;
  padding: 30px 40px;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', sans-serif;
}

.appointment-title {
  font-size: 32px;
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.full-width {
  grid-column: span 2;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
  margin-bottom: 8px;
  color: #444;
}

input,
select,
textarea {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 15px;
  transition: border 0.2s ease;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #4caf50;
}

.submit-btn {
  margin-top: 30px;
  width: 100%;
  padding: 14px;
  background-color: #4caf50;
  color: white;
  border: none;
  font-size: 16px;
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.submit-btn:hover {
  background-color: #45a049;
}

.back-btn {
  background: none;
  border: none;
  font-size: 18px;
  color: #4caf50;
  margin-bottom: 20px;
  cursor: pointer;
  font-weight: bold;
}
</style>
