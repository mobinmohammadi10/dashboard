<template>
  <div class="container mx-auto px-10 pl-20 py-10 bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-200 min-h-screen">
    <!-- Unique ID Generation Section -->
    <h2 class="text-2xl font-bold mb-4">Admin ID</h2>
    <button 
      @click="generateUniqueId" 
      :disabled="isGenerated"
      class="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Generate Unique ID
    </button>
    <p v-if="generatedId" class="text-gray-600 dark:text-gray-300">
      Admin ID: <strong>{{ generatedId }}</strong>
    </p>

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
    <!-- Calendar Modal -->
    <div v-if="showCalendarView" class="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div class="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-3/4">
        <h2 class="text-2xl font-bold mb-4">Edit Calendar for {{ selectedUser.name }}</h2>

        <!-- Suggestions Section -->
        <h3 class="text-xl font-semibold mb-2">Suggestions</h3>
        <ul class="mb-6">
          <li v-for="date in suggestions" :key="date" class="flex items-center justify-between border-b py-2">
            <span>{{ new Date(date).toLocaleString() }}</span>
            <div>
              <!-- Approve and Dismiss Buttons for Suggestions -->
              <button @click="approveSuggestion(selectedUser.id, adminId, [date])" class="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mr-2">Approve</button>
              <button @click="dismissSuggestion(selectedUser.id, adminId, [date])" class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Dismiss</button>
            </div>
          </li>
        </ul>

        <!-- Limitations Section -->
        <h3 class="text-xl font-semibold mb-2">Limitations</h3>
        <ul class="mb-6">
          <li v-for="date in limitations" :key="date" class="flex items-center justify-between border-b py-2">
            <span>{{ new Date(date).toLocaleString() }}</span>
            <div>
              <!-- Approve and Dismiss Buttons for Limitations -->
              <button @click="approveLimitation(selectedUser.id, adminId, [date])" class="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mr-2">Approve</button>
              <button @click="dismissLimitation(selectedUser.id, adminId, [date])" class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">Dismiss</button>
            </div>
          </li>
        </ul>

    <!-- Close Button -->
        <button @click="closeCalendar" class="bg-red-500 text-white px-4 py-2 rounded mt-4">Close</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

// Reactive state
const authStore = useAuthStore();
const requestedUsers = ref([]);
const acceptedUsers = ref([]);
const showCalendarView = ref(false);
const selectedUser = ref(null);
const suggestions = ref([]);
const limitations = ref([]);

const userId = ref(authStore.userId); 
const adminId = ref(authStore.isAdmin ? authStore.userId : null);

const generatedId = ref('');
const isGenerated = ref(false);

onMounted(() => {
  const storedRequestedUsers = localStorage.getItem('requestedUsers');  
  // Initialize data from localStorage or default values
  requestedUsers.value = storedRequestedUsers ? JSON.parse(storedRequestedUsers) : [
    { id: 1, name: 'User A' },
    { id: 2, name: 'User B' },
    // ... other
  ];

  fetchAcceptedUsers();
});

// Methods

const editCalendar = async (user) => {
  selectedUser.value = user;
  await fetchSuggestionsAndLimitations(user.id);
  showCalendarView.value = true;
}

const fetchAcceptedUsers = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/assignment/getAdminUsers`, {
      data: {adminId: adminId.value}
    });
    acceptedUsers.value = res.data.users
  } catch (error) {
    console.error('Error fetching accepted users:', error);
  }
};

const fetchSuggestionsAndLimitations = async (userId) => {
  try {
    const [suggetionsRes, limitationsRes] = await Promise.all([
      axios.get(`http://localhost:3000/shift/suggetions/${userId}`),
      axios.get(`http://localhost:3000/shift/limitations/${userId}`),
    ]);
    suggestions.value = suggetionsRes.data;
    limitations.value = limitationsRes.data;
  } catch (error) {
    console.error('Error fetching suggetions/limitations:', error);
  }
};

const approveSuggestion = async (userId, adminId, dates) => {
  try {
    await axios.post(`http://localhost:3000/shift/approve/suggestions`, { userId, adminId, suggestionDates: dates});
    suggestions.value = suggestions.value.filter(date => !dates.includes(date));
  } catch (error) {
    console.error('Error approving suggetions:', error);
  }
};

const dismissSuggestion = async (userId, adminId, dates) => {
  try {
    await axios.post(`http://localhost:3000/shift/dismiss/suggestions`, { userId, adminId, suggestionDates: dates});
    suggestions.value = suggestions.value.filter(date => !dates.includes(date));
  } catch (error) {
    console.error('Error dismissing suggetions:', error);
  }
};

const approveLimitations = async (userId, adminId, dates) => {
  try {
    await axios.post(`http://localhost:3000/shift/approve/limitations`, { userId, adminId, limitationDates: dates});
    limitations.value = limitations.value.filter(date => !dates.includes(date));
  } catch (error) {
    console.error('Error approving limitations:', error);
  }
};

const dismissLimitations = async (userId, adminId, dates) => {
  try {
    await axios.post(`http://localhost:3000/shift/dismiss/limitations`, { userId, adminId, limitationDates: dates});
    limitations.value = limitations.value.filter(date => !dates.includes(date));
  } catch (error) {
    console.error('Error dismissing limitations:', error);
  }
};

const closeCalendar = () => {
  showCalendarView.value = false;
  selectedUser.value = null;
  suggestions.value = [];
  limitations.value = [];
};

function generateUniqueId() {
  generatedId.value = uuidv4(); // Generate a unique ID
  isGenerated.value = true;
}
</script>

<style scoped>
.close-button {
  display: block;
  margin: 1rem auto; 
}
</style>
