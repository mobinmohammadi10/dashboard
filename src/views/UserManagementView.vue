<template>
  <div class="container mx-auto px-10 pl-20 py-10 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-200 min-h-screen">
    <!-- Requested Users Table -->
    <h2 class="text-2xl font-bold mb-4">Requested Users</h2>
    <table class="w-full table-auto border-collapse mb-8">
      <thead>
        <tr class="bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 uppercase text-sm leading-normal">
          <th class="py-3 px-6 text-left">ID</th>
          <th class="py-3 px-6 text-left">Name</th>
          <th class="py-3 px-6 text-center">Actions</th>
        </tr>
      </thead>
      <tbody class="text-gray-600 dark:text-gray-300 text-sm font-light">
        <tr v-for="user in requestedUsers" :key="user.id" class="border-b border-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
          <td class="py-3 px-6 text-left">{{ user.id }}</td>
          <td class="py-3 px-6 text-left">{{ user.name }}</td>
          <td class="py-3 px-6 text-center">
            <button @click="acceptUser(user)" class="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 mr-2">Accept</button>
            <button @click="deleteUser(user.id)" class="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Accepted Users Table -->
    <h2 class="text-2xl font-bold mb-4">Accepted Users</h2>
    <table class="w-full table-auto border-collapse">
      <thead>
        <tr class="bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 uppercase text-sm leading-normal">
          <th class="py-3 px-6 text-left">Photo</th>
          <th class="py-3 px-6 text-left">ID</th>
          <th class="py-3 px-6 text-left">Name</th>
          <th class="py-3 px-6 text-left">Email</th>
          <th class="py-3 px-6 text-center"></th>
        </tr>
      </thead>
      <tbody class="text-gray-600 dark:text-gray-300 text-sm font-light">
        <tr v-for="user in acceptedUsers" :key="user.id" class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700">
          <td class="py-3 px-6 text-left">
            <img :src="user.profilePhoto" alt="Profile Photo" class="w-10 h-10 rounded-full object-cover">
          </td>
          <td class="py-3 px-6 text-left">{{ user.id }}</td>
          <td class="py-3 px-6 text-left">{{ user.name }}</td>
          <td class="py-3 px-6 text-left">{{ user.email }}</td>
          <td class="py-3 px-6 text-center">
            <button @click="editCalendar(user)" class="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">Edit Calendar</button>
          </td>
        </tr>
      </tbody>
    </table>
    <CalendarView v-if="showCalendarView" :user="selectedUser" @close="closeCalendar" />
    <button v-if="showCalendarView" @click="closeCalendar" class="close-button bg-red-500 text-white px-4 py-2 rounded mt-4">
      Close
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import CalendarView from './CalendarView.vue';

// Reactive state
const requestedUsers = ref([]);

const acceptedUsers = ref([]);

const showCalendarView = ref(false);
const selectedUser = ref(null);

// Helper function to save data to localStorage
function saveToLocalStorage() {
  localStorage.setItem('requestedUsers', JSON.stringify(requestedUsers.value));
  localStorage.setItem('acceptedUsers', JSON.stringify(acceptedUsers.value));
}

// Load data from localStorage on component mount
onMounted(() => {
  const storedRequestedUsers = localStorage.getItem('requestedUsers');
  const storedAcceptedUsers = localStorage.getItem('acceptedUsers');
  
  // Initialize data from localStorage or default values
  requestedUsers.value = storedRequestedUsers ? JSON.parse(storedRequestedUsers) : [
    { id: 1, name: 'User A' },
    { id: 2, name: 'User B' },
    // ... other
  ];

  acceptedUsers.value = storedAcceptedUsers ? JSON.parse(storedAcceptedUsers) : [
    { id: 3, name: 'User C', email: 'userc@example.com', profilePhoto: 'https://via.placeholder.com/40' },
    // ... other
  ];
});

// Methods
function acceptUser(user) {
  acceptedUsers.value.push({
    ...user,
    email: `${user.name.toLowerCase()}@example.com`,
  });
  requestedUsers.value = requestedUsers.value.filter(u => u.id !== user.id);
  saveToLocalStorage();
}

function deleteUser(userId) {
  requestedUsers.value = requestedUsers.value.filter(user => user.id !== userId);
  saveToLocalStorage();
}

function editCalendar(user) {
  selectedUser.value = user;
  showCalendarView.value = true;
}

function closeCalendar() {
  showCalendarView.value = false;
  selectedUser.value = null;
}
</script>

<style scoped>
.close-button {
  display: block;
  margin: 1rem auto; 
}
</style>
