<template>
  <div class="settings-container" :class="{ darkMode: settings.darkMode }">
    <h1>User Settings</h1>

    <!-- Notification Settings with Toggle -->
    <div class="form-group">
      <label for="notifications">Notifications for shift reminder</label>
      <label class="switch">
        <input type="checkbox" v-model="settings.notifications" id="notifications" />
        <span class="slider round"></span>
      </label>
      <p v-if="settings.notifications">Notifications enabled.</p>
      <p v-else>Notifications disabled.</p>
    </div>

    <!-- Dark Mode Toggle -->
    <div class="form-group">
      <label for="dark-mode">Dark Mode</label>
      <label class="switch">
        <input type="checkbox" v-model="settings.darkMode" id="dark-mode" />
        <span class="slider round"></span>
      </label>
      <p v-if="settings.darkMode">Dark mode is on.</p>
      <p v-else>Dark mode is off.</p>
    </div>

    <!-- Font Size -->
    <div class="form-group">
      <label for="font-size">Font Size</label>
      <input type="range" v-model="settings.fontSize" id="font-size" min="12" max="24" />
      <span>{{ settings.fontSize }}px</span>
    </div>

    <!-- Change Password -->
    <div class="form-group">
      <button @click="togglePasswordForm">Change Password</button>
      <div v-if="showPasswordForm" class="password-form">
        <input type="password" v-model="oldPassword" placeholder="Previous password" />
        <input type="password" v-model="newPassword" placeholder="New password" />
        <input type="password" v-model="confirmPassword" placeholder="Repeat new password" />
        <button @click="changePassword">Update Password</button>
      </div>
    </div>

    <!-- Log Out Button -->
    <div class="form-group logout">
      <button @click="confirmLogout">Log Out</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      settings: {
        notifications: false,
        darkMode: false,
        fontSize: 16
      },
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
      showPasswordForm: false // To show or hide password form
    }
  },
  methods: {
    togglePasswordForm() {
      this.showPasswordForm = !this.showPasswordForm
    },
    changePassword() {
      if (this.newPassword !== this.confirmPassword) {
        alert('New passwords do not match.')
      } else if (this.newPassword.length < 6) {
        alert('Password must be at least 6 characters long.')
      } else {
        // Here, you can send a request to update the password in the backend
        alert('Password updated successfully.')
        this.oldPassword = ''
        this.newPassword = ''
        this.confirmPassword = ''
        this.showPasswordForm = false // Hide form after success
      }
    },
    confirmLogout() {
      if (confirm('Are you sure you want to log out?')) {
        alert('You have been logged out.')
        // You can add code to navigate to login or perform logout action
      }
    }
  },
  watch: {
    'settings.darkMode'(newVal) {
      document.body.style.backgroundColor = newVal ? '#333' : '#fff'
      document.body.style.color = newVal ? '#fff' : '#000'
    },
    'settings.fontSize'(newVal) {
      document.body.style.fontSize = `${newVal}px`
    }
  }
}
</script>

<style scoped>
.settings-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
}

.darkMode {
  background-color: #333;
  color: #fff;
  border-color: #666;
}

.form-group {
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

label {
  margin-right: 10px;
}

input[type='range'] {
  width: 100%;
}

/* Password Form */
.password-form input {
  display: block;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;
}

button {
  padding: 10px 15px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}

/* Switch for Dark Mode & Notifications */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: '';
  height: 18px;
  width: 18px;
  left: 4px;
  bottom: 3px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #28a745;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.logout button {
  background-color: #dc3545;
}

.logout button:hover {
  background-color: #c82333;
}
</style>
