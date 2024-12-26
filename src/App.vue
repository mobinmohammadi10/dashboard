<script setup>
import SideBar from './components/SideBar.vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import { ref, provide, onMounted } from 'vue'
import { themeStore } from './stores/themeStore'
import { useAuthStore } from './stores/authStore'

const route = useRoute()
const router = useRouter()
const darkMode = ref(false)

const theme = themeStore()
const auth = useAuthStore()

// Provide darkMode globally for all components
provide('darkMode', darkMode)

// Function to toggle dark mode, provided only for the Settings page to modify it
const toggleDarkMode = () => {
  darkMode.value = !darkMode.value
  document.documentElement.classList.toggle('dark', darkMode.value)
  localStorage.setItem('darkMode', darkMode.value) // Persist the value in localStorage
}

// Provide the toggleDarkMode function only for Settings page
provide('toggleDarkMode', toggleDarkMode)

// On mounted, check if darkMode was saved in localStorage
onMounted(() => {
  const savedDarkMode = localStorage.getItem('darkMode')
  if (savedDarkMode) {
    darkMode.value = savedDarkMode === 'true'
    document.documentElement.classList.toggle('dark', darkMode.value)
  }

  const { isLoggedIn, jwtToken, userId, email } = auth
  if (!isLoggedIn || !jwtToken || !userId || !email || auth.isSessionExpired) {
    router.push({name: 'login'})
  }
})
</script>

<template>
  <div class="dark:bg-gray-800 w-full min-h-full">
    <!-- Conditionally render the sidebar except on the login route -->
    <SideBar v-if="route.name !== 'login'" @search-input-emit="search" :is-used-vue-router="true" />

    <!-- Render the current route's component -->
    <RouterView
      :class="route.name === 'login' ? 'ml-0' : theme.sidebarOpen ? 'ml-[250px]' : 'ml-[78px]'"
    />
  </div>
</template>
