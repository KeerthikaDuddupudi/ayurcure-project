<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- Brand Info -->
      <div class="footer-column">
        <h2>{{ $t('footer.brandTitle') || 'CureEase' }}</h2>
        <p>{{ $t('footer.brandDesc') || 'Your trusted home for natural health remedies and doctor consultations.' }}</p>
      </div>

      <!-- Quick Links -->
      <div class="footer-column">
        <h3>{{ $t('footer.quickLinks.title') || 'Quick Links' }}</h3>
        <ul>
          <li><RouterLink to="/home" aria-label="Home Page">{{ $t('footer.quickLinks.home') || 'Home' }}</RouterLink></li>
          <li><RouterLink to="/remedies" aria-label="Remedies">{{ $t('footer.quickLinks.remedies') || 'Remedies' }}</RouterLink></li>
          <li><RouterLink to="/doctors" aria-label="Doctors">{{ $t('footer.quickLinks.doctors') || 'Doctors' }}</RouterLink></li>
        </ul>
      </div>

      <!-- Features -->
      <div class="footer-column">
        <h3>{{ $t('footer.features.title') || 'Features' }}</h3>
        <ul>
          <li>{{ $t('footer.features.symptom') || 'Symptom Checker' }}</li>
          <li>{{ $t('footer.features.remedies') || 'Home Remedies' }}</li>
          <li>{{ $t('footer.features.consult') || 'Consult a Doctor' }}</li>
          <li>{{ $t('footer.features.emergency') || 'Emergency Help' }}</li>
          <li>{{ $t('footer.features.reminders') || 'Health Reminders' }}</li>
        </ul>
      </div>

      <!-- Contact Info -->
      <div class="footer-column">
        <h3>{{ $t('footer.contact.title') || 'Contact Us' }}</h3>
        <p>📍 {{ $t('footer.contact.location') || 'India' }}</p>
        <p>📞 <a href="tel:+919876543210">{{ $t('footer.contact.phone') || '+91-9876543210' }}</a></p>
        <p>✉️ <a href="mailto:support@cureease.com">{{ $t('footer.contact.email') || 'support@cureease.com' }}</a></p>
      </div>
    </div>

    <!-- Bottom Line -->
    <div class="footer-bottom">
      <p>&copy; 2025 {{ $t('footer.copyright') || 'CureEase. All rights reserved.' }}</p>
    </div>

    <!-- Floating Call Button -->
    <a href="tel:+919876543210" class="call-btn" title="Call CureEase" aria-label="Call CureEase">
      📞
    </a>
  </footer>
</template>

<script setup>
// No script needed — purely presentational
</script>

<style scoped>
.footer {
  background-color: #103e2e;
  color: #f5f5f5;
  padding: 60px 20px 40px;
  font-family: 'Poppins', sans-serif;
  position: relative;
}

.footer-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-column h2,
.footer-column h3 {
  color: #ffc107;
  margin-bottom: 16px;
  font-size: 20px;
}

.footer-column p,
.footer-column li {
  font-size: 14px;
  line-height: 1.7;
  color: #e0e0e0;
}

.footer-column a {
  color: #e0e0e0;
  text-decoration: none;
  transition: 0.3s ease;
}

.footer-column a:hover {
  color: #ffc107;
  text-decoration: underline;
}

.footer-column ul {
  list-style: none;
  padding-left: 0;
}

.footer-bottom {
  text-align: center;
  font-size: 13px;
  padding-top: 20px;
  margin-top: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  color: #bbb;
}

/* Call Button */
.call-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #ffc107;
  color: #000;
  padding: 14px 16px;
  border-radius: 50%;
  font-size: 22px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
  z-index: 999;
  transition: all 0.3s ease;
  text-align: center;
  text-decoration: none;
}

.call-btn:hover {
  transform: scale(1.15);
  background-color: #e6ac00;
}
</style>
