<template>
  <div class="min-h-screen px-20 pl-20 py-10"> <!-- Added min-h-screen for full-page coverage -->
    <!-- Title -->
    <h1 class="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Dashboard</h1>

    <!-- List of People Who Need to Give Shifts -->
    <div class="mb-6">
      <h2 class="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-200">People Assigned to Shifts</h2>
      <ul class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
        <!-- Loop through the people from backend -->
        <li v-for="person in people" :key="person.id" class="border-b py-2 border-gray-300 dark:border-gray-700">
          <span class="font-medium text-gray-900 dark:text-white">{{ person.id }} - </span>
          <span class="text-gray-700 dark:text-gray-300">{{ person.fullName }}</span>
        </li>
      </ul>
    </div>

    <!-- Schedule Grid -->
    <div>
      <h2 class="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-200">Weekly Schedule</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full border-collapse table-auto bg-white dark:bg-gray-800">
          <thead>
            <tr class="bg-gray-200 dark:bg-gray-700">
              <th class="p-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">Person</th>
              <th
                class="p-2 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                v-for="day in days"
                :key="day"
              >
                {{ day }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="person in people" :key="person.id" class="bg-white dark:bg-gray-900">
              <td class="p-2 border border-gray-300 dark:border-gray-600 font-semibold text-gray-900 dark:text-white">
                {{ person.fullName }}
              </td>
              <!-- Loop through shifts for each person -->
              <td
                class="p-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                v-for="(shift, index) in person.shifts"
                :key="index"
              >
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

// Fetch data from backend when the component is mounted
onMounted(async () => {
  try {
    // Make your API call to fetch the people and their shifts here
    const response = await fetch('/api/people')
    const data = await response.json()

    // Assign the fetched data to the people ref
    people.value = data
  } catch (error) {
    console.error("Error fetching people data:", error)
  }
})
</script>

<style scoped>
/* Ensure dark mode is applied to the entire page */
html, body {
  height: 100%;
}

.dark {
  background-color: #1a202c;
  color: #f7fafc;
}

.dark h1, .dark h2 {
  color: #f7fafc;
}

.dark table thead {
  background-color: #4a5568;
}

.dark table tbody tr {
  background-color: #1f2937;
}

.dark table td, .dark table th {
  color: #f7fafc;
  border-color: #4a5568;
}

.dark table tbody tr:hover {
  background-color: #2d3748;
}

.dark .bg-gray-800 {
  background-color: #2d3748;
}

.dark .bg-gray-900 {
  background-color: #1f2937;
}

.dark .bg-gray-700 {
  background-color: #4a5568;
}
</style>
