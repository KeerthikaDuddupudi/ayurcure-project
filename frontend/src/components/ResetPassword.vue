<template>
  <div class="reset-container">
    <form @submit.prevent="handleReset">
      <h1>Reset Your Password</h1>

      <input
        type="password"
        placeholder="New Password"
        v-model="newPassword"
        required
      />

      <input
        type="password"
        placeholder="Confirm Password"
        v-model="confirmPassword"
        required
      />

      <button type="submit" :disabled="isLoading">
        {{ isLoading ? "Resetting..." : "Reset Password" }}
      </button>

      <p v-if="message" :style="{ color: messageColor }">{{ message }}</p>
    </form>
  </div>
</template>

<script>
export default {
  name: "ResetPassword",
  data() {
    return {
      newPassword: '',
      confirmPassword: '',
      message: '',
      messageColor: 'green',
      isLoading: false
    };
  },
  methods: {
    async handleReset() {
      const token = this.$route.params.token;

      if (this.newPassword !== this.confirmPassword) {
        this.message = "Passwords do not match.";
        this.messageColor = "red";
        return;
      }

      if (this.newPassword.length < 6) {
        this.message = "Password must be at least 6 characters.";
        this.messageColor = "red";
        return;
      }

      this.isLoading = true;

      try {
        const res = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ newPassword: this.newPassword })
        });

        const data = await res.json();

        if (!res.ok) {
          this.message = data.message || "Password reset failed.";
          this.messageColor = "red";
        } else {
          this.message = "✅ Password reset successful! Redirecting to login...";
          this.messageColor = "green";
          setTimeout(() => {
            this.$router.push("/auth");
          }, 2000);
        }
      } catch (err) {
        this.message = "❌ Server error. Try again later.";
        this.messageColor = "red";
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>

<style scoped>
.reset-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(to right, #a8e063, #56ab2f);
}

form {
  background: white;
  padding: 30px 40px;
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 90%;
  max-width: 400px;
}

h1 {
  text-align: center;
  color: #1b5e20;
}

input {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 15px;
}

button {
  background-color: #1b5e20;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  font-size: 15px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #2e7d32;
}

button:disabled {
  background-color: #a5d6a7;
  cursor: not-allowed;
}

p {
  text-align: center;
  font-size: 14px;
  margin-top: 8px;
}
</style>
