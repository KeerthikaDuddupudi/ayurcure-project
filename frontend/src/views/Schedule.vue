<template>
  <div class="appointment-container">
    <h1 class="main-title">Your Appointment Schedule</h1>

    <!-- Email fallback input -->
    <div v-if="!email" class="email-input-box">
      <label for="email">Enter your email:</label>
      <input id="email" v-model="emailInput" type="email" />
      <button @click="setEmail">Load Appointments</button>
    </div>

    <!-- Left Panel -->
    <div v-else class="calendar-slot-panel">
      <div class="calendar-box">
        <h3>Select Date</h3>
        <input type="date" v-model="selectedDate" />
      </div>

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

    <!-- Appointments Panel -->
    <div class="appointments-panel" v-if="email">
      <h2>
        All Confirmed Appointments on
        <span style="color: #2a6cd4">{{ new Date(selectedDate).toDateString() }}</span>
      </h2>

      <button v-if="filteredAppointments.length" @click="downloadPDF" class="download-btn">
        ⬇️ Download PDF
      </button>

      <div v-if="filteredAppointments.length === 0">
        No confirmed appointments found.
      </div>

      <div id="pdf-content" v-else>
        <div
          v-for="appointment in filteredAppointments"
          :key="appointment._id"
          class="appointment-card"
        >
          <img :src="defaultDoctorImage" class="doctor-img-square" />
          <div class="doctor-info">
            <h3>{{ appointment.doctorId?.name || 'Doctor' }}</h3>
            <p><strong>{{ appointment.doctorId?.degree || 'Degree' }}</strong></p>
            <p>
              {{ appointment.doctorId?.specialization || 'Specialist' }} -
              {{ appointment.doctorId?.location || 'Location' }}
            </p>
            <p><strong>Phone:</strong> {{ appointment.doctorId?.phone || 'N/A' }}</p>
            <p><strong>Concern:</strong> {{ appointment.concern || 'N/A' }}</p>
            <p><strong>Date:</strong> {{ new Date(appointment.date).toDateString() || 'N/A' }}</p>
            <p><strong>Time of Day:</strong> {{ appointment.timeOfDay || 'Not Set' }}</p>
            <p><strong>Status:</strong> {{ appointment.status || 'Pending' }}</p>
            <button @click="cancelAppointment(appointment._id)">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import defaultDoctorImage from '../assets/doctor.png'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

// State
const selectedDate = ref(new Date().toISOString().substr(0, 10))
const selectedTime = ref('')
const appointments = ref([])
const emailInput = ref('')
const email = ref('')

// Slots
const morningSlots = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM']
const eveningSlots = ['5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM']

// Load email from localStorage on mount
onMounted(() => {
  try {
    const storedEmail = localStorage.getItem('userEmail')
    if (storedEmail) {
      email.value = storedEmail
      fetchAppointments()
    }
  } catch (err) {
    console.error('❌ Failed to load email from localStorage:', err)
  }
})

const setEmail = () => {
  if (!emailInput.value) {
    alert('Please enter an email address.')
    return
  }
  email.value = emailInput.value
  localStorage.setItem('userEmail', emailInput.value)
  fetchAppointments()
}

const fetchAppointments = async () => {
  if (!email.value) return

  const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
  const apiUrl = `${baseURL}/api/appointments/user/${email.value}`

  try {
    const res = await axios.get(apiUrl)
    appointments.value = res.data.filter(a => a.status?.toLowerCase() === 'confirmed')
  } catch (err) {
    console.error('❌ Error fetching appointments:', err.message)
    appointments.value = []
  }
}

const cancelAppointment = async (id) => {
  try {
    const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
    await axios.delete(`${baseURL}/api/appointments/${id}`)
    alert('✅ Appointment cancelled successfully.')
    fetchAppointments()
  } catch (err) {
    alert('❌ Failed to cancel appointment.')
    console.error(err)
  }
}

// Filtered appointments
const filteredAppointments = computed(() => {
  return appointments.value.filter(appointment => {
    const appointmentDate = new Date(appointment.date).toISOString().substr(0, 10)
    return appointmentDate === selectedDate.value
  })
})

// PDF Download
const downloadPDF = async () => {
  const element = document.getElementById('pdf-content')
  if (!element) return

  const canvas = await html2canvas(element, { scale: 2 })
  const imgData = canvas.toDataURL('image/png')
  const pdf = new jsPDF('p', 'mm', 'a4')
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const imgProps = pdf.getImageProperties(imgData)
  const pdfWidth = pageWidth
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width

  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
  pdf.save('appointments.pdf')
}
</script>

<style scoped>
.appointment-container {
  margin-top: 80px;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  padding: 30px;
  background-color: #f4f6fa;
}
.main-title {
  width: 100%;
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 24px;
  color: #2a6cd4;
  text-align: center;
}
.email-input-box {
  width: 100%;
  margin: 20px auto;
  text-align: center;
}
.email-input-box input {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
  width: 260px;
  margin: 0 10px;
}
.email-input-box button {
  padding: 8px 14px;
  background-color: #2a6cd4;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
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
.download-btn {
  margin-bottom: 20px;
  padding: 10px 16px;
  background-color: #2a6cd4;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
}
.download-btn:hover {
  background-color: #1f4cb3;
}
</style>
