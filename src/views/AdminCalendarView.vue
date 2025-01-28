<template>
  <div class="min-h-screen  mx-10 mt-10 px-20 py-10 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
    <div>
      <p class="text-lg text-gray-700 dark:text-gray-300 font-semibold pb-5">{{ message }}</p>

      <!-- Datepicker for selecting a date -->
      <DatePicker v-model="dates" multiple min="1403-08-01" max="1403-08-30" class="w-full" />

      <div class="text-gray-700 dark:text-gray-300">

        <!-- calendar Header -->
        <div class="flex justify-between items-center mb-4">
          <button @click="prevMonth" class="p-2 bg-gray-200 rounded hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600">
            &lt;
          </button>
          <div class="text-xl font-bold text-gray-800 dark:text-gray-100">
            {{ months[month] }} {{ year }}
          </div>
          <button @click="nextMonth" class="p-2 bg-gray-200 rounded hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600">
            &gt;
          </button>
        </div>
        
        <!-- Calendar Grid -->
        <div class="grid grid-cols-7 gap-4">
          <!-- Days of the week -->
          <div v-for="(day, index) in daysOfWeek" :key="index" class="text-center font-semibold text-gray-600 dark:text-gray-400">
            {{ day }}
          </div>

        <!-- Placeholder for previous month's days -->
        <div v-for="empty in leadingEmptyDays" :key="'empty-' + empty" class="p-4"></div>

        <!-- Days of the Month -->
        <div
          v-for="date in daysInMonth"
          :key="date"
          class="p-4 border rounded-lg flex flex-col items-start justify-between bg-white dark:bg-gray-800"
          :class="[isToday(date) ? 'bg-blue-200 dark:bg-blue-800' : 'bg-white dark:bg-gray-700']"
        >
          <div class="text-lg font-bold text-gray-800 dark:text-gray-200">{{ date }}</div>
          
          <!-- Drag and drop -->
          <div class="flex flex-col px-1 py-1 overflow-auto">
            <draggable
              v-model="usersForDate[date]"
              item-key="id"
              group="users"
              :sort="true"
              @start="drag = true"
              @end="drag = false"
            >
              <template #item="{ element }">
                <button
                  class="flex items-center flex-shrink-0 h-5 px-1 text-xs hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  <span class="flex-shrink-0 w-2 h-2 rounded-full bg-gray-700 dark:bg-gray-300"></span>
                  <span class="ml-2 font-light leading-none">{{ element.id }}</span>
                </button>
              </template>
            </draggable>
          </div>
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

// Compute users for each date dynamically
const usersForDate = computed(() => {
  const result = {};
  daysInMonth.value.forEach((date) => {
    const currentDate = new Date(year.value, month.value, date).toISOString().split('T')[0];
    result[date] = adminUsers.value.filter(user =>
      user.suggestions.some(suggestion =>
        new Date(suggestion).toISOString().split('T')[0] === currentDate
      )
    );
  });
  return result;
});

// Go to the previous month
const prevMonth = () => {
  if (month.value === 0) {
    month.value = 11;
    year.value--;
  } else {
    month.value--;
  }
};

// Go to the next month
const nextMonth = () => {
  if (month.value === 11) {
    month.value = 0;
    year.value++;
  } else {
    month.value++;
  }
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

const getAdminUsers = async () => {
  try {
    const response = await axios.post(`http://localhost:3000/assignment/getAdminUsers`, {
      adminId
    });

    if (response.data) {
      adminUsers.value = response.data.users;
      console.log('get admin users: ', adminUsers.value);
    }
  } catch (error) {
    console.error('Error getting users data:', error);
  }
};

onMounted(() => {
  if (authStore.isAdmin) {
    getAdminUsers()
  } else {
    router.push({ name : 'notFound'})
  }
})
</script>