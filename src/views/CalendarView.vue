<script setup>
import { ref } from 'vue'

// Declare the message
const message = ref('Please enter your preferred dates for your shifts:')

// Declare dates to store the selected dates
const dates = ref([])

// Function to clear the selected dates
const clearDates = () => {
  dates.value = []
}
</script>

<template>
  <div class="container mx-auto p-6 max-w-md bg-white shadow-lg rounded-lg">
    <p class="text-lg text-gray-700 font-semibold">{{ message }}</p>

    <DatePicker v-model="dates" multiple class="w-full border border-gray-300 p-2 rounded-lg" />

    <div v-if="dates.length > 0 && dates.length < 4">
      <p class="mt-4 text-blue-500">
        Selected Dates: <span class="font-bold">{{ dates }}</span>
      </p>
      <button
        @click="clearDates"
        class="mt-4 w-full bg-red-500 text-white font-semibold py-2 px-4 rounded-lg"
      >
        Clear Selected Dates
      </button>
      <button
        @click="submitDates"
        class="mt-4 w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-lg"
      >
        Submit Selected Dates
      </button>
    </div>

    <p v-else-if="dates.length >= 4" class="mt-4 text-red-500 font-semibold">
      You've selected too many dates. Please select 3 or fewer.
    </p>

    <p v-else class="mt-4 text-gray-500">No dates selected.</p>
  </div>
</template>
