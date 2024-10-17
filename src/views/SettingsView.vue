<template>
  <div class="max-w-2xl mx-auto p-8 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow-lg transition-all duration-300">
    <!-- Personal Information Section -->
    <h2 class="text-2xl font-semibold mb-6">Personal Information</h2>
    <div class="flex items-center space-x-4 mb-6">
      <img class="w-20 h-20 rounded-full object-cover" :src="user.pictureUrl" alt="User Picture">
      <div class="flex-1">
        <label class="block text-sm font-medium mb-1">First Name</label>
        <input type="text" v-model="user.firstName" class="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600">

        <label class="block text-sm font-medium mb-1 mt-4">Last Name</label>
        <input type="text" v-model="user.lastName" class="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600">

        <label class="block text-sm font-medium mb-1 mt-4">Email Address</label>
        <input type="email" v-model="user.email" class="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600">
      </div>
    </div>
    <button @click="savePersonalInfo" class="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition mb-8">
      Save Changes
    </button>

    <!-- App Settings Section -->
    <h2 class="text-2xl font-semibold mb-6">App Settings</h2>

    <!-- Dark Mode Toggle -->
    <div class="flex items-center justify-between mb-6">
      <label class="text-sm font-medium">Dark Mode</label>
      <button @click="toggleDarkMode" class="relative inline-flex items-center w-12 h-6 bg-gray-300 rounded-full transition">
        <span class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform" :class="darkMode ? 'translate-x-6' : ''"></span>
      </button>
    </div>

    <!-- Font Size Slider -->
    <div class="mb-6">
      <label for="font-size" class="block text-sm font-medium mb-2">Font Size</label>
      <input type="range" id="font-size" v-model="fontSize" min="12" max="24" class="w-full">
      <span class="block text-sm mt-2">{{ fontSize }}px</span>
    </div>

    <!-- Notifications Toggle -->
    <div class="flex items-center justify-between mb-6">
      <label class="text-sm font-medium">Reminder Notifications</label>
      <button @click="toggleNotifications" class="relative inline-flex items-center w-12 h-6 bg-gray-300 rounded-full transition">
        <span class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform" :class="notifications ? 'translate-x-6' : ''"></span>
      </button>
    </div>

    <!-- Change Password Section -->
    <h2 class="text-2xl font-semibold mb-6">Change Password</h2>
    <div class="mb-6">
      <label for="current-password" class="block text-sm font-medium mb-1">Current Password</label>
      <input id="current-password" type="password" v-model="currentPassword" class="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600">

      <label for="new-password" class="block text-sm font-medium mb-1 mt-4">New Password</label>
      <input id="new-password" type="password" v-model="newPassword" class="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600">

      <label for="confirm-password" class="block text-sm font-medium mb-1 mt-4">Confirm Password</label>
      <input id="confirm-password" type="password" v-model="confirmPassword" class="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600">
    </div>
    <button @click="changePassword" class="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition mb-8">
      Save Password
    </button>

    <!-- Log Out Section -->
    <h2 class="text-2xl font-semibold mb-6">Log Out</h2>
    <div class="mb-6">
      <label for="logout-password" class="block text-sm font-medium mb-2">Enter Password to Log Out</label>
      <input id="logout-password" type="password" v-model="logoutPassword" class="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600">
    </div>
    <button @click="logOut" class="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition">
      Log Out
    </button>
  </div>
</template>

<script setup>
import { ref, inject } from 'vue'

const user = ref({
  firstName: '',
  lastName: '',
  email: '',
  pictureUrl: 'https://via.placeholder.com/150'
});

// Inject global dark mode and font size from the provider
const darkMode = inject('darkMode');
const fontSize = inject('fontSize');

const notifications = ref(false);
const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const logoutPassword = ref('');

// Methods to handle various actions
const savePersonalInfo = () => {

};

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value;
  document.documentElement.classList.toggle('dark', darkMode.value);
  localStorage.setItem('darkMode', darkMode.value);
};

const toggleNotifications = () => {
  notifications.value = !notifications.value;
};

const changePassword = () => {
  if (newPassword.value !== confirmPassword.value) {
    alert('Passwords do not match.');
  } else {

  }
};

const logOut = () => {
  if (logoutPassword.value === '') {
    alert('Please enter your password to log out.');
  } else {
  
  }
};
</script>

<style scoped>
body {
  transition: background-color 0.3s ease, color 0.3s ease;
}
</style>
