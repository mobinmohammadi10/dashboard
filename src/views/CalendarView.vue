<script setup>
import { ref } from 'vue'

// Declare the message
const message = ref('Please enter your preferred dates for your shifts:')

// Declare dates to store the selected dates
const dates = ref([])
</script>

<template>
  <div class="container mx-auto p-6 max-w-md bg-white shadow-lg rounded-lg">
    <p class="text-lg text-gray-700 font-semibold">{{ message }}</p>

    <DatePicker v-model="dates" multiple class="w-full border border-gray-300 p-2 rounded-lg" />

    <p v-if="dates.length > 0 && dates.length < 4" class="mt-4 text-blue-500">
      Selected Dates: <span class="font-bold">{{ dates }}</span>
    </p>

    <p v-else-if="dates.length >= 4" class="mt-4 text-red-500 font-semibold">
      You've selected too many dates. Please select 3 or fewer.
    </p>

    <p v-else class="mt-4 text-gray-500">No dates selected.</p>
  </div>
</template>
