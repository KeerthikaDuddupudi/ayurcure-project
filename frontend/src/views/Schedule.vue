<template>
  <div class="appointment-container">
    <!-- Title -->
    <h1 class="main-title">Appointment Schedule</h1>

    <!-- Left: Calendar + Time Slots -->
    <div class="calendar-slot-panel">
      <div class="calendar-box">
        <h3>Select Date</h3>
        <input type="date" v-model="selectedDate" />
      </div>

      <!-- Morning Slots -->
      <div class="slot-group">
        <h4>🌞 Morning (9:00 AM - 12:00 PM)</h4>
        <div class="slot-grid">
          <button
            v-for="slot in morningSlots"
            :key="slot"
            :class="['time-slot', { active: selectedTime === slot }]"
            @click="selectedTime = slot"
          >
            {{ slot }}
          </button>
        </div>
      </div>

      <!-- Evening Slots -->
      <div class="slot-group">
        <h4>🌙 Evening (5:00 PM - 9:00 PM)</h4>
        <div class="slot-grid">
          <button
            v-for="slot in eveningSlots"
            :key="slot"
            :class="['time-slot', { active: selectedTime === slot }]"
            @click="selectedTime = slot"
          >
            {{ slot }}
          </button>
        </div>
      </div>
    </div>

    <!-- Right: Appointments -->
    <div class="appointments-panel">
      <h2>Appointments for {{ selectedDate }}</h2>
      <div
        v-for="doctor in doctors"
        :key="doctor.id"
        class="appointment-card"
      >
        <img :src="doctor.image" class="doctor-img-square" />
        <div class="doctor-info">
          <h3>{{ doctor.name }}</h3>
          <p><strong>{{ doctor.degree }}</strong></p>
          <p>{{ doctor.specialization }} — {{ doctor.location }}</p>
          <p><strong>Phone:</strong> {{ doctor.phone }}</p>
          <p><strong>Symptoms:</strong> {{ doctor.symptoms.join(', ') }}</p>
          <p><strong>Time:</strong> {{ selectedTime }}</p>
          <button @click="cancelAppointment(doctor.id)">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import anjali from '../assets/doctor1.jpg'
import neha from '../assets/doctor.png'
import rajesh from '../assets/doctor.png'
import amit from '../assets/doctor1.jpg'

const selectedDate = ref(new Date().toISOString().substr(0, 10))
const selectedTime = ref('10:10 AM')

const morningSlots = ['9:00 AM', '9:30 AM', '10:00 AM', '10:10 AM', '10:30 AM', '11:00 AM']
const eveningSlots = ['5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM']

const doctors = ref([
  {
    id: 1,
    name: 'Dr. Anjali Sharma',
    degree: 'BAMS, MD (Ayurveda)',
    specialization: 'Dermatologist',
    location: 'Delhi, India',
    phone: '+91 9876543210',
    image: anjali,
    symptoms: ['acne', 'rash', 'itching']
  },
  {
    id: 2,
    name: 'Dr. Neha Joshi',
    degree: 'BAMS, MS (Ayurveda)',
    specialization: 'Gynecologist',
    location: 'Mumbai, India',
    phone: '+91 8765432109',
    image: neha,
    symptoms: ['pcod', 'menstrual', 'fertility']
  },
  {
    id: 3,
    name: 'Dr. Rajesh Verma',
    degree: 'BAMS',
    specialization: 'Kaya Chikitsa',
    location: 'Pune, India',
    phone: '+91 7654321098',
    image: rajesh,
    symptoms: ['diabetes', 'weakness', 'fever']
  },
  {
    id: 4,
    name: 'Dr. Amit Deshmukh',
    degree: 'BAMS, PhD',
    specialization: 'Herbal Expert',
    location: 'Bengaluru, India',
    phone: '+91 6543210987',
    image: amit,
    symptoms: ['herbs', 'plant', 'natural']
  }
])

function cancelAppointment(id) {
  const index = doctors.value.findIndex(doc => doc.id === id)
  if (index !== -1) {
    doctors.value.splice(index, 1)
    alert(`Appointment with Doctor ID ${id} has been canceled.`)
  }
}
</script>

<style scoped>
.appointment-container {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  padding: 30px;
  background-color: #f4f6fa;
}

/* Title */
.main-title {
  width: 100%;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 24px;
  color: #2a6cd4;
  text-align: center;
}

/* Left Calendar/Slot Panel */
.calendar-slot-panel {
  flex: 1;
  max-width: 320px;
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
}

.calendar-box h3 {
  font-size: 16px;
  margin-bottom: 10px;
}

.calendar-box input[type='date'] {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.slot-group {
  margin-top: 24px;
}

.slot-group h4 {
  font-size: 15px;
  margin-bottom: 10px;
  color: #333;
}

.slot-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.time-slot {
  padding: 8px;
  font-size: 14px;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  transition: background 0.3s ease;
}

.time-slot:hover {
  background-color: #e8f0fe;
}

.time-slot.active {
  background-color: #2a6cd4;
  color: white;
  border-color: #2a6cd4;
}

/* Right Appointment Panel */
.appointments-panel {
  flex: 2;
  min-width: 300px;
}

.appointments-panel h2 {
  font-size: 20px;
  margin-bottom: 16px;
}

.appointment-card {
  display: flex;
  background: white;
  margin-bottom: 20px;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  align-items: flex-start;
}

.doctor-img-square {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  margin-right: 16px;
  border: 2px solid #2a6cd4;
}

.doctor-info {
  flex: 1;
}

.doctor-info h3 {
  margin: 0;
  font-size: 18px;
  color: #2a6cd4;
}

.doctor-info p {
  margin: 4px 0;
  font-size: 14px;
  color: #333;
}

.doctor-info button {
  margin-top: 10px;
  padding: 8px 14px;
  background-color: #e63946;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s;
}

.doctor-info button:hover {
  background-color: #d62828;
}

/* 🌙 Dark Theme Support */
body.dark-theme .appointment-container {
  background-color: #121212;
}

body.dark-theme .main-title {
  color: #e0f2fe;
}

body.dark-theme .calendar-slot-panel {
  background-color: #1e1e1e;
  box-shadow: 0 4px 20px rgba(255, 255, 255, 0.05);
}

body.dark-theme .calendar-box h3,
body.dark-theme .slot-group h4 {
  color: #f5f5f5;
}

body.dark-theme .calendar-box input[type='date'] {
  background-color: #2a2a2a;
  color: #ffffff;
  border-color: #444;
}

body.dark-theme .time-slot {
  background-color: #1e1e1e;
  color: #ddd;
  border-color: #444;
}

body.dark-theme .time-slot:hover {
  background-color: #374151;
}

body.dark-theme .time-slot.active {
  background-color: #3b82f6;
  color: white;
  border-color: #3b82f6;
}

body.dark-theme .appointments-panel h2 {
  color: #f5f5f5;
}

body.dark-theme .appointment-card {
  background-color: #1f1f1f;
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.05);
}

body.dark-theme .doctor-img-square {
  border-color: #3b82f6;
}

body.dark-theme .doctor-info h3 {
  color: #60a5fa;
}

body.dark-theme .doctor-info p {
  color: #cccccc;
}

body.dark-theme .doctor-info button {
  background-color: #dc2626;
  color: white;
}

body.dark-theme .doctor-info button:hover {
  background-color: #b91c1c;
}

</style>
