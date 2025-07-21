<template>
  <div class="form-card">
    <h2>Forgot Password</h2>
    <form @submit.prevent="recover">
      <input
        type="email"
        v-model="email"
        placeholder="Email address"
        required
        :disabled="loading"
      />
      <button type="submit" :disabled="loading">
        {{ loading ? "Sending..." : "Send Recovery Link" }}
      </button>
    </form>
    <p v-if="message" :style="{ color: messageColor }">{{ message }}</p>
  </div>
</template>

<script>
export default {
  name: "ForgotPassword",
  data() {
    return {
      email: '',
      message: '',
      messageColor: 'green',
      loading: false,
    };
  },
  methods: {
    async recover() {
      this.loading = true;
      this.message = '';

      try {
        const res = await fetch('http://localhost:5000/api/auth/reset-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: this.email }),
        });

        const data = await res.json();

        if (!res.ok) {
          this.message = data.message || 'Something went wrong';
          this.messageColor = 'red';
        } else {
          this.message = data.message || 'Recovery link sent!';
          this.messageColor = 'green';
          this.email = ''; // Clear input
        }
      } catch (err) {
        this.message = 'Failed to send request. Please try again.';
        this.messageColor = 'red';
      } finally {
        this.loading = false;
        // Optional: auto-clear message after 5 seconds
        setTimeout(() => this.message = '', 5000);
      }
    },
  },
};
</script>

<style scoped>
.form-card {
  max-width: 350px;
  margin: 40px auto;
  padding: 20px;
  background: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  font-family: 'Segoe UI', sans-serif;
}
h2 {
  text-align: center;
  color: #1b5e20;
  margin-bottom: 20px;
}
input {
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 14px;
}
button {
  width: 100%;
  padding: 10px;
  background-color: #1b5e20;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
}
button:disabled {
  background-color: #9e9e9e;
  cursor: not-allowed;
}
p {
  margin-top: 10px;
  text-align: center;
  font-size: 14px;
}
</style>
