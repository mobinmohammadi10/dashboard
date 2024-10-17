<script setup>
import { ref } from 'vue'
import { jalaaliToDateObject } from 'jalaali-js'

// Declare the message
const message = ref('Please enter your preferred dates for your shifts:')
const dateConfirmations = ref([])

// Declare dates to store the selected dates
const dates = ref([])

// Function to clear the selected dates
const clearDates = () => {
  dates.value = []
}

const submitDates = () => {
  for (const date of dates.value) {
    let splitedDate = parseInt(date.split('/'))
    dateConfirmations.value.push(
      jalaaliToDateObject(splitedDate[0], splitedDate[1], splitedDate[2])
    )
  }

  // Todo: send date confirmations to the server
}
</script>

<template>
  <div
    class="container self-center mx-10 max-w-xl margin-top: m-10 p-6 bg-white shadow-lg rounded-lg"
  >
    <p class="text-lg text-gray-700 font-semibold padding-bottom: p-5">{{ message }}</p>

    <DatePicker v-model="dates" multiple class="width: w-6/12" />

    <div v-if="dates.length > 0 && dates.length < 4">
      <p class="mt-4 text-blue-500">
        Selected Dates:
        <span class="font-bold" v-for="date in dates" :key="date.id"
          ><hr />
          {{ date }}</span
        >
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
