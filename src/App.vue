<script setup>
import SideBar from './components/SideBar.vue'
import { RouterView, useRoute } from 'vue-router'

const route = useRoute() // Get the current route
</script>

<template>
  <div>
    <!-- Conditionally render the sidebar except on the login route -->
    <SideBar v-if="route.name !== 'login'" @search-input-emit="search" :is-used-vue-router="true" />

    <!-- Render the current route's component -->
    <RouterView />
  </div>
</template>
