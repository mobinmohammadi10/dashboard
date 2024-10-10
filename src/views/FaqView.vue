<script setup>
import { ref } from 'vue'
const message = ref('I am Faq') //-
</script>
<template>
  <div class="container mx-auto p-6 max-w-md bg-white shadow-lg rounded-lg">
    <p class="flex items-center space-x-4 text-xl font-medium text-black">
      {{ message }}
    </p>
  </div>
</template>
