<template>
  <div class="appointment-wrapper">
    <button class="back-btn" @click="goBack">← Back</button>
    <h2 class="appointment-title">Book Your Appointment</h2>
    <form @submit.prevent="submitForm" class="appointment-form">
      <div class="form-group">
        <label for="name">Name</label>
        <input v-model="form.name" type="text" id="name" required />
      </div>
      <div class="form-group">
        <label for="age">Age</label>
        <input v-model="form.age" type="number" id="age" required />
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
        <input v-model="form.email" type="email" id="email" required />
      </div>
      <div class="form-group">
        <label for="date">Date</label>
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
      <div class="form-group">
        <label for="concern">Concern</label>
        <textarea v-model="form.concern" id="concern" rows="3" required></textarea>
      </div>
      <button type="submit" class="submit-btn">Book Appointment</button>
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

onMounted(async () => {
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

    // ✅ Store user email in localStorage for notifications
    localStorage.setItem("userEmail", form.value.email);

    alert('Appointment booked successfully!');
    router.push('/home');
  } catch (err) {
    console.error(err);
    alert('Something went wrong. Please try again.');
  }
};
</script>

<style scoped>
.appointment-wrapper {
  max-width: 600px;
  margin: 50px auto;
  background: #fefefe;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
.appointment-title {
  font-size: 30px;
  text-align: center;
  margin-bottom: 25px;
}
.form-group {
  margin-bottom: 20px;
}
label {
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
}
input,
select,
textarea {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
}
.submit-btn {
  width: 100%;
  padding: 12px;
  font-weight: bold;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}
.submit-btn:hover {
  background-color: #45a049;
}
.back-btn {
  background: none;
  border: none;
  font-size: 18px;
  margin-bottom: 20px;
  cursor: pointer;
}
</style>
