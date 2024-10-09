<script setup>
import SideBar from './components/SideBar.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div>
    <SideBar @search-input-emit="search" />
  </div>
  <div>
    <RouterView></RouterView>
  </div>
</template>
