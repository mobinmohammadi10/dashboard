<template>
  <div 
    class="w-full min-h-screen mx-0 px-20 pl-20 py-10 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300"
    :style="{ fontSize: fontSize + 'px' }"> <!-- Directly apply font size -->
    
    <!-- Personal Information Section -->
    <h2 class="text-2xl font-semibold mb-6">Personal Information</h2>
    <div class="flex items-center space-x-4 mb-6">
      <input 
        type="file" 
        accept="image/*" 
        @change="onFileChange" 
        class="hidden" 
        ref="fileInput" 
      />
      <div class="flex flex-col items-center">
        <img 
          class="w-40 h-40 rounded-full object-cover cursor-pointer border-2 border-gray-300 dark:border-gray-600" 
          :src="user.pictureUrl" 
          alt="User Picture" 
          @click="triggerFileInput"
        >
        <button 
          v-if="user.pictureUrl !== 'https://via.placeholder.com/150'" 
          @click="confirmDeletePhoto" 
          class="mt-2 text-red-500 hover:underline">
          Delete Photo
        </button>
      </div>
      <div class="flex-1">
        <label class="block text-sm font-medium mb-1">Username</label>
        <input type="text" v-model="user.username" class="w-full p-2 text-sm border rounded-lg dark:bg-gray-700 dark:border-gray-600">

        <label class="block text-sm font-medium mb-1 mt-4">Email Address</label>
        <input type="email" v-model="user.email" class="w-full p-2 text-sm border rounded-lg dark:bg-gray-700 dark:border-gray-600">
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
      <input type="range" id="font-size" v-model="fontSize" min="12" max="24" class="w-full" @input="updateFontSize">
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
    <div class="mt-12">
      <h2 class="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
        Log Out
      </h2>
      <p class="text-sm text-gray-700 dark:text-gray-300 mb-4">
        Safely log out of your account. Your data will remain intact for future use.
      </p>
      <button 
        @click="logOut" 
        class="px-6 py-2 text-sm font-medium text-white bg-gray-600 rounded-full shadow-md hover:bg-gray-700 focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-800 transition-transform transform hover:scale-105">
        Log Out
      </button>
    </div>


    <!-- Delete Account Section -->
    <div class="mt-12">
      <h2 class="text-xl font-bold text-red-600 dark:text-red-400 mb-4">
        Delete Account
      </h2>
      <p class="text-sm text-gray-700 dark:text-gray-300 mb-4">
        <strong>Warning:</strong> Deleting your account is permanent and cannot be undone.
      </p>
      <button 
        @click="confirmDeleteAccount" 
        class="px-6 py-2 text-sm font-medium text-white bg-red-600 rounded-full shadow-md hover:bg-red-700 focus:ring-2 focus:ring-red-300 dark:focus:ring-red-800 transition-transform transform hover:scale-105">
        Delete Account
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

const user = ref({
  username: '',
  email: '',
  pictureUrl: localStorage.getItem('userPictureUrl') || 'https://via.placeholder.com/150' // Load from localStorage or use default image
});


const darkMode = ref(localStorage.getItem('darkMode') === 'true'); // Load initial state

// Font size state
const fontSize = ref(localStorage.getItem('fontSize') ? Number(localStorage.getItem('fontSize')) : 16); // Load from localStorage or default to 16px

const notifications = ref(false);
const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');

// Function to confirm account deletion
const confirmDeleteAccount = () => {
  const confirmDelete = confirm('Are you sure you want to delete your account? This action cannot be undone.');
  if (confirmDelete) {
    deleteAccount();
  }
};

// Function to delete account
const deleteAccount = async () => {
  try {
    const token = localStorage.getItem('jwtToken');
    const response = await axios.delete('http://localhost:3000/register', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.status === 200) {
      alert('Your account has been successfully deleted.');
      logOut();
    } else {
      alert('Failed to delete your account. Please try again.');
    }
  } catch (error) {
    console.error('Error deleting account:', error);
    alert('An error occurred while deleting your account.');
  }
};

// Function to handle file changes (upload)
const onFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      user.value.pictureUrl = e.target.result; 
      localStorage.setItem('userPictureUrl', e.target.result);
    };
    reader.readAsDataURL(file); // Read the file as a data URL
  }
};

// Function to trigger file input
const triggerFileInput = () => {
  const fileInput = document.querySelector('input[type="file"]'); 
  if (fileInput) {
    fileInput.click(); 
  }
};

// Function to confirm before deleting photo
const confirmDeletePhoto = () => {
  const confirmDelete = confirm('Are you sure you want to delete your profile photo?');
  if (confirmDelete) {
    deletePhoto();
  }
};

// Function to delete photo
const deletePhoto = () => {
  user.value.pictureUrl = 'https://via.placeholder.com/150'; 
  localStorage.setItem('userPictureUrl', 'https://via.placeholder.com/150');
  alert('Profile photo has been deleted.'); 
};

const savePersonalInfo = () => {
  
};

const toggleDarkMode = () => {
  darkMode.value = !darkMode.value;
  document.documentElement.classList.toggle('dark', darkMode.value);
  localStorage.setItem('darkMode', darkMode.value);
};

const updateFontSize = () => {
  localStorage.setItem('fontSize', fontSize.value);
};

const toggleNotifications = () => {
  notifications.value = !notifications.value;
};

const changePassword = async () => {
  if (newPassword.value !== confirmPassword.value) {
    alert('Passwords do not match.');
    return;    
  }

  if (!currentPassword.value || !newPassword.value) {
    alert('Please fill in all password fields.');
    return;
  }

  try {
    const token = localStorage.getItem('jwtToken');
    const response = await axios.put('http://localhost:3000/register', {
      currentPassword: currentPassword.value,
      newPassword: newPassword.value 
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.status === 200) {
      alert ('Password changed successfully!');
      currentPassword.value = '';
      newPassword.value = '';
      confirmPassword.value = '';
    } else {
      alert ('Failed to change password. Please try again.');
    }
  } catch (error) {
    console.error('Error changing password:', error);
    alert('An error occurred while changing the password.');
  }
};

const logOut = () => {
  const confirmLogout = confirm('Are you sure you want to log out?');
  if (confirmLogout) {
    alert('You have been logged out.');
    window.location.href= '/login';
  }
};

const fetchUserData= async() => {
  try {
    const token = localStorage.getItem('jwtToken');
    const response = await axios.get('http://localhost:3000/protected', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    if (response.status === 200) {
      const userData = response.data;
      user.value.username = userData.username;
      user.value.email = userData.email;
    } else {
      alert('Failed to fetch user data.');
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    alert('An error occurred while fetching user data.');
  }
};

// On component mount, set the font size from localStorage
//onMounted(() => {
  //document.documentElement.style.fontSize = fontSize.value + 'px';
//});
onMounted(() => {
  document.documentElement.style.fontSize = `${fontSize.value}px`;
  if (darkMode.value) {
    document.documentElement.classList.add('dark');
  }
  fetchUserData();
});

</script>

<style scoped>
html, body {
  width: 100%;
  height: 100%;
  background-color: #000;
  color: #f0f0f0;
  margin: 0;
  padding: 0;
  overflow-x: hidden; /* Prevent horizontal scrollbars */
}

html.dark {
  background-color: #000;
}

body.dark {
  background-color: #000; /* Dark background across all modes */
}
html.dark .bg-white {
  background-color: #171717; /* Replace any white backgrounds with dark shades */
}

html.dark .text-gray-900 {
  color: #f0f0f0; /* Ensure dark text becomes light */
}
</style>
