<template>
  <div class="container px-20 pl-20 py-10 mx-auto max-w-5xl'">
    <!-- Title -->
    <h1 class="text-2xl font-bold text-center mb-4 text-gray-800 dark:text-gray-100">Enter your suggestions and limitations for your shifts</h1>

    <!-- Calendar Header -->
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
      <!-- Days of the Week -->
      <div v-for="(day, index) in daysOfWeek" :key="index" class="text-center font-semibold text-gray-600 dark:text-gray-400">
        {{ day }}
      </div>

      <!-- Placeholder for previous month's days -->
      <div v-for="empty in leadingEmptyDays" :key="'empty-' + empty" class="p-4"></div>

      <!-- Days of the month -->
      <div
        v-for="date in daysInMonth"
        :key="date"
        class="p-4 border rounded-lg flex flex-col items-center justify-between bg-white dark:bg-gray-800"
        :class="[isToday(date) ? 'bg-blue-100 dark:bg-blue-900' : 'bg-white dark:bg-gray-700']"
      >
        <div class="text-lg font-bold text-gray-800 dark:text-gray-200">{{ date }}</div>

        <!-- Suggestion and Limitation Buttons -->
        <div class="flex mt-2 space-x-2">
          <!-- Green Button for Suggestion -->
          <button
            @click="setOption(date, 'suggestion')"
            :class="[
              'p-2 rounded-full transition-colors duration-200',
              isSuggestion(date) ? 'bg-green-600 text-white' : 'bg-green-200 dark:bg-green-700 dark:text-black'
            ]"
            title="Suggestion"
            :disabled="selectedCount >= maxSelection && !isSuggestion(date) && !isLimitation(date) || locked"
          >
            S
          </button>

          <!-- Red Button for Limitation -->
          <button
            @click="setOption(date, 'limitation')"
            :class="[
              'p-2 rounded-full transition-colors duration-200',
              isLimitation(date) ? 'bg-red-600 text-white' : 'bg-red-200 dark:bg-red-700 dark:text-black'
            ]"
            title="Limitation"
            :disabled="selectedCount >= maxSelection && !isSuggestion(date) && !isLimitation(date) || locked"
          >
            L
          </button>
        </div>
      </div>
    </div>

    <!-- Save Button and Selection Info -->
    <div class="mt-4 flex justify-between items-center">
      <div class="text-red-500" v-if="selectedCount >= maxSelection">You have reached the limit of {{ maxSelection }} selections!</div>
      <div class="text-gray-800 dark:text-gray-100">
        Selected: {{ selectedCount }}/{{ maxSelection }}</div>
      <button 
        @click="saveSelections"
        class="p-3 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        :disabled="selectedCount === 0 || locked"
      >
        Save Selections
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, inject, onMounted } from 'vue';
import axios from 'axios';
import { useAuthStore } from '@/stores/authStore';

const darkMode = inject('darkMode');
const isDarkMode = darkMode || ref(false);

// Reactive calendar data and methods
const month = ref(new Date().getMonth());
const year = ref(new Date().getFullYear());
const currentSelections = ref(new Map()); // Store temporary selections for the current month

// Max number of days a user can select per month (suggestions + limitations)
const maxSelection = 20;

const errorMessage = ref('');
const successMessage = ref('');

const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

// Compute the number of days in the current month
const daysInMonth = computed(() => {
  const days = new Date(year.value, month.value + 1, 0).getDate();
  return Array.from({ length: days }, (_, i) => i + 1);
});

// Compute leading empty days (from previous month)
const leadingEmptyDays = computed(() => {
  const firstDayOfMonth = new Date(year.value, month.value, 1).getDay();
  return firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
});

// Go to the previous month
const prevMonth = () => {
  if (month.value === 0) {
    month.value = 11;
    year.value--;
  } else {
    month.value--;
  }
  loadSelections(); // Load saved selections for the current month
};

// Go to the next month
const nextMonth = () => {
  if (month.value === 11) {
    month.value = 0;
    year.value++;
  } else {
    month.value++;
  }
  loadSelections(); // Load saved selections for the current month
};

const locked = ref(false);

// Set the selected option (suggestion or limitation) for a given date
const setOption = (date, option) => {
  if (locked.value) return;

  const dateStr = `${year.value}-${month.value + 1}-${date}`; // Adjust the month number to be 1-based
  console.log(`Clicked on: ${dateStr} | Option: ${option}`);

  if (currentSelections.value.has(dateStr)) {
    const currentOption = currentSelections.value.get(dateStr);

    if (currentOption === option) {
      currentSelections.value.delete(dateStr); // Deselect
      console.log(`Deselected ${option} for ${dateStr}`);
    } else {
      currentSelections.value.set(dateStr, option); // Update
      console.log(`Updated ${option} for ${dateStr}`);
    }
  } else {
    if (selectedCount.value >= maxSelection) {
      alert(`You can only select up to ${maxSelection} dates this month!`);
      return; // Prevent selecting more than the max limit
    }
    currentSelections.value.set(dateStr, option); // Select
    console.log(`Selected ${option} for ${dateStr}`);
  }
};


const saveSelections = async () => {
  const confirmSave = confirm(
    "Are you sure you want to save your selections? You will not be able to change them afterward."
  );

  if (!confirmSave) {
    return; // Exit if the user cancels the action
  }
  
  const suggestions = [];
  const limitations = [];

  currentSelections.value.forEach((value, date) => {
    if (value === 'suggestion') suggestions.push(date);
    if (value === 'limitation') limitations.push(date);
  });

  const authStore = useAuthStore();
  const userId = authStore.userId;

  try {
    if (suggestions.length > 0) {
      await axios.put('http://localhost:3000/shift/assign/suggestion', {
        userId: userId,
        suggestionDates: suggestions
      });
    }

    if (limitations.length > 0) {
      await axios.put('http://127.0.0.1:3000/shift/assign/limitation', {
        userId: userId,
        limitationDates: limitations
      });
    }
    
    successMessage.value = "Selections saved successfully!";
    locked.value = true;
  } catch( error) {
    console.error("Error saving selections:", error.message);
    errorMessage.value = "Failed to save selections.";
  }
};

const loadSelections = async () => {
  const authStore = useAuthStore();
  const userId = authStore.userId;

  try {
    const suggestionResponse = await axios.get(`http://localhost:3000/shift/suggestions/${userId}`);     
    const limitationResponse = await axios.get(`http://localhost:3000/shift/limitations/${userId}`);
    
    currentSelections.value.clear();
    (suggestionResponse.data || []).forEach((date) => {
      currentSelections.value.set(date, 'suggestion');
    });

    (limitationResponse.data || []).forEach((date) => {
      currentSelections.value.set(date, 'limitation');
    });

    console.log("Loaded selections:", currentSelections.value);
  } catch (error) {
    console.error("Error loading selections:", error.message);
    errorMessage.value = 'Failed to load selections.';
  }
};

// Computed properties to track selected options
const isSuggestion = (date) => {
  const dateStr = `${year.value}-${month.value + 1}-${date}`;
  return currentSelections.value.get(dateStr) === 'suggestion';
};

const isLimitation = (date) => {
  const dateStr = `${year.value}-${month.value + 1}-${date}`;
  return currentSelections.value.get(dateStr) === 'limitation';
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

// Total selected count (suggestions + limitations)
const selectedCount = computed(() => {
  return currentSelections.value.size;
});

// Computed class for handling dark mode
const darkModeClass = computed(() => (isDarkMode.value ? 'dark' : ''));

// Load selections when the component is mounted
onMounted(() => {
  loadSelections();
});
</script>

<style scoped>
.container {
  max-width: 1500px;
}

.grid {
  grid-template-columns: repeat(7, 1fr);
}

button {
  min-width: 36px;
  min-height: 36px;
  transition: background-color 0.2s ease;
}

/* Add dark mode specific styles */
.dark {
  background-color: #0c0c0d; /* Dark for background */
  color: #e5e7eb; /* Light text color */
}

.dark h1 {
  color: #f9fafb; /* Light title */
}

.dark .border {
  border-color: #374151; /* Adjust border color */
}
</style>
