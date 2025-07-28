<template>
  <div class="container">
    <h2 class="title">Saved Remedies</h2>

    <div v-if="savedRemedies.length" class="remedy-grid">
      <div
        v-for="(item, index) in savedRemedies"
        :key="item._id"
        class="remedy-card"
      >
        <button class="remove-btn" @click="handleRemove(item._id)">×</button>

        <h3 class="remedy-title">{{ item.remedy.title }}</h3>

        <ul>
          <li><strong>Plant :</strong> {{ item.remedy.plant }}</li>
          <li><strong>Part Used :</strong> {{ item.remedy.partUsed }}</li>

          <li v-if="item.remedy.ingredients">
            <strong>Ingredients :</strong>
            <ul>
              <li v-for="(ing, i) in item.remedy.ingredients" :key="i">- {{ ing }}</li>
            </ul>
          </li>

          <li><strong>Preparation:</strong> {{ item.remedy.preparation }}</li>
          <li><strong>Dosage :</strong> {{ item.remedy.dosage || item.remedy.usage }}</li>

          <li v-if="item.remedy.benefits">
            <strong>Benefits :</strong>
            <ul>
              <li v-for="(benefit, i) in item.remedy.benefits" :key="i">- {{ benefit }}</li>
            </ul>
          </li>

          <li v-if="item.remedy.caution">
            <strong>Caution :</strong> {{ item.remedy.caution }}
          </li>
        </ul>

        <!-- ✅ Download PDF Button -->
        <div class="download-btn-container">
          <button class="download-btn" @click="downloadRemedyAsPDF(item.remedy)">
            Download as PDF
          </button>
        </div>
      </div>
    </div>

    <p v-else class="no-remedies">No remedies saved yet.</p>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useSavedRemedies } from '@/composables/savedRemedies'
import jsPDF from 'jspdf'

const {
  savedRemedies,
  userEmail,
  loadEmailFromStorage,
  fetchSavedRemedies,
  removeRemedy
} = useSavedRemedies()

const handleRemove = async (id) => {
  await removeRemedy(id)
}

onMounted(async () => {
  loadEmailFromStorage()
  if (userEmail.value) {
    await fetchSavedRemedies()
  } else {
    console.warn('⚠️ No userEmail found in localStorage.')
  }
})

// ✅ Download remedy as PDF
const downloadRemedyAsPDF = (remedy) => {
  const doc = new jsPDF()
  doc.setFontSize(16)
  doc.text(remedy.title, 20, 20)

  let y = 30
  const lineHeight = 10

  const addLine = (label, value) => {
    if (value) {
      doc.setFont(undefined, 'bold')
      doc.text(`${label}:`, 20, y)
      doc.setFont(undefined, 'normal')
      doc.text(value, 60, y)
      y += lineHeight
    }
  }

  addLine("Plant", remedy.plant)
  addLine("Part Used", remedy.partUsed)
  addLine("Preparation", remedy.preparation)
  addLine("Dosage", remedy.dosage || remedy.usage)

  if (remedy.ingredients?.length) {
    doc.setFont(undefined, 'bold')
    doc.text("Ingredients:", 20, y)
    y += lineHeight
    remedy.ingredients.forEach(ing => {
      doc.setFont(undefined, 'normal')
      doc.text(`- ${ing}`, 30, y)
      y += lineHeight
    })
  }

  if (remedy.benefits?.length) {
    doc.setFont(undefined, 'bold')
    doc.text("Benefits:", 20, y)
    y += lineHeight
    remedy.benefits.forEach(benefit => {
      doc.setFont(undefined, 'normal')
      doc.text(`- ${benefit}`, 30, y)
      y += lineHeight
    })
  }

  addLine("Caution", remedy.caution || "None")

  doc.save(`${remedy.title.replace(/\s+/g, '_')}_remedy.pdf`)
}
</script>

<style scoped>
.container {
  padding: 2rem;
  max-width: 1300px;
  margin: 100px auto 0;
}

.title {
  text-align: center;
  font-size: 2.2rem;
  color: #2e7d32;
  margin-bottom: 2rem;
  font-weight: bold;
}

.remedy-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.remedy-card {
  background: #ffffff;
  padding: 20px 18px;
  border-radius: 20px;
  border-left: 6px solid #66bb6a;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.08);
  animation: slideFadeIn 0.6s ease;
  transition: transform 0.3s ease;
  position: relative;
}

.remedy-card:hover {
  transform: scale(1.02);
}

.remedy-title {
  font-size: 20px;
  background: linear-gradient(to right, #2e7d32, #66bb6a);
  color: white;
  padding: 10px 16px;
  border-radius: 12px;
  margin-bottom: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.remedy-card ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.remedy-card ul li {
  padding: 8px 0;
  border-bottom: 1px solid #eee;
  font-size: 17px;
  line-height: 32px;
  display: flex;
}

.remedy-card ul li strong {
  width: 110px;
  color: #2e7d32;
}

.remove-btn {
  position: absolute;
  top: 30px;
  right: 30px;
  background: #ff4444;
  color: white;
  border: none;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1rem;
}

/* ✅ Centered Download Button */
.download-btn-container {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}

.download-btn {
  background: #2e7d32;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s ease;
}

.download-btn:hover {
  background: #1b5e20;
}

.no-remedies {
  text-align: center;
  color: #666;
  font-size: 1.1rem;
}

/* Dark theme */
body.dark-theme .container {
  background: #121212;
}

body.dark-theme .title {
  color: #66bb6a;
}

body.dark-theme .remedy-card {
  background: #1e1e1e;
  color: #ffffff;
  border-left: 6px solid #66bb6a;
}

body.dark-theme .remedy-card ul li {
  color: white;
  border-bottom: 1px solid #333;
}

body.dark-theme .remedy-card ul li strong {
  color: #66bb6a;
}

body.dark-theme .no-remedies {
  color: #888;
}

body.dark-theme .remedy-title {
  background: linear-gradient(to right, #2e7d32, #66bb6a);
  color: white;
}

body.dark-theme .download-btn {
  background: #66bb6a;
  color: black;
}

body.dark-theme .download-btn:hover {
  background: #81c784;
}

@keyframes slideFadeIn {
  from {
    opacity: 0;
    transform: translateY(25px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
