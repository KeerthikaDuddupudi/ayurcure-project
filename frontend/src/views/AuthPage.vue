<template>
  <div class="auth-page">
    <div :class="['container', { 'right-panel-active': isSignUpActive }]">
      <!-- Sign Up Form -->
      <div class="form-container sign-up-container">
        <form @submit.prevent="handleSignUp">
          <h1>Join AyurCure</h1>
          <p class="subtitle">Discover holistic remedies tailored for you.</p>
          <input type="text" placeholder="Full Name" v-model="signUp.name" required />
          <input type="text" placeholder="Phone Number" v-model="signUp.phone" required />
          <input type="date" v-model="signUp.dob" required />
          <select v-model="signUp.gender" required>
            <option disabled value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          <input type="email" placeholder="Email" v-model="signUp.email" required />
          <input type="password" placeholder="Password" v-model="signUp.password" required />
          <input type="password" placeholder="Confirm Password" v-model="signUp.confirmPassword" required />
          <button :disabled="loading">{{ loading ? 'Signing Up...' : 'Sign Up' }}</button>
          <p v-if="message" :style="{ color: messageColor }">{{ message }}</p>
        </form>
      </div>

      <!-- Login Form -->
      <div class="form-container sign-in-container" v-if="!showForgotPassword">
        <form @submit.prevent="handleLogin">
          <h1>Login to AyurCure</h1>
          <p class="subtitle">Access your personalized Ayurvedic wellness dashboard.</p>
          <input type="email" placeholder="Email" v-model="login.email" required />
          <input type="password" placeholder="Password" v-model="login.password" required />
          <a href="#" @click.prevent="showForgotPassword = true">Forgot your password?</a>
          <button :disabled="loading">{{ loading ? 'Signing In...' : 'Sign In' }}</button>
          <p v-if="message" :style="{ color: messageColor }">{{ message }}</p>
        </form>
      </div>

      <!-- Forgot Password -->
      <div class="form-container sign-in-container" v-else>
        <form @submit.prevent="handleReset">
          <h1>Reset Password</h1>
          <p class="subtitle">We’ll send a recovery link to your email.</p>
          <input type="email" placeholder="Enter your email" v-model="reset.email" required />
          <button :disabled="loading">{{ loading ? 'Sending...' : 'Reset' }}</button>
          <a href="#" @click.prevent="showForgotPassword = false">← Back to Login</a>
          <p v-if="message" :style="{ color: messageColor }">{{ message }}</p>
        </form>
      </div>

      <!-- Overlay Panels -->
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1 style="color:white;">Welcome Back to AyurCure!</h1>
            <p>Your path to natural wellness continues here.<br />Please log in with your personal details.</p>
            <button class="ghost" @click="switchToSignIn">Sign In</button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1 style="color:white;">Welcome to AyurCure</h1>
            <p>Your natural health companion awaits!<br />Create your account and begin your healing journey today.</p>
            <button class="ghost" @click="switchToSignUp">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import axios from 'axios';
import HomeNav from '@/components/HomeNav.vue';

export default {
  name: 'Authentication',
  data() {
    return {
      isSignUpActive: false,
      showForgotPassword: false,
      loading: false,
      login: {
        email: '',
        password: ''
      },
      signUp: {
        name: '',
        phone: '',
        dob: '',
        gender: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      reset: {
        email: ''
      },
      message: '',
      messageColor: 'green'
    };
  },
  methods: {
    switchToSignUp() {
      this.isSignUpActive = true;
      this.showForgotPassword = false;
      this.clearMessage();
      this.clearForms();
    },
    switchToSignIn() {
      this.isSignUpActive = false;
      this.showForgotPassword = false;
      this.clearMessage();
      this.clearForms();
    },
    clearMessage() {
      this.message = '';
      this.messageColor = 'green';
    },
    clearForms() {
      this.login = { email: '', password: '' };
      this.signUp = {
        name: '',
        phone: '',
        dob: '',
        gender: '',
        email: '',
        password: '',
        confirmPassword: ''
      };
      this.reset = { email: '' };
    },

    async handleSignUp() {
      if (this.signUp.password !== this.signUp.confirmPassword) {
        this.message = "Passwords do not match!";
        this.messageColor = 'red';
        return;
      }

      this.loading = true;
      try {
        const payload = {
          name: this.signUp.name,
          phone: this.signUp.phone,
          email: this.signUp.email,
          password: this.signUp.password,
          gender: this.signUp.gender,
          dob: this.signUp.dob,
        };

        const { data } = await axios.post('http://localhost:5000/api/auth/signup', payload);

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('userEmail', data.user.email);
        this.$router.push('/home');
      } catch (err) {
        this.message = err.response?.data?.message || 'Signup failed.';
        this.messageColor = 'red';
      } finally {
        this.loading = false;
      }
    },

    async handleLogin() {
      this.loading = true;
      try {
        const { data } = await axios.post('http://localhost:5000/api/auth/login', this.login);

        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('userEmail', data.user.email);
        this.$router.push('/home');
      } catch (err) {
        this.message = err.response?.data?.message || 'Login failed.';
        this.messageColor = 'red';
      } finally {
        this.loading = false;
      }
    },

    async handleReset() {
      this.loading = true;
      try {
        const { data } = await axios.post('http://localhost:5000/api/auth/reset-password', this.reset);

        this.message = data.message || 'Recovery link sent to your email.';
        this.messageColor = 'green';
        this.reset.email = '';

        setTimeout(() => {
          this.showForgotPassword = false;
        }, 3000);
      } catch (err) {
        this.message = err.response?.data?.message || 'Reset failed.';
        this.messageColor = 'red';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

.auth-page {
  position: relative;
  font-family: 'Montserrat', sans-serif;
  background: url('../assets/1.jpg') no-repeat center center fixed;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  filter: brightness(1.1);
}

.auth-page::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgba(0, 0, 0, 0.35);
  z-index: 0;
}

.container {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
  z-index: 1;
  display: flex;
  justify-content: center;
}

.form-container {
  position: absolute;
  top: 0;
  width: 50%;
  height: 100%;
  transition: all 0.6s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(15px);
}

.sign-in-container {
  left: 0;
  z-index: 2;
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

.sign-up-container {
  left: 0;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  z-index: 1;
}

.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
  z-index: 5;
}

form {
  width: 80%;
  max-width: 340px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

h1 {
  color: #1b5e20;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 13px;
  color: #333;
  margin-bottom: 15px;
}

input,
select {
  background: #f1f1f1;
  border: none;
  padding: 5px 8px;
  margin: 8px 0;
  width: 100%;
  border-radius: 20px;
  font-size: 14px;
  appearance: none;
}

button {
  border-radius: 20px;
  border: 1px solid #1b5e20;
  background-color: #1b5e20;
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

button:active {
  transform: scale(0.95);
}

button.ghost {
  background-color: transparent;
  border: 1px solid #fff;
}

a {
  color: #1b5e20;
  text-decoration: none;
  font-size: 13px;
  margin-top: 8px;
}

.overlay-container {
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.6s ease-in-out;
  z-index: 100;
}

.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}

.overlay {
  background: rgba(27, 94, 32, 0.9);
  height: 100%;
  width: 200%;
  position: relative;
  left: -100%;
  display: flex;
  transition: transform 0.6s ease-in-out;
}

.container.right-panel-active .overlay {
  transform: translateX(50%);
}

.overlay-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 30px;
  height: 100%;
  width: 50%;
  color: #fff;
  line-height: 1.4;
}

.overlay-left {
  transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
  transform: translateX(0);
}

.overlay-right {
  right: 0;
  transform: translateX(0);
}

.container.right-panel-active .overlay-right {
  transform: translateX(20%);
}
</style>
