<script setup>
import SideBar from './components/SideBar.vue'
</script>

<template>
  <div>
    <SideBar @search-input-emit="search" />
  </div>
</template>
