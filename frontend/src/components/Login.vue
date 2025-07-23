<template>
  <div class="form-card">
    <form @submit.prevent="login">
      <input
        type="email"
        v-model="email"
        placeholder="Email address"
        required
      />
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        required
      />

      <div class="forgot-link" @click="$emit('forgot-password')">
        Forgot password?
      </div>

      <button type="submit">Sign In</button>

      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">{{ success }}</p>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
      success: "",
    };
  },
  methods: {
    async login() {
      this.error = "";
      this.success = "";

      try {
        const response = await axios.post("http://localhost:5000/api/auth/login", {
          email: this.email,
          password: this.password,
        });

        if (response.data.success) {
          this.success = "Login successful!";

          // ✅ Store email in localStorage
          localStorage.setItem("loggedInEmail", this.email);

          // Optionally emit to parent
          this.$emit("login-success", response.data.user);
        } else {
          this.error = response.data.message || "Login failed.";
        }
      } catch (err) {
        this.error = err.response?.data?.message || "Server error. Please try again.";
      }
    },
  },
};
</script>

<style scoped>
.form-card {
  max-width: 350px;
  margin: 80px auto;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 12px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

input {
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
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
  font-size: 16px;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #2f855a;
}

.forgot-link {
  color: #2f855a;
  font-size: 14px;
  margin-bottom: 10px;
  text-align: right;
  cursor: pointer;
  transition: color 0.2s;
}

.forgot-link:hover {
  color: #276749;
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
}

.success {
  color: green;
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
}
</style>
