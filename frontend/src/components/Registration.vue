<template>
  <div class="form-card">
    <form @submit.prevent="register">
      <input type="text" v-model="name" placeholder="Full name" required />
      <input type="email" v-model="email" placeholder="Email address" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <input type="tel" v-model="phone" placeholder="Phone number (optional)" />
      <button type="submit">Sign Up</button>
    </form>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      phone: '',
      errorMessage: ''
    };
  },
  methods: {
    async register() {
      if (!this.name || !this.email || !this.password) {
        this.errorMessage = 'Please fill in all required fields.';
        return;
      }

      try {
        const response = await fetch('http://localhost:5000/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: this.name.trim(),
            email: this.email.trim(),
            password: this.password,
            phone: this.phone
          })
        });

        const data = await response.json();

        if (response.ok) {
          // ✅ Store email in localStorage
          localStorage.setItem('userEmail', this.email.trim());

          alert(`Registration successful!`);
          this.$router.push('/');
        } else {
          this.errorMessage = data.message || 'Registration failed.';
        }
      } catch (error) {
        this.errorMessage = 'An error occurred. Please try again.';
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>
.form-card {
  max-width: 350px;
  margin: 0 auto;
  padding: 20px;
}
input {
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
}
button {
  width: 100%;
  padding: 10px;
  background-color: #38a169;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
.error {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}
</style>
