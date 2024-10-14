<template>
  <div :class="['max-w-lg mx-auto p-6 shadow-lg rounded-lg transition-all duration-300', settings.darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black']">
    <h1 class="text-2xl font-semibold mb-6">User Settings</h1>

    <!-- Notification Settings with Toggle -->
    <div class="flex items-center justify-between mb-6">
      <label for="notifications" class="font-medium">Notifications for shift reminder</label>
      <label class="relative inline-block w-12 h-6">
        <input type="checkbox" v-model="settings.notifications" id="notifications" class="sr-only">
        <span class="slider block w-full h-full bg-gray-300 rounded-full cursor-pointer"></span>
        <span class="dot absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform transform" :class="{ 'translate-x-6': settings.notifications }"></span>
      </label>
    </div>
    <p v-if="settings.notifications" class="text-sm text-green-500 mb-6">Notifications enabled.</p>
    <p v-else class="text-sm text-red-500 mb-6">Notifications disabled.</p>

    <!-- Dark Mode Toggle -->
    <div class="flex items-center justify-between mb-6">
      <label for="dark-mode" class="font-medium">Dark Mode</label>
      <label class="relative inline-block w-12 h-6">
        <input type="checkbox" v-model="settings.darkMode" id="dark-mode" class="sr-only">
        <span class="slider block w-full h-full bg-gray-300 rounded-full cursor-pointer"></span>
        <span class="dot absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform transform" :class="{ 'translate-x-6': settings.darkMode }"></span>
      </label>
    </div>
    <p v-if="settings.darkMode" class="text-sm text-green-500 mb-6">Dark mode is on.</p>
    <p v-else class="text-sm text-red-500 mb-6">Dark mode is off.</p>

    <!-- Font Size -->
    <div class="mb-6">
      <label for="font-size" class="block font-medium mb-2">Font Size</label>
      <input type="range" v-model="settings.fontSize" id="font-size" min="12" max="24" class="w-full">
      <span class="block text-sm mt-2">{{ settings.fontSize }}px</span>
    </div>

    <!-- Change Password -->
    <div class="mb-6">
      <button @click="togglePasswordForm" class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
        Change Password
      </button>
      <div v-if="showPasswordForm" class="mt-4 space-y-4">
        <input type="password" v-model="oldPassword" placeholder="Previous password" class="w-full p-2 border rounded" :class="{ 'bg-gray-900 text-white': settings.darkMode, 'bg-white text-black': !settings.darkMode }">
        <input type="password" v-model="newPassword" placeholder="New password" class="w-full p-2 border rounded" :class="{ 'bg-gray-900 text-white': settings.darkMode, 'bg-white text-black': !settings.darkMode }">
        <input type="password" v-model="confirmPassword" placeholder="Repeat new password" class="w-full p-2 border rounded" :class="{ 'bg-gray-900 text-white': settings.darkMode, 'bg-white text-black': !settings.darkMode }">
        <button @click="changePassword" class="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition">
          Update Password
        </button>
      </div>
    </div>

    <!-- Log Out Button -->
    <div class="mb-6">
      <button @click="confirmLogout" class="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition">
        Log Out
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from 'vue';

// Reactive object to hold the settings
const settings = reactive({
  notifications: false,
  darkMode: false,
  fontSize: 16
});

// State for password change form
const oldPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const showPasswordForm = ref(false);

// Methods to toggle password form and update password
const togglePasswordForm = () => {
  showPasswordForm.value = !showPasswordForm.value;
};

const changePassword = () => {
  if (newPassword.value !== confirmPassword.value) {
    alert('New passwords do not match.');
  } else if (newPassword.value.length < 6) {
    alert('Password must be at least 6 characters long.');
  } else {
    alert('Password updated successfully.');
    oldPassword.value = '';
    newPassword.value = '';
    confirmPassword.value = '';
    showPasswordForm.value = false;
  }
};

// Logout function
const confirmLogout = () => {
  if (confirm('Are you sure you want to log out?')) {
    alert('You have been logged out.');
  }
};

// Watchers for dark mode and font size changes
watch(
  () => settings.darkMode,
  (newVal) => {
    if (newVal) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', newVal);
  }
);

watch(
  () => settings.fontSize,
  (newVal) => {
    document.body.style.fontSize = `${newVal}px`;
    localStorage.setItem('fontSize', newVal);
  }
);

// On mounted, load settings from localStorage
onMounted(() => {
  const savedFontSize = localStorage.getItem('fontSize');
  if (savedFontSize) {
    settings.fontSize = parseInt(savedFontSize, 10);
    document.body.style.fontSize = `${settings.fontSize}px`;
  }

  const savedDarkMode = localStorage.getItem('darkMode');
  if (savedDarkMode !== null) {
    settings.darkMode = savedDarkMode === 'true';
    if (settings.darkMode) {
      document.documentElement.classList.add('dark');
    }
  }
});
</script>

<style scoped>
.slider {
  transition: background-color 0.3s ease;
}
.slider.block {
  background-color: #ccc;
}
.slider.round {
  border-radius: 34px;
}
.slider.round:before {
  border-radius: 50%;
}
.slider input:checked + .slider {
  background-color: #28a745;
}
.dot {
  position: absolute;
}

.dark .bg-white {
  background-color: #1a202c !important; /* Dark mode background */
}
.dark .text-black {
  color: #fff !important; /* Dark mode text color */
}
</style>

<style>
/* Global dark mode styles */
.dark {
  background-color: #1a202c;
  color: #fff;
}
</style>
