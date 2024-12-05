<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 py-6 flex flex-col justify-center sm:py-12">
    <div class="relative py-3 sm:max-w-xl sm:mx-auto">
      <div
        class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"
      ></div>
      <div class="relative px-4 py-10 bg-white dark:bg-gray-800 shadow-lg sm:rounded-3xl sm:p-20">
        <div class="max-w-md mx-auto">
          <div>
            <h1 class="text-2xl font-semibold dark:text-white">Login</h1>
          </div>
          <div class="flex items-center justify-between divide-y">
            <h4 class="text-red-600 text-bold">{{ loginMessage }}</h4>
          </div>
          <div class="divide-y divide-gray-200 dark:divide-gray-700">
            <form @submit.prevent="login">
              <div
                class="py-8 text-base leading-6 space-y-4 text-gray-700 dark:text-gray-300 sm:text-lg sm:leading-7"
              >
                <div class="relative">
                  <input
                    autocomplete="off"
                    v-model="username"
                    name="username"
                    type="text"
                    class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:outline-none focus:borer-rose-600"
                    placeholder="username"
                  />

                  <label
                    for="username"
                    class="absolute left-0 -top-3.5 text-gray-600 dark:text-gray-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:dark:text-gray-400 peer-focus:text-sm"
                    >Username</label
                  >
                </div>
                <div class="relative">
                  <input
                    autocomplete="off"
                    v-model="password"
                    placeholder="password"
                    class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:outline-none focus:borer-rose-600"
                    type="password"
                  />
                  <label
                    for="password"
                    class="absolute left-0 -top-3.5 text-gray-600 dark:text-gray-400 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:dark:text-gray-400 peer-focus:text-sm"
                    >Password</label
                  >
                </div>
                <input
                  class="bg-cyan-500 text-white rounded-md px-2 py-1 hover:bg-cyan-600 transition duration-300"
                  type="submit"
                  value="Log In"
                />
                <p class="forget-password text-right">
                  <router-link to="forgot">forgot password?</router-link>
                </p>
              </div>
            </form>

            <div class="w-full flex justify-center">
              <router-link
                to="signup"
                class="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300"
              >
                Sign Up
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const auth = useAuthStore()

const username = ref('')
const password = ref('')

const loginMessage = ref('')

onMounted(() => {
  const darkModeEnabled = localStorage.getItem('darkMode') === 'True'
  if (darkModeEnabled) {
    document.documentElement.classList.add('dark')
  }
})

// Fetch and log in user when form is submitted
const login = async () => {
  const usernameValue = username.value
  const passwordValue = password.value

  try {
    const res = await axios.post('http://localhost:3000/login', {
      username: usernameValue,
      password: passwordValue
    })

    // Handle successful response
    if (res.status === 200) {
      console.log('User logged in successfully')
      auth.setJwtToken(res.data.token)
      router.push('/')
    }
  } catch (error) {
    // Handle errors and unsuccessful login attempt
    if (error.response) {
      // Server responded with a status other than 200
      loginMessage.value = error.response.data.message
    } else {
      // Other errors (e.g., network errors)
      console.error('Error logging in:', error.message)
    }
  }
}
</script>
