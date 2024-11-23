<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div class="h-screen bg-dark-500 flex items-center justify-center dark:text-white">
      <form @submit.prevent="sendRequest">
        <label for="username" class="block mb-2">Your Name:</label>
        <input
          type="text"
          id="username"
          v-model="username"
          required
          class="w-full p-2 border border-gray-300 rounded mb-4"
        />
        <label for="request" class="block mb-2">Request Code:</label>
        <textarea
          id="request"
          v-model="request"
          rows="4"
          required
          class="w-full p-2 border border-gray-300 rounded mb-4"
        ></textarea>
        <button
          type="submit"
          class="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Send Request
        </button>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue';
const username = ref('');
const request = ref('');
async function sendRequest() {
  // Your existing sendRequest function
}
</script>

<style>
body.dark-mode {
  background-color: #2d3748; /* Dark background */
  color: #ffffff; /* Light text color */
}
/* Add your existing styles for other elements here */
</style>