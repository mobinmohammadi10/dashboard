<script setup>
import { ref } from 'vue'
const message = ref('I am Setting.') //-
</script>
<template>
  <p>{{ message }}</p>
</template>

<style>
.p {
  text-align: center;
}
</style>
