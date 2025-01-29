<template>
  <div class="min-h-screen mx-5 mt-10 px-20 py-10 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 shadow-xl rounded-3xl">
    <div>
      <p class="text-lg text-gray-700 dark:text-gray-300 font-semibold pb-5">{{ message }}</p>

      <!-- Datepicker for selecting a date -->
      <DatePicker v-model="dates" multiple min="1403-08-01" max="1403-08-30" class="w-full" />

      <div class="text-gray-700 dark:text-gray-300">

        <!-- Calendar Header -->
        <div class="flex justify-between items-center mb-8">
          <button
            @click="prevMonth"
            class="p-2 bg-white dark:bg-gray-800 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300 shadow-md hover:shadow-lg"
          >
            &lt;
          </button>
          <div class="text-2xl font-bold text-gray-800 dark:text-gray-100">
            {{ months[month] }} {{ year }}
          </div>
          <button
            @click="nextMonth"
            class="p-2 bg-white dark:bg-gray-800 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300 shadow-md hover:shadow-lg"
          >
            &gt;
          </button>
        </div>
        
        <!-- Calendar Grid -->
        <div class="grid grid-cols-7 gap-4">
          <!-- Days of the week -->
          <div
            v-for="(day, index) in daysOfWeek"
            :key="index"
            class="text-center font-semibold text-gray-600 dark:text-gray-400 py-3"
          >
            {{ day }}
          </div>

          <!-- Placeholder for previous month's days -->
          <div
            v-for="empty in leadingEmptyDays"
            :key="'empty-' + empty"
            class="p-4 opacity-0"
          ></div>

          <!-- Days of the Month -->
          <div
            v-for="date in daysInMonth"
            :key="date"
            class="p-4 border rounded-2xl flex flex-col items-start justify-between bg-white dark:bg-gray-800 hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-105"
            :class="[isToday(date) ? 'border-blue-300 dark:border-blue-700 shadow-lg' : 'border-gray-100 dark:border-gray-700']"
            style="min-height: 120px;" 
          >
            <!-- Today's date with a glowing circle -->
            <div
              class="text-lg font-bold text-gray-800 dark:text-gray-200"
              :class="[isToday(date) ? 'w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-400 dark:from-blue-700 dark:to-blue-600 text-white shadow-blue-500/50 dark:shadow-blue-700/50 shadow-lg' : '']"
            >
              {{ date }}
            </div>
            
          <!-- Drag and drop -->

            <draggable
              v-model="usersForDate[date]"
              item-key="id"
              group="users"
              class="flex flex-col px-1 py-1 overflow-auto w-full"
              :sort="true"
              @start="drag = true"
              @end="drag = false"
            >
              <template #item="{ element }">
                <div
                  class="flex items-center flex-shrink-0 h-10 px-4 text-sm bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 text-blue-800 dark:text-blue-200 rounded-xl cursor-pointer mb-2 hover:from-blue-100 hover:to-blue-200 dark:hover:from-blue-800 dark:hover:to-blue-700 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <span class="flex-shrink-0 w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-300 mr-3"></span>
                  <span class="font-medium">ID {{ element.id }}</span>
                </div>
              </template>
            </draggable>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import router from '@/router'
import axios from 'axios'
import draggable from 'vuedraggable'

const message = ref('This is a placeholder')

const month = ref(new Date().getMonth());
const year = ref(new Date().getFullYear());
const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const adminUsers = ref([])
const authStore = useAuthStore()
const adminId = authStore.isAdmin ? authStore.userId : null

const darkModeEnabled= ref(localStorage.getItem('darkMode') === 'True')

if (darkModeEnabled.value) {
  document.documentElement.classList.add('dark')
}

// Compute the number of days in the current month
const daysInMonth = computed(() => {
  const days = new Date(year.value, month.value + 1, 0).getDate();
  return Array.from({ length: days }, (_, i) => i + 1);
});

// Compute leading empty days (from the previous month)
const leadingEmptyDays = computed(() => {
  const firstDayOfMonth = new Date(year.value, month.value, 1).getDay();
  return firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
});

// Users assigned to each date
const usersForDate = ref({});

// Initialize users for each date
const initializeUsersForDate = () => {
  usersForDate.value = {};
  daysInMonth.value.forEach(date => {
    if (!usersForDate.value[date]) {
      usersForDate.value[date] = [];
    }
  });
};

// Go to the previous month
const prevMonth = () => {
  if (month.value === 0) {
    month.value = 11;
    year.value--;
  } else {
    month.value--;
  }
  initializeUsersForDate();
};

// Go to the next month
const nextMonth = () => {
  if (month.value === 11) {
    month.value = 0;
    year.value++;
  } else {
    month.value++;
  }
  initializeUsersForDate();
};

// Check if the given date is today
const isToday = (date) => {
  const today = new Date();
  return (
    today.getDate() === date &&
    today.getMonth() === month.value &&
    today.getFullYear() === year.value
  );
};

// Fetch admin users
const getAdminUsers = async () => {
  try {
    const response = await axios.post(`http://localhost:3000/assignment/getAdminUsers`, {
      adminId
    });

    if (response.data) {
      adminUsers.value = response.data.users;

      initializeUsersForDate();

      // Assign users to their suggested dates
      adminUsers.value.forEach(user => {
        user.suggestions.forEach(suggestion => {
          const date = new Date(suggestion).getDate();
          if (!usersForDate.value[date]) {
            usersForDate.value[date] = [];
          }
          const alreadyExists = usersForDate.value[date].some(u => u.id === user.id);
          if (!alreadyExists) {
            usersForDate.value[date].push(user);
          }
        });
      });

      console.log('get admin users: ', adminUsers.value);
    }
  } catch (error) {
    console.error('Error getting users data:', error);
  }
};

onMounted(() => {
  initializeUsersForDate();
  if (authStore.isAdmin) {
    getAdminUsers()
  } else {
    router.push({ name : 'notFound'})
  }
})
</script>