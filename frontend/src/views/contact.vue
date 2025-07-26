<template>
  <div class="contact-page-container">
    <div class="contact-content-wrapper">
      <div class="form-panel">
        <form @submit.prevent="handleSubmit">
          <h1>{{ $t('Contact') }}</h1>
          <p class="subtitle">{{ $t('We are here to Help You.') }}</p>
          <input type="text" :placeholder="$t('Your name')" v-model="form.name" required />
          <input type="email" :placeholder="$t('Your email')" v-model="form.email" required />
          <input type="text" :placeholder="$t('Subject of your Message')" v-model="form.subject" required />
          <textarea :placeholder="$t('MESSAGE')" v-model="form.message" rows="5" required></textarea>
          <button type="submit">{{ $t('SUBMIT') }}</button>
        </form>
      </div>

      <div class="info-panel">
        <h1>{{ $t('Our Details') }}</h1>
        <div class="info-item">
          <strong>{{ $t('contact.addressLabel') }}</strong>
          <p>{{ $t('contact.address') }}</p>
        </div>
        <div class="info-item">
          <strong>{{ $t('contact.emailLabel') }}</strong>
          <p>{{ $t('contact.email') }}</p>
        </div>
        <div class="info-item">
          <strong>{{ $t('contact.phoneLabel') }}</strong>
          <p>{{ $t('contact.phone') }}</p>
        </div>
        <div class="info-item">
          <strong>{{ $t('contact.hoursLabel') }}</strong>
          <p>{{ $t('contact.hours') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});

const handleSubmit = async () => {
  try {
    await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    });

    alert(t('contact.successMessage'));
    form.value = { name: '', email: '', subject: '', message: '' };
  } catch (error) {
    console.error('Submission failed:', error);
    alert('Failed to send message. Try again.');
  }
};

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

.contact-page-container {
  position: relative;
  font-family: 'Montserrat', sans-serif;
  background-color: rgb(180, 243, 189);
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  filter: brightness(1.1);
  padding: 20px;
  margin-top: 60px;
}

.contact-page-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.35);
  z-index: 0;
}

.contact-content-wrapper {
  display: flex;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  width: 90%;
  max-width: 1000px;
  min-height: 550px;
  z-index: 1;
  overflow: hidden;
}

.form-panel {
  flex: 1;
  padding: 40px;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(15px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.form-panel form {
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
}

.form-panel h1 {
  color: #1b5e20;
  margin-bottom: 10px;
  font-size: 2.5rem;
}

.form-panel .subtitle {
  font-size: 14px;
  color: #333;
  margin-bottom: 20px;
}

.form-panel input,
.form-panel textarea {
  background: #f1f1f1;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  border-radius: 10px;
  font-size: 14px;
  font-family: 'Montserrat', sans-serif;
}

.form-panel textarea {
  resize: vertical;
}

.form-panel button {

  border-radius: 10px;
  border: 1px solid #1b5e20;
  background: linear-gradient(45deg, #1e5631, #3cb371);
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  cursor: pointer;
  margin-top: 12px;
}

.info-panel {
  flex: 1;
  padding: 40px;
  background: rgba(27, 94, 32, 0.9);
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  text-align: left;
}

.info-panel h1 {
  font-size: 28px;
  margin-bottom: 30px;
}

.info-item {
  margin-bottom: 20px;
}

.info-item strong {
  display: block;
  font-size: 16px;
  margin-bottom: 5px;
  color: #e8e8e8;
}
.info-item p {
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
}

@media (max-width: 768px) {
  .contact-content-wrapper {
    flex-direction: column;
  }

  .form-panel,
  .info-panel {
    width: 100%;
  }

  .form-panel {
    padding: 20px;
  }

  .info-panel {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

</style>