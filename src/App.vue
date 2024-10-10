<script setup>
import SideBar from './components/SideBar.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div>
    <SideBar @search-input-emit="search" :is-used-vue-router="true" />
  </div>
  <RouterView></RouterView>
</template>
