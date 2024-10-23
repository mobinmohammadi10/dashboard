<template>
  <div :class="darkMode ? 'dark' : ''" class="min-h-screen p-6 bg-gray-100 dark:bg-gray-900">
    <!-- Title -->
    <h1 class="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Dashboard</h1>

    <!-- List of People Assigned to Shifts -->
    <div class="mb-6">
      <h2 class="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-200">People Assigned to Shifts</h2>
      <ul class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <li v-for="person in people" :key="person.id" class="border-b py-2 border-gray-300 dark:border-gray-700">
          <span class="font-medium text-gray-900 dark:text-gray-100">{{ person.id }} - </span>
          <span class="text-gray-700 dark:text-gray-300">{{ person.fullName }}</span>
        </li>
      </ul>
    </div>

    <!-- Weekly Schedule -->
    <div>
      <h2 class="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-200">Weekly Schedule</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full border-collapse table-auto">
          <thead>
            <tr class="bg-gray-200 dark:bg-gray-700">
              <th class="p-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">Person</th>
              <th class="p-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white" v-for="day in days" :key="day">
                {{ day }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="person in people" :key="person.id">
              <td class="p-2 border border-gray-300 dark:border-gray-600 font-semibold text-gray-900 dark:text-white">
                {{ person.fullName }}
              </td>
              <td class="p-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300" v-for="(shift, index) in person.shifts" :key="index">
                {{ shift }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from 'vue'

// Inject dark mode from global state
const darkMode = inject('darkMode')

const days = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

// Sample people data (Replace this with backend data)
const people = ref([
  {
    id: 1,
    fullName: "User 1",
    shifts: ["Morning", "Afternoon", "Morning", "Off", "Evening", "Off", "Afternoon"]
  },
  {
    id: 2,
    fullName: "User 2",
    shifts: ["Off", "Morning", "Evening", "Afternoon", "Morning", "Morning", "Off"]
  },
  {
    id: 3,
    fullName: "User 3",
    shifts: ["Afternoon", "Off", "Off", "Evening", "Afternoon", "Morning", "Evening"]
  }
])

// Apply dark mode to the body element on mount
onMounted(() => {
  if (darkMode) {
    document.body.classList.add('dark')
  } else {
    document.body.classList.remove('dark')
  }
})
</script>

<style scoped>
/* Ensure minimum screen height to handle different content sizes */
.min-h-screen {
  min-height: 100vh;
}
</style>
